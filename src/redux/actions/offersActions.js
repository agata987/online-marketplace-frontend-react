import { BACKEND_URL } from '../../const/config'

const setCategories = payload => ({ type: 'SET_CATEGORIES', payload })

const axios = require('axios')

export const fetchCategories = () => dispatch => {
    axios.get(`${BACKEND_URL}api/offer-categories/`)
    .then(res => {
        dispatch(setCategories(res.data))
    })
    .catch(() => {})
}