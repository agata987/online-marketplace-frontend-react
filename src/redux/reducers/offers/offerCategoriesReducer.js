const defaultState = {
    categories_fetched: false,
}

const offerCategoriesReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_CATEGORIES':
            return {
                categories_fetched: true,
                categories: action.payload
            }
        default: return state
    }
}

export default offerCategoriesReducer