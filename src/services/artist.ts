import Base from './base'

class ArtistDataService {
    search(keyword: string) {
        return Base.get(`search?q=${keyword}&type=artist`)
    }

    get(id: string) {
        return Base.get(`artists/${id}`)
    }

    getRelatives(id: string) {
        return Base.get(`artists/${id}/related-artists`)
    }
}

export default new ArtistDataService()
