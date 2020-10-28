import {combineReducers} from 'redux'

import userReducer from './userReducer'
import citiesReducer from './citiesReducer'
import offersReducer from './offers//offersReducer'
import offerCategoriesReducer from './offers/offerCategoriesReducer'

const rootReducer = combineReducers({
    userReducer,
    citiesReducer,
    offersReducer,
    offerCategoriesReducer
})

export default rootReducer