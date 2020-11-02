const defaultState = {
    loading: false,
    errors: null
}

const createOfferReducer = (state=defaultState, action) => {
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                errors: null
            }
        case 'DONE':
            return {
                loading: false,
                errors: null
            }
        case 'ERRORS':
            return {
                loading: false,
                errors: action.payload
            }
        default: return state
    }
}

export default createOfferReducer