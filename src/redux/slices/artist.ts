import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import IArtistReducer from '../../interfaces/reducer/artist'
import ArtistDataService from '../../services/artist'

export const Search = createAsyncThunk(
    'artist/search',
    async (keyword: string) => {
        const res = await ArtistDataService.search(keyword)
        return res.data
    },
)

export const Get = createAsyncThunk('artist/get', async (id: string) => {
    const res = await ArtistDataService.get(id)
    return res.data
})

export const GetRalatives = createAsyncThunk(
    'artist/get-relativess',
    async (id: string) => {
        const res = await ArtistDataService.getRelatives(id)
        return res.data
    },
)

const initialState: IArtistReducer = {
    is_loading: false,
    is_error: false,
    keyword: '',
    list: [],
}

const ArtistReducer = createSlice({
    name: 'artist',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(Search.pending, (state, action) => {
                return {
                    ...state,
                    is_loading: true,
                    is_error: false,
                    keyword: action.meta.arg,
                    list: [],
                }
            })
            .addCase(Search.rejected, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: true,
                    error_message: action.error.message,
                }
            })
            .addCase(Search.fulfilled, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: false,
                    list: action.payload.artists.items,
                }
            })
    },
})

const { reducer } = ArtistReducer
export default reducer
