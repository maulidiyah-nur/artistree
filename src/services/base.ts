import { AnyAction, EnhancedStore } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

import { STORAGE } from '../constant'
import { RefreshAccessToken } from '../redux/slices/auth'

let store: EnhancedStore
export const injectStore = (_store: EnhancedStore) => {
    store = _store
}
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
    async config => {
        const extendedConfig = config as IExtendedAxiosRequestConfig
        if (extendedConfig.requireToken) {
            const tokenStorage = localStorage.getItem(STORAGE.TOKEN)
            if (!tokenStorage) throw Error('No token available')
            else {
                const [token, expires] = tokenStorage.split(':')
                const now = Number(new Date().getTime() / 1000).toFixed(0)
                if (Number(expires) < Number(now)) {
                    const refresh_token = localStorage.getItem(
                        STORAGE.REFRESH_TOKEN,
                    )
                    if (refresh_token) {
                        await store.dispatch(
                            RefreshAccessToken(
                                refresh_token,
                            ) as unknown as AnyAction,
                        )
                    } else {
                        localStorage.removeItem(STORAGE.TOKEN)
                        localStorage.removeItem(STORAGE.REFRESH_TOKEN)
                        window.location.href = '/'
                    }

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
