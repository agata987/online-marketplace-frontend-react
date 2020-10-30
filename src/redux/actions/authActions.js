import API_Handler from '../../API_Handler'

// action creators
const setTokens = () => ({type: 'SET_TOKENS'})
const clearTokens_ = () => ({type: 'CLEAR_TOKENS'})
const setCurrentUser = payload => ({type: 'SET_CURRENT_USER', payload})
const setLoginRegisterErrors = payload => ({type: 'SET_LOGIN_REGISTER_ERRORS', payload})

// methods

// tokens
export const getTokens = loginData => dispatch => {
    API_Handler(false, {method: 'post', url: 'auth/token/', data: loginData})
    .then(res => {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(setTokens())
    })
    .catch(() => {dispatch(setLoginRegisterErrors(null))})
}

export const clearTokens = () => dispatch => {
    dispatch(clearTokens_())
}

// user
export const fetchCurrentUserData = () => dispatch => {
    API_Handler(true, {method: 'get', url: 'current-user/'})
    .then(res => {
        dispatch(setCurrentUser(res.data))
    })
    .catch(() => {dispatch(clearTokens_())})
}

export const registerUser = registerData => dispatch => {
    API_Handler(false, {method: 'post', url: 'auth/register/', data: registerData})
    .catch(err => dispatch(setLoginRegisterErrors(err.response.data)))
}