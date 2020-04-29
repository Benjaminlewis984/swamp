export const setUserName = username => ({
    type: 'USER_SET_USERNAME',
    username,
});
// setUser('hello') -> {type: 'USER_SET_USER', user: 'hello'}
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

export const login = () => (dispatchEvent, getState) => {
    console.log('Log In Function !!!');
    const axios = require("axios");
    const Cookies = require("js-cookie");
    const React = require("react");
    
    //const [auth, setAuth] = React.useState(false);

    // const readCookie = () => {
    // const user = Cookies.get(username);
    // }    
    const username = getState().loginReducer.username;
    const password = getState().loginReducer.password;

    Cookies.set('username',username);
//   React.useEffect(() => {
//     readCookie();
//   },[])
    if(username.length > 0 && password.length > 0){
        axios.post(`http://18.191.184.143:3001/login?username=${username}&password=${password}`, {validateStatus:false})
        .then((response) => {
            console.log('Login data :::',response);
            if(response.data.success==='true'){
                console.log("After Dispatch, Login is updated to accurate to correct value");
                dispatchEvent(setIsLoggedIn('init'));
                dispatchEvent(setAuthenticated(true));
                const authenticated = getState().loginReducer.authenticated;
                Cookies.set('isLoggedIn',authenticated);
            }  
        })
        .catch(e => {
                dispatchEvent(setLoadingState('error'));
        })
};
};