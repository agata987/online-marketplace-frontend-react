const defaultState = {
    categories_fetched: false
}

const offersReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_CATEGORIES':
            return {
                ...defaultState,
                categories_fetched: true,
                categories: action.payload
            }
        default: return state
    }
}

export default offersReducer