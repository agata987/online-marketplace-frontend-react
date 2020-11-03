import API_Handler from '../../API_Handler'

const reset = () => ({ type: 'RESET' })
const setCity = payload => ({ type: 'SET_CITY', payload })

export const getCity = id => dispatch => {
    API_Handler(false, {method: 'get', url: `citites/${id}`})
    .then(res => {
        dispatch(setCity(res.data))
    })
    .catch(() => {dispatch(reset())})
}