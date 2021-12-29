import axios, { AxiosRequestConfig } from 'axios'

import { STORAGE } from '../constant'

interface IExtendedAxiosRequestConfig extends AxiosRequestConfig {
    requireToken: boolean
}

const instance = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
        'Content-type': 'application/json',
    },
    requireToken: true,
} as AxiosRequestConfig)

instance.interceptors.request.use(
    config => {
        const extendedConfig = config as IExtendedAxiosRequestConfig
        if (extendedConfig.requireToken) {
            const tokenStorage = localStorage.getItem(STORAGE.TOKEN)
            if (!tokenStorage) throw Error('No token available')
            else {
                const [token, expires] = tokenStorage.split(':')
                const now = Number(new Date().getTime() / 1000).toFixed(0)
                if (Number(expires) < Number(now)) {
                    throw Error('token expired')
                } else {
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${token}`,
                    }
                }
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

export default instance
