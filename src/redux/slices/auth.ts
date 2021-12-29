import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
            .addCase(GetAccessToken.pending, state => {
                return {
                    ...state,
                    is_loading: true,
                    is_error: false,
                }
            })
            .addCase(GetAccessToken.rejected, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: true,
                    error_message: action.error.message,
                }
            })
            .addCase(GetAccessToken.fulfilled, (state, action) => {
                const { access_token, expires_in } = action.payload
                const expiration =
                    Number(new Date().getTime() / 1000).toFixed(0) +
                    Number(expires_in)
                localStorage.setItem(
                    STORAGE.TOKEN,
                    access_token + ':' + expiration,
                )
                return {
                    ...state,
                    is_loading: false,
                    is_error: false,
                    data: action.payload,
                }
            })
    },
})

export const { SetCallback } = AuthReducer.actions

const { reducer } = AuthReducer
export default reducer
