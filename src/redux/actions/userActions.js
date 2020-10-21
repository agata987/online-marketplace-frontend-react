import BACKEND_URL from '../../config'

// action creators (return an action object)

const setUser = payload => ({ type: 'SET_USER', payload })

export const logOut = () => ({ type: 'LOG_OUT' })

// methods (handle API requests)

const axios = require('axios')

export const fetchUser = userInfo => dispatch => {
    axios.post(`${BACKEND_URL}/api/auth/token`, {
        ...userInfo
    })
    .then( res => {
        localStorage.setItem('token', res.data.token)
        dispatch(setUser(res.data.user))
    })
}