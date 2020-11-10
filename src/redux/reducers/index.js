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
import createJobOfferReducer from './jobs/createJobOfferReducer'
import userJobOffersReducer from './jobs/userJobOffersReducer'
import favouritesOffersReducer from './offers/favouritesOffersReducer'
import favouritesJobOffersReducer from './jobs/favouritesJobsReducer'

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
    createJobOfferReducer,
    userJobOffersReducer,
    favouritesOffersReducer,
    favouritesJobOffersReducer
})

export default rootReducer