const INITIAL_STATE = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    isSignedUp: false,
    isSignedUpLoadingState: 'init',
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
        case 'USER_SET_FIRST_NAME':
            return {
                ...state,
                firstname: action.firstname,
            };
        case 'USER_SET_LAST_NAME':
            return {
                ...state,
                lastname: action.lastname,
            };
        case 'USER_SET_IS_SIGNED_UP':
            return {
                ...state,
                isSignedUp: action.isSignedUp,
            };
        case 'USER_SET_IS_SIGNED_UP_LOADING_STATE':
            return {
                ...state,
                isSignedUpLoadingState: action.isSignedUpLoadingState,
            };
        default:
            return state;
    }
};


export default signupReducer;