import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from './screens/search'
import Tree from './screens/tree'
import './styles/main.scss'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/:artistId" element={<Tree />} />
        </Routes>
    )
}

export default App
