import API_Handler from '../../../API_Handler'

const setOffers = payload => ({ type: 'SET_OFFERS', payload })
const resetOffers = () => ({ type: 'RESET' })

// filtering and ordering
export const fetchOffers = (search='', city_id='',  category_id='', ordering='creation_date', user_id='') => dispatch => {
    dispatch(resetOffers())

    API_Handler(false, {method: 'get', url: `offers/?limit=4&offset=0&search=${search}&ordering=${ordering}&city_id=${city_id}&user_id=${user_id}&category_id=${category_id}`})
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {})
}

// for offers pagination (fetch next/ previous page), the link is given by api server
export const fetchPageOffers = link => dispatch => {
    dispatch(resetOffers())

    API_Handler(false, {method: 'get', url: link})
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {})
}