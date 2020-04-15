export const setUser = user => ({
    type: 'USER_SET_USER',
    user,
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




