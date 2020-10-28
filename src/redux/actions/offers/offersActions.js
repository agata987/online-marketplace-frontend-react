import { BACKEND_URL } from '../../../const/config'

const setOffers = payload => ({ type: 'SET_OFFERS', payload })

const axios = require('axios')

export const fetchOffers = (search = '', ordering='creation_date', city_id='', user_id='', category_id='') => dispatch => {
    axios.get(`${BACKEND_URL}api/offers/?search=${search}&ordering=${ordering}&city_id=${city_id}&user_id=${user_id}&category_id=${category_id}`)
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {})
}
