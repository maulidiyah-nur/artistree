import Base from './base'

class ArtistDataService {
    controller?: AbortController
    search(keyword: string) {
        if (this.controller) {
            this.controller.abort()
        }
        this.controller = new AbortController()
        const signal = this.controller.signal
        return Base.get(`search?q=${keyword}&type=artist`, { signal })
    }

    get(id: string) {
        return Base.get(`artists/${id}`)
    }

    getRelatives(id: string) {
        return Base.get(`artists/${id}/related-artists`)
    }
}

export default new ArtistDataService()
