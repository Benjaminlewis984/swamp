const INITIAL_STATE = {
    username: '',
    password: '',
    isLoggedIn: false,
    loginLoadingState: 'init',
    authenticated: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'USER_SET_USERNAME':
            return {
                ...state,
                username: action.username,
            };
        case 'USER_SET_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        case 'USER_SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        case 'USER_SET_LOG_IN_LOADING_STATE':
            return {
                ...state,
                loginLoadingState: action.loginLoadingState,
            };
        case 'USER_SET_AUTHENTICATED':
            return {
                ...state,
                authenticated: action.authenticated,
            };
        default:
            return state;
    }
};


export default loginReducer;