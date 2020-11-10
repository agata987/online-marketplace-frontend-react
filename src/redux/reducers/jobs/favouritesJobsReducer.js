const defaultState = {
    fetched: false,
    offers: null
}

const favouritesJobOffersReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_FAVOURITES_JOB_OFFERS':
            return {
                fetched: true,
                offers: action.payload
            }
        case 'RESET_FAVOURITES_JOB_OFFERS':
            return {
                fetched: false,
                offers: null
            }
        default: return state
    }
}

export default favouritesJobOffersReducer