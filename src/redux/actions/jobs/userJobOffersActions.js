import API_Handler from '../../../API_Handler'

const setUserOffers = payload => ({ type: 'SET_USER_JOB_OFFERS', payload })
const resetUserOffers = () => ({ type: 'CLEAR_USER_JOB_OFFERS' })

// filtering and ordering
export const fetchUserOffers = user_id => dispatch => {
    dispatch(resetUserOffers())

    API_Handler(false, {method: 'get', url: `joboffers/?ordering=-creation_date&user_id=${user_id}`})
    .then(res => {
        dispatch(setUserOffers(res.data))
    })
    .catch(() => {resetUserOffers()})
}

export const deleteOffer = (offer_id, user_id) => dispatch => {
    API_Handler(true, {method: 'delete', url: `joboffers/${offer_id}/`})
    .then(() => {
        dispatch(fetchUserOffers(user_id))
    })
    .catch(() => {})
}