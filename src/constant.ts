export const STORAGE = {
    TOKEN: '__at_tkn__',
    REFRESH_TOKEN: '__at_rfrsh_tkn__',
}

export const CLIENT = {
    URL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/'
            : 'https://upbeat-clarke-c10575.netlify.app/',
    REDIRECT_PATH: 'auth-callback',
}

export const SPOTIFY = {
    AUTH_PAGE: `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${CLIENT.URL}${CLIENT.REDIRECT_PATH}`,
}
