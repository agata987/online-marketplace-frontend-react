const defaultState = {
    offers_fetched: false,
    offers: []
}

const userOffersReducer = (state=defaultState, action) => {
    switch(action.type){
        case 'SET_USER_OFFERS':
            return {
                offers_fetched: true,
                offers: action.payload,
            }
        case 'CLEAR_OFFERS':
            return {
                offers_fetched: false,
                offers: []
            }
        default: return state
    }
}

export default userOffersReducer