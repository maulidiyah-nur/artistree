import React from 'react'
import { useParams } from 'react-router-dom'

const Tree = () => {
    const params = useParams()
    const { artistId } = params
    return (
        <>
            <span>tree screen {artistId}</span>
        </>
    )
}

export default Tree
