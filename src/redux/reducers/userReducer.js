const defaultState = {
    loggedIn: false,
    user: {}
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case 'SET_USER':
            return {
                loggedIn: true,
                user: { ...action.payload }
            }
        case 'LOG_OUT':
            localStorage.clear()
            return {
                loggedIn: false,
                user: {}
            }
        case 'LOG_ERROR':
            localStorage.clear()
            return {
                loggedIn: false,
                error: true,
                registerErrors: { ...action.payload }
            }
        default: return state
    }
}

export default userReducer