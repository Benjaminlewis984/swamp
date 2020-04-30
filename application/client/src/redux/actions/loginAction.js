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

export const login = () => (dispatchEvent, getState) => {
    console.log('Log In Function !!!');
    const axios = require("axios");

    const username = getState().loginReducer.username;
    const password = getState().loginReducer.password;
    if(username.length > 0 && password.length > 0){
        axios.post(`http://18.191.184.143:3001/login?username=${username}&password=${password}`, {validateStatus:false})
        .then((response) => {
            console.log('Login data :::',response);
            if(response.data.success==='true'){
                dispatchEvent(setIsLoggedIn('init'));
                Cookies.set('isLoggedIn', true);
                window.location.reload(false)
            }
           
        })
        .catch(e => {
                dispatchEvent(setLoadingState('error'));
        })
};
};