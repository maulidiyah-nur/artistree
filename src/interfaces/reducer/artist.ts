import IArtist from '../artist'
import Tree from '../tree'

interface IArtistReducer {
    is_loading: boolean
    is_error: boolean
    error_message?: string
    keyword: string
    data?: IArtist
    list: Array<IArtist>
    tree?: Tree<IArtist>
}

export default IArtistReducer
