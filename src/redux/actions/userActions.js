import { BACKEND_URL } from '../../config'

// action creators (return an action object)

const setUser = payload => ({ type: 'SET_USER', payload })
const setUserError = () => ({ type: 'LOG_ERROR' })

export const logOut = () => ({ type: 'LOG_OUT' })

// methods (handle API requests)

const axios = require('axios')

// login user
export const fetchUser = userInfo => dispatch => {
    axios.post(`${BACKEND_URL}api/auth/token/`, {
        ...userInfo
    })
    .then( res => {
        localStorage.setItem('token', res.data.token)
        dispatch(setUser(res.data.user))
    })
    .catch( () => {
        dispatch(setUserError())
    })
}

// register a new user
export const signUpUser = userInfo => dispatch => {
    
    axios.post(`${BACKEND_URL}api/auth/register/`, {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password
    })
    .then( res => {
        localStorage.setItem('token', res.data.token)
        dispatch(setUser(res.data.user))
    })
    .catch( err => {
        console.log(err.response.data)
    })
}