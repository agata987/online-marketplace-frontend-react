import axios from 'axios'
import { BACKEND_URL } from '../../const/config'

// action creators
const setTokens = () => ({type: 'SET_TOKENS'})
const clearTokens = () => ({type: 'CLEAR_TOKENS'})
const setCurrentUser = payload => ({type: 'SET_CURRENT_USER', payload})
const setLoginRegisterErrors = payload => ({type: 'SET_LOGIN_REGISTER_ERRORS', payload})

// util method
export const refreshAccessToken = () => dispatch => {
    const refreshToken = localStorage.getItem('refresh')
    axios.post(`${BACKEND_URL}api/auth/token/refresh/`, {refresh: refreshToken})
    .then(res => {
        localStorage.setItem('access', res.data.access)
    })
    .catch(() => dispatch(clearTokens())) // refresh token expired
}

// methods
export const getTokens = loginInfo => dispatch => {
    axios.post(`${BACKEND_URL}api/auth/token/`, {...loginInfo})
    .then(res => {
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(setTokens())
    })
    .catch(() => {dispatch(setLoginRegisterErrors(null))}) // login errors occurred
}

export const fetchCurrentUserData = () => {
    const accessToken = localStorage.getItem('access')
    axios.get(`${BACKEND_URL}api/current-user/`, {})
}