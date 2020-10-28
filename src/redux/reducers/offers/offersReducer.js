const defaultState = {
    offers_fetched: false,
}

const offersReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_OFFERS':
            return {
                offers_fetched: true,
                offers: action.payload
            }
        default: return state
    }
}

export default offersReducer