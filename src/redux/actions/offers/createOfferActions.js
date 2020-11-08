import API_Handler from '../../../API_Handler'

const setLoading = () => ({type: 'LOADING'})
const setDone = () => ({type: 'DONE'})
const setErrors = payload => ({type: 'ERRORS', payload})
const createEditReset = () => ({type: 'CREATE EDIT RESET'})

export const createOffer = offerData => dispatch => {
    dispatch(setLoading())

    API_Handler(true, {method: 'post', url: 'offers/', data: offerData})
    .then(() => {
        dispatch(setDone())
    })
    .catch(err => dispatch(setErrors(err.response.data)))
}

export const editOffer = (offerId, newOfferData) => dispatch => {
    dispatch(setLoading())

    API_Handler(true, {method: 'patch', url: `offers/${offerId}/`, data: newOfferData})
    .then(() => {
        dispatch(setDone())
    })
    .catch(err => dispatch(setErrors(err.response.data)))
}

export const reset = () => dispatch => {
    dispatch(createEditReset())
}