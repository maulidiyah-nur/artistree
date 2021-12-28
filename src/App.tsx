import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from './screens/search'
import Tree from './screens/tree'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/:artistId" element={<Tree />} />
        </Routes>
    )
}

export default App
