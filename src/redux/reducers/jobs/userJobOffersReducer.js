const defaultState = {
    offers_fetched: false,
    offers: []
}

const userJobOffersReducer = (state=defaultState, action) => {
    switch(action.type){
        case 'SET_USER_JOB_OFFERS':
            return {
                offers_fetched: true,
                offers: action.payload,
            }
        case 'CLEAR_USER_JOB_OFFERS':
            return {
                offers_fetched: false,
                offers: []
            }
        default: return state
    }
}

export default userJobOffersReducer