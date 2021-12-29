import React from 'react'

import { Routes, Route } from 'react-router-dom'

import RequireAuth from './components/require-auth'
import AuthScreen from './screens/auth'
import SearchScreen from './screens/search'
import Tree from './screens/tree'
import './styles/main.scss'

function App() {
    return (
        <Routes>
            <Route path="/auth-callback" element={<AuthScreen />} />
            <Route
                path="/"
                element={
                    <RequireAuth>
                        <SearchScreen />
                    </RequireAuth>
                }
            />
            <Route
                path="/:artistId"
                element={
                    <RequireAuth>
                        <Tree />
                    </RequireAuth>
                }
            />
        </Routes>
    )
}

export default App
