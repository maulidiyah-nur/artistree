interface IArtist {
    external_urls: {
        spotify: string
    }
    followers: {
        total: number
    }
    genres: Array<string>
    href: string
    id: string
    images: Array<{ url: string }>
    name: string
    popularity: number
    uri: string
}

export default IArtist
