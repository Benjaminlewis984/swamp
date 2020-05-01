import Cookies from 'js-cookie';

export const setUserName = username => ({
    type: 'USER_SET_USERNAME',
    username,
});
export const setPassword = password => ({
    type: 'USER_SET_PASSWORD',
    password,
});
export const setIsLoggedIn = isLoggedIn => ({
    type: 'USER_SET_IS_LOGGED_IN',
    isLoggedIn,
});
export const setLoadingState = loginLoadingState => ({
    type: 'USER_SET_LOG_IN_LOADING_STATE',
    loginLoadingState,
});
export const setAuthenticated = authenticated => ({
    type: 'USER_SET_AUTHENTICATED',
    authenticated,
});

export const setACCID = acc_id => ({
    type: 'SET_ACC_ID',
    acc_id,
});

export const setEmail = email => ({
    type: 'SET_EMAIL',
    email,
});

export const setLastName = lastname => ({
    type: 'SET_LAST_NAME',
    lastname,
});

export const setFirstName = firstname => ({
    type: 'SET_FIRST_NAME',
    firstname,
});

