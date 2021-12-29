import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import IArtist from '../../interfaces/artist'
import IArtistReducer from '../../interfaces/reducer/artist'
import Tree from '../../interfaces/tree'
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

export const GetRelatives = createAsyncThunk(
    'artist/get-relativess',
    async (path: Array<string>) => {
        const res = await ArtistDataService.getRelatives(path[0])
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
            .addCase(Get.pending, state => {
                return {
                    ...state,
                    is_loading: true,
                    is_error: false,
                    data: undefined,
                }
            })
            .addCase(Get.rejected, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: true,
                    error_message: action.error.message,
                }
            })
            .addCase(Get.fulfilled, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: false,
                    data: action.payload,
                    tree: {
                        ...action.payload,
                        path: [action.payload.id],
                    } as Tree<IArtist>,
                }
            })
            .addCase(GetRelatives.pending, state => {
                return {
                    ...state,
                    is_loading: true,
                    is_error: false,
                }
            })
            .addCase(GetRelatives.rejected, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: true,
                    error_message: action.error.message,
                }
            })
            .addCase(GetRelatives.fulfilled, (state, action) => {
                return {
                    ...state,
                    is_loading: false,
                    is_error: false,
                    tree: {
                        ...state.tree,
                        children: action.payload.artists,
                    } as Tree<IArtist>,
                }
            })
    },
})

const { reducer } = ArtistReducer
export default reducer
