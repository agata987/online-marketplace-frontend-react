import API_Handler from '../../../API_Handler'

const setOffers = payload => ({ type: 'SET_FAVOURITES_OFFERS', payload })
const reset = () => ({ type: 'RESET_FAVOURITES_OFFERS' })

export const fetchOffers = () => dispatch => {
    dispatch(reset())

    API_Handler(true, {method: 'get', url: 'offers/favourites/list/'})
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {dispatch(reset())})
}