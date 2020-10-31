const defaultState = {
    tokensFetched: false,
    user: null
}

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        // tokens
        case 'CLEAR_TOKENS':
            localStorage.clear()
            return {
                tokensFetched: false,
                user: null
            }
        // current user info
        case 'SET_CURRENT_USER':
            return {
                tokensFetched: true,
                user: {...action.payload}
            }
        // login or register errors from backend server
        case 'SET_LOGIN_REGISTER_ERRORS':
            return {
                tokensFetched: false,
                user: null,
                loginErrors: true,
                registerErrors: {...action.payload}
            }
        default: return state
    }
}

export default authReducer