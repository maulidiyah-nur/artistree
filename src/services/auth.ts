import qs from 'qs'

import { CLIENT } from '../constant'
import Base from './base'

class AuthDataService {
    baseConfig = {
        baseURL: 'https://accounts.spotify.com/api/',
        headers: {
            Authorization: `Basic ${btoa(
                process.env.REACT_APP_SPOTIFY_CLIENT_ID +
                    ':' +
                    process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
            )}`,
            'content-type': 'application/x-www-form-urlencoded',
        },
    }
    token(code: string) {
        const body = {
            code,
            redirect_uri: CLIENT.URL + CLIENT.REDIRECT_PATH,
            grant_type: 'authorization_code',
        }
        return Base.post(`token`, qs.stringify(body), this.baseConfig)
    }

    refresh(refresh_token: string) {
        const body = {
            refresh_token,
            grant_type: 'refresh_token',
        }
        return Base.post(`refresh_token`, body, this.baseConfig)
    }
}

export default new AuthDataService()
