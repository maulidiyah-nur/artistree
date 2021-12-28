import React, { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Logo from '../assets/images/logo.png'
import SearchBar from '../components/searchbar'
import List from '../components/list'
import IArtist from '../interfaces/artist'

const Search = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [list, setList] = useState<Array<IArtist>>([])

    const data = {
        followers: {
            total: 8351044,
        },
        id: '0jnsk9HBra6NMjO2oANoPY',
        images: [
            {
                url: 'https://i.scdn.co/image/ab6761610000e5eb9e3acf1eaf3b8846e836f441',
            },
        ],
        name: 'Taylor Swift',
        popularity: 82,
    } as IArtist

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setList([data, data, data, data, data, data])
        }, 5000)
    }, [])

    return (
        <Layout>
            <img src={Logo} width={200} />
            <SearchBar />
            <List isLoading={isLoading} data={list} />
        </Layout>
    )
}

export default Search
