import axios from 'axios'
const BACKEND_API_URL = 'http://127.0.0.1:8000/api/'

const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
})

const setAuthHeader = request => {
    const accessToken = localStorage.getItem('access')
    return {...request, headers: {Authorization: `Bearer ${accessToken}`}}
}

// send the request again if 401 response status
const API_Handler = async (auth, request) => {
    if (auth)
        request = setAuthHeader(request)
    
    try {
        return await axiosInstance(request)
    } catch (err) {
        if (err.response.status === 401 && auth) {
            const refreshToken = localStorage.getItem('refresh')
            try {
                const refreshTokenResponse = await axiosInstance({method: 'post', url: 'auth/token/refresh/', data: {refresh: refreshToken}, auth: false})
                localStorage.setItem('access', refreshTokenResponse.data.access)
                request = setAuthHeader(request)
                return await axiosInstance(request)
            } catch(err) {return Promise.reject(err)}
        } 
        return Promise.reject(err)
    }
}    

export default API_Handler