const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            return {
                ...state,
                authError: "Login failed"
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authError: null
            }
        case "SIGNOUT_SUCCESS":
            return {
                state
            }
        case "SIGNUP_SUCCESS":
            return {
                ...state,
                authError: null
            }
        case "SIGNUP_ERROR":
            return {
                ...state,
                authError: action.err.message
            }
        case "RESET_ERROR":
            return {
                ...state,
                authError: action.err.message
            }
        case "CLEAR_ERROR":
            return {
                ...state,
                authError: null
            }
        default:
            return state
    }
}

export default authReducer;