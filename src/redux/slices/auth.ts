import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { STORAGE } from '../../constant'
import IAuthReducer from '../../interfaces/reducer/auth'
import AuthDataService from '../../services/auth'

export const GetAccessToken = createAsyncThunk(
    'auth/access-token',
    async (code: string) => {
        const res = await AuthDataService.token(code)
        return res.data
    },
)

export const RefreshAccessToken = createAsyncThunk(
    'auth/refresh-token',
    async (refresh_token: string) => {
        const res = await AuthDataService.refresh(refresh_token)
        return res.data
    },
)

const initialState: IAuthReducer = {
    is_loading: false,
    is_error: false,
}

const AuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetCallback: (state, action) => {
            const { code, error } = action.payload
            state.code = code
            state.error_message = error
            state.is_error = !!error
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(GetAccessToken.pending, RefreshAccessToken.pending),
                state => {
                    return {
                        ...state,
                        is_loading: true,
                        is_error: false,
                    }
                },
            )
            .addMatcher(
                isAnyOf(GetAccessToken.rejected, RefreshAccessToken.rejected),
                (state, action) => {
                    return {
                        ...state,
                        is_loading: false,
                        is_error: true,
                        error_message: action.error.message,
                    }
                },
            )
            .addMatcher(
                isAnyOf(GetAccessToken.fulfilled, RefreshAccessToken.fulfilled),
                (state, action) => {
                    const { access_token, refresh_token, expires_in } =
                        action.payload
                    const now = new Date().getTime() / 1000
                    const expiration =
                        parseInt(now.toString(), 10) +
                        parseInt(expires_in.toString(), 10)
                    localStorage.setItem(
                        STORAGE.TOKEN,
                        access_token + ':' + expiration,
                    )
                    if (refresh_token) {
                        localStorage.setItem(
                            STORAGE.REFRESH_TOKEN,
                            refresh_token,
                        )
                    }
                    return {
                        ...state,
                        is_loading: false,
                        is_error: false,
                        data: action.payload,
                    }
                },
            )
    },
})

export const { SetCallback } = AuthReducer.actions

const { reducer } = AuthReducer
export default reducer
// export default reducer as Reducer<typeof initialState>
