import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import Layout from '../components/layout'
import Tree from '../components/tree'
import IArtistReducer from '../interfaces/reducer/artist'
import { Get, GetRelatives } from '../redux/slices/artist'
import { RootState } from '../redux/store'

interface ITreeScreenProps {
    artist: IArtistReducer
    Get: (id: string) => void
    GetRelatives: (path: Array<string>) => void
}

const TreeScreen = (props: ITreeScreenProps) => {
    const { artist, Get, GetRelatives } = props
    const params = useParams()
    const { artistId } = params

    useEffect(() => {
        if (artistId) {
            Get(artistId)
        }
    }, [artistId])

    const onPathChange = (path: Array<string>) => {
        GetRelatives(path)
    }

    return (
        <Layout>
            {artist.tree && (
                <Tree
                    data={artist.tree}
                    is_loading={artist.is_loading}
                    onPathChange={onPathChange}
                />
            )}
        </Layout>
    )
}

const mapStateToProps = (state: RootState) => ({
    artist: state.artist,
})

export default connect(mapStateToProps, {
    Get,
    GetRelatives,
})(TreeScreen)
