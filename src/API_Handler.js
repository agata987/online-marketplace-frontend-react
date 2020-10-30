import axios from 'axios'
const BACKEND_URL = 'http://127.0.0.1:8000/'

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
})

// to check if the global handler should be used or not
const isHandlerEnabled = (config={}) => {
    return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true
}

/*
handler disable example:
axiosInstance.get('/v2/api-endpoint', { handlerEnabled: false })
*/

// request interceptor
const requestHandler = request => {
    if (isHandlerEnabled(request)) {
        const accessToken = localStorage.getItem('access')
        request.headers['Authorization'] = `Bearer ${accessToken}`
    }
}

axiosInstance.interceptors.request.use(request => requestHandler(request))

// 401 response handler, refreash access token
const errorHandler = error => {
    if (isHandlerEnabled(error.config) && error.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh')
        axios.post(`${BACKEND_URL}api/auth/token/refresh/`, {refresh: refreshToken})
        .then(res => {
            localStorage.setItem('access', res.data.access)
        })
        .catch(() => {})
    }
    return Promise.reject({...error})
}

axiosInstance.interceptors.response.use(
    response => (response),
    error => errorHandler(error)
)

const API_Handler = (request, success, error) => {
    axiosInstance(request)
    .then(res => success(res))
    .catch(err => error(err))
}

export default API_Handler