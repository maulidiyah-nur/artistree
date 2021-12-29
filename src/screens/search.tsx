import React from 'react'

import { connect } from 'react-redux'

import Logo from '../assets/images/logo.png'
import Layout from '../components/layout'
import List from '../components/list'
import SearchBar from '../components/searchbar'
import IArtistReducer from '../interfaces/reducer/artist'
import { Search as SearchAction } from '../redux/slices/artist'
import { RootState } from '../redux/store'

interface ISearchScreenProps {
    artist: IArtistReducer
    SearchAction: (keyword: string) => void
}
const SearchScreen = (props: ISearchScreenProps) => {
    const { artist, SearchAction } = props

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        SearchAction(e.target.value)
    }

    return (
        <Layout>
            <img src={Logo} width={200} />
            <SearchBar value={artist.keyword} onChange={onSearch} />
            <List isLoading={artist.is_loading} data={artist.list} />
        </Layout>
    )
}

const mapStateToProps = (state: RootState) => ({
    artist: state.artist,
})

export default connect(mapStateToProps, {
    SearchAction,
})(SearchScreen)
