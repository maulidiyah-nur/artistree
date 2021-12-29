import IAuth from '../auth'

interface IAuthReducer {
    is_loading: boolean
    is_error: boolean
    error_message?: string
    data?: IAuth
    code?: string
}

export default IAuthReducer
