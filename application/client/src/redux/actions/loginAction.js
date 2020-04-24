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
export const setLoadingState = loadingState => ({
    type: 'USER_SET_LOADING_STATE',
    loadingState,
});

export const login = () => (dispatchEvent, getState) => {
    console.log('Log In Function !!!');
    const username = getState().loginReducer.userName;
    const password = getState().loginReducer.password;

    const url =(`http://18.191.184.143:3001/login?username=${username}&password=${password}`)
    fetch(url)
    .then((res) => {
        if(res.data){
            dispatchEvent(setIsLoggedIn('init'));
        }else{
            dispatchEvent(setLoadingState('error'));
        }
})};
//}