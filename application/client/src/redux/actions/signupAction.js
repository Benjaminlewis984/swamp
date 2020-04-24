export const setUserName = (username) => ({
    type: 'USER_SET_USERNAME',
    username,
});

export const setPassword = (password) => ({
    type: 'USER_SET_PASSWORD',
    password,
});
export const setIsSignedUp = (isSignedUp) => ({
    type: 'USER_SET_IS_LOGGED_IN',
    isSignedUp,
});
export const setLoadingState = (loadingState) => ({
    type: 'USER_SET_LOADING_STATE',
    loadingState,
});

export const signup = () => (dispatchEvent, getState) => {
    console.log('Sign up Function !!!');
    const username = getState().signupReducer.username;
    const password = getState().signupReducer.password;
    const notes = getState().notesReducer.notes;
    if(username.length > 0 && password.length > 0){
        const axios = require("axios");
        const body = {
            username: `${username}`,
            password: `${password}`,
            notes: `${notes}` 
        };
        const url =(`http://18.191.184.143:3001/signup?username=${username}&password=${password}`)
        fetch(url)
        .then((data) => {
            console.log(data);
            if(!data.valid){
                dispatchEvent(setLoadingState('error'));
            }
            else{
                axios.post(`http://18.191.184.143:3001/signup?username=${username}&password=${password}`,body) 
            }
        })
}
};