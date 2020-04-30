const Cookie = require("js-cookie");
const user = Cookie.get('user');
const user_data = JSON.parse(user)

const INITIAL_STATE = {
    username: user_data['username'] || '',
    password: user_data['password'] || '',
    email: user_data['email'] || '',
    firstname: user_data['first_name'] || '',
    lastname: user_data['last_name'] || '',
    acc_id: user_data['acc_id'] || '',
    isLoggedIn: false,
    loginLoadingState: 'init',
    authenticated: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'USER_SET_USERNAME':
            INITIAL_STATE.username = action.username
            return {
                ...state,
                username: action.username,
            };
        case 'USER_SET_PASSWORD':
            INITIAL_STATE.password = action.password
            console.log(INITIAL_STATE)
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
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.email,
            };
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstname: action.firstname,
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastname: action.lastname,
            };
        case 'SET_ACC_ID':
            return {
                ...state,
                acc_id: action.acc_id,
            };
        default:
            return state;
    }
};


export default loginReducer;