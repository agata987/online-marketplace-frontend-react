const defaultState = {
    loading: false,
    errors: null,
    done: false
}

const createOfferReducer = (state=defaultState, action) => {
    switch(action.type){
        case 'LOADING':
            return {
                loading: true,
                errors: null,
                done: false
            }
        case 'DONE':
            return {
                loading: false,
                errors: null,
                done: true
            }
        case 'ERRORS':
            return {
                loading: false,
                errors: action.payload,
                done: false
            }
        default: return state
    }
}

export default createOfferReducer