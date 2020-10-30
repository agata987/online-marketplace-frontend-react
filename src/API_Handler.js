import axios from 'axios'
const BACKEND_API_URL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
})

axiosInstance.interceptors.request.use(request => {
    if (request.auth) {
        const accessToken = localStorage.getItem('access')
        request.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return request
})

// send the request again if 401 response status
const API_Handler = async (auth, request) => {
    if (auth)
        request = {...request, auth: true}
    
    const requestResponse = await axiosInstance(request)
    if (requestResponse.status === 401 && auth) {
        const refreshToken = localStorage.getItem('refresh')
        const refreshTokenResponse = await axiosInstance({method: 'post', url: 'auth/token/refresh/', data: {refresh: refreshToken}, auth: false})
        if (refreshTokenResponse.ok) {
            localStorage.setItem('access', refreshTokenResponse.data.access)
            const finalResponse = await axiosInstance(request)
            return finalResponse
        }
    }
    return requestResponse
}    

export default API_Handler