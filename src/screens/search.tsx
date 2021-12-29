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
    // const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [list, setList] = useState<Array<IArtist>>([])

    // const data = {
    //     followers: {
    //         total: 8351044,
    //     },
    //     id: '0jnsk9HBra6NMjO2oANoPY',
    //     images: [
    //         {
    //             url: 'https://i.scdn.co/image/ab6761610000e5eb9e3acf1eaf3b8846e836f441',
    //         },
    //     ],
    //     name: 'Taylor Swift',
    //     popularity: 82,
    // } as IArtist

    // useEffect(() => {
    //     setIsLoading(true)
    //     setTimeout(() => {
    //         setIsLoading(false)
    //         setList([data, data, data, data, data, data])
    //     }, 5000)
    // }, [])

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
