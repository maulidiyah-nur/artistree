import { configureStore } from '@reduxjs/toolkit'

import ArtistReducer from './slices/artist'
import AuthReducer from './slices/auth'

const store = configureStore({
    reducer: {
        artist: ArtistReducer,
        auth: AuthReducer,
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export default store
