import {combineReducers} from 'redux'

import authReducer from './authReducer'
import citiesReducer from './citiesReducer'
import offersReducer from './offers//offersReducer'
import offerCategoriesReducer from './offers/offerCategoriesReducer'

const rootReducer = combineReducers({
    authReducer,
    citiesReducer,
    offersReducer,
    offerCategoriesReducer
})

export default rootReducer