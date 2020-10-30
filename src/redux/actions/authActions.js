import API_Handler from '../../API_Handler'

// action creators
const setTokens = () => ({type: 'SET_TOKENS'})
const clearTokens_ = () => ({type: 'CLEAR_TOKENS'})
//const setCurrentUser = payload => ({type: 'SET_CURRENT_USER', payload})
const setLoginRegisterErrors = payload => ({type: 'SET_LOGIN_REGISTER_ERRORS', payload})

// methods
export const getTokens = loginInfo => dispatch => {
    API_Handler(false, {method: 'post', url: 'auth/token/', data: loginInfo})
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


// export const fetchCurrentUserData = () => dispatch => {
//     const accessToken = localStorage.getItem('access')
//     axios.get(`${BACKEND_URL}api/current-user/`, {headers: {Authorization: `Bearer ${accessToken}`}})
//     .then(res => {
//         dispatch(setCurrentUser(res.data))
//     })
//     .catch()
// }