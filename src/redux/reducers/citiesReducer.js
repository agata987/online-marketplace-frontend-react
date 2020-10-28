const defaultState = {
    fetched: false
}

const citiesReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_CITIES':
            return {
                fetched: true,
                voivodeships: action.payload
            }
        default: return state
    }
}

export default citiesReducer