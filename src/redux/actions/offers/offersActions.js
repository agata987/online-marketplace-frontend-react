import { BACKEND_URL } from '../../../const/config'

const setOffers = payload => ({ type: 'SET_OFFERS', payload })
const resetOffers = () => ({ type: 'RESET' })

const axios = require('axios')

export const fetchOffers = (search='', city_id='',  category_id='', ordering='creation_date', user_id='') => dispatch => {
    dispatch(resetOffers())
    axios.get(`${BACKEND_URL}api/offers/?limit=10&offset=0&search=${search}&ordering=${ordering}&city_id=${city_id}&user_id=${user_id}&category_id=${category_id}`)
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {})
}

export const fetchPageOffers = (link) => dispatch => {
    dispatch(resetOffers())
    axios.get(link)
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {})
}

