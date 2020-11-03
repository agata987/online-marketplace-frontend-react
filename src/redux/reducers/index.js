import {combineReducers} from 'redux'

import authReducer from './authReducer'
import citiesReducer from './citiesReducer'
import offersReducer from './offers//offersReducer'
import offerCategoriesReducer from './offers/offerCategoriesReducer'
import createOfferReducer from './offers/createOfferReducer'
import checkCityReducer from './checkCityReducer'

const rootReducer = combineReducers({
    authReducer,
    citiesReducer,
    offersReducer,
    offerCategoriesReducer,
    createOfferReducer,
    checkCityReducer,
})

export default rootReducer