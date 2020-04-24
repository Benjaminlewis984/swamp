const INITIAL_STATE = {
    username: '',
    password: '',
    email: '',
    isSignedUp: false,
    loadingState: 'init',
};

const signupReducer = (state = INITIAL_STATE, action) => {
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
        case 'USER_SET_EMAIL':
            return {
                ...state,
                email: action.email,
            };
        case 'USER_SET_IS_SIGNED_UP':
            return {
                ...state,
                isSignedUp: action.isSignedUp,
            };
        case 'USER_SET_LOADING_STATE':
            return {
                ...state,
                loadingState: action.loadingState,
            };
        default:
            return state;
    }
};


export default signupReducer;