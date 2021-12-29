import { SPOTIFY, STORAGE } from '../../constant'

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem(STORAGE.TOKEN)

    if (!token) {
        window.location.href = SPOTIFY.AUTH_PAGE
    }

    return children
}

export default RequireAuth
