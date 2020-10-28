const defaultState = {
    categories_fetched: false,
    offers_fetched: false,
}

const offersReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_CATEGORIES':
            return {
                ...defaultState,
                categories_fetched: true,
                categories: action.payload
            }
        case 'SET_OFFERS':
            return {
                ...defaultState,
                offers_fetched: true,
                offers: action.payload
            }
        default: return state
    }
}

export default offersReducer