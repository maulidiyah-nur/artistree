import React from 'react'

import { useParams } from 'react-router-dom'

import Layout from '../components/layout'

const Tree = () => {
    const params = useParams()
    const { artistId } = params
    return (
        <Layout>
            <span>tree screen {artistId}</span>
        </Layout>
    )
}

export default Tree
