import {combineReducers} from 'redux'

import userReducer from './userReducer'
import citiesReducer from './citiesReducer'
import offersReducer from './offersReducer'

const rootReducer = combineReducers({
    userReducer,
    citiesReducer,
    offersReducer,
})

export default rootReducer