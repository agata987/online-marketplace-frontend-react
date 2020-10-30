import API_Handler from '../../../API_Handler'

const setCategories = payload => ({ type: 'SET_CATEGORIES', payload })

export const fetchCategories = () => dispatch => {
    API_Handler(false, {method: 'get', url: 'offer-categories/'})
    .then(res => {
        dispatch(setCategories(res.data))
    })
    .catch(() => {})
}