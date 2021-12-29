import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Logo from '../assets/images/logo.png'
import Layout from '../components/layout'
import IAuthReducer from '../interfaces/reducer/auth'
import { SetCallback, GetAccessToken } from '../redux/slices/auth'
import { RootState } from '../redux/store'

interface IAuthScreenProps {
    auth: IAuthReducer
    SetCallback: ({
        code,
        error,
    }: {
        code?: string | null
        error?: string | null
    }) => void
    GetAccessToken: (code: string) => void
}

const AuthScreen = (props: IAuthScreenProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const query = new URLSearchParams(location.search)
    const code = query.get('code')
    const error = query.get('error')

    const { auth, SetCallback, GetAccessToken } = props

    useEffect(() => {
        SetCallback({ code, error })
    }, [])

    useEffect(() => {
        if (auth.code) {
            GetAccessToken(auth.code)
        }
    }, [auth.code])

    useEffect(() => {
        if (auth.data) {
            navigate('/', { replace: true })
        }
    }, [auth.data])

    return (
        <Layout>
            {(!code || error) && <div>Invalid Link {error}</div>}
            {auth.code && (
                <>
                    <img src={Logo} width={200} />
                    {auth.is_loading && <div>Processing authentication</div>}
                    {!auth.is_loading && auth.is_error && (
                        <>
                            <div>{auth.error_message}</div>
                            <Link to="/">Retry Authentication</Link>
                        </>
                    )}
                </>
            )}
        </Layout>
    )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {
    SetCallback,
    GetAccessToken,
})(AuthScreen)
