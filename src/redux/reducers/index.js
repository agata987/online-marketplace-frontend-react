import {combineReducers} from 'redux'

// import userReducer from './userReducer'
import authReducer from './authReducer'
import citiesReducer from './citiesReducer'
import offersReducer from './offers//offersReducer'
import offerCategoriesReducer from './offers/offerCategoriesReducer'

const rootReducer = combineReducers({
    // userReducer,
    authReducer,
    // citiesReducer,
    // offersReducer,
    // offerCategoriesReducer
})

export default rootReducer