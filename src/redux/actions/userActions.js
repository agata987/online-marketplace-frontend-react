import { BACKEND_URL } from '../../const/config'

// action creators (return an action object)

const setUser = payload => ({ type: 'SET_USER', payload })
const setUserError = payload => ({ type: 'LOG_ERROR', payload })

const logOut = () => ({ type: 'LOG_OUT' })

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
        dispatch(setUserError())    // set login error
    })
}

// logout user
export const logoutUser = () => dispatch => {
    dispatch(logOut())
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
        dispatch(setUser({
            username: res.data.username,
            email: res.data.email,
            email_verified: false
        }))
    })
    .catch( err => {
        dispatch(setUserError(err.response.data))   // set register errors
    })    
}

// login user if there is a valid token in storage
export const autoLogin = () => dispatch => {
    axios({method: 'GET', url: `${BACKEND_URL}api/current-user/`, headers: {Authorization: `JWT ${localStorage.getItem("token")}`}})
    .then( res => {
        dispatch(setUser(res.data))
    })
    .catch( () => {
        dispatch(logOut())    // set login error
    })
}

// get new token
export const getToken = userInfo => dispatch => {
    axios.post(`${BACKEND_URL}api/auth/token/`, {
        ...userInfo
    })
    .then( res => {
        localStorage.setItem('token', res.data.token)
    })
    .catch( () => {
        dispatch(logOut())
    })
}
