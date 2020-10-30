const defaultState = {
    tokensFetched: false,
    user: {}
}

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        // tokens
        case 'SET_TOKENS':
            return {
                tokensFetched: true,
                user: {}
            }
        case 'CLEAR_TOKENS':
            localStorage.clear()
            return {
                tokensFetched: false,
                user: {}
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
                user: {},
                loginErrors: true,
                registerErrors: {...action.payload}
            }
        default: return state
    }
}

export default authReducer