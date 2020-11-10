import API_Handler from '../../../API_Handler'

const setOffers = payload => ({ type: 'SET_FAVOURITES_JOB_OFFERS', payload })
const reset = () => ({ type: 'RESET_FAVOURITES_JOB_OFFERS' })

export const fetchJobOffers = () => dispatch => {
    dispatch(reset())

    API_Handler(true, {method: 'get', url: 'joboffers/favourites/list/'})
    .then(res => {
        dispatch(setOffers(res.data))
    })
    .catch(() => {dispatch(reset())})
}