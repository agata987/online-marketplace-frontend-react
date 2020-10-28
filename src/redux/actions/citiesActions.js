import { BACKEND_URL } from '../../const/config'

const setCities = payload => ({ type: 'SET_CITIES', payload })

const axios = require('axios')

export const fetchCities = () => dispatch => {
    axios.get(`${BACKEND_URL}api/voivodeships_cities_list/`)
    .then(res => {
        dispatch(setCities(res.data))
    })
    .catch(() => {})
}