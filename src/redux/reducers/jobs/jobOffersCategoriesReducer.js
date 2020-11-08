const defaultState = {
    categories_fetched: false,
}

const jobOfferCategoriesReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_JOB_CATEGORIES':
            return {
                categories_fetched: true,
                categories: action.payload
            }
        default: return state
    }
}

export default jobOfferCategoriesReducer