import {combineReducers} from 'redux'

import authReducer from './authReducer'
import citiesReducer from './citiesReducer'
import offersReducer from './offers//offersReducer'
import offerCategoriesReducer from './offers/offerCategoriesReducer'
import createOfferReducer from './offers/createOfferReducer'
import checkCityReducer from './checkCityReducer'
import chatReducer from './chatReducer'
import userOffersReducer from './offers/userOffersReducer'
import jobOffersReducer from './jobs/jobOffersReducer'
import jobOfferCategoriesReducer from './jobs/jobOffersCategoriesReducer'

const rootReducer = combineReducers({
    authReducer,
    citiesReducer,
    offersReducer,
    offerCategoriesReducer,
    createOfferReducer,
    checkCityReducer,
    chatReducer,
    userOffersReducer,
    jobOffersReducer,
    jobOfferCategoriesReducer,
})

export default rootReducer