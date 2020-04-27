export const setUserName = (username) => ({
    type: 'USER_SET_USERNAME',
    username,
});
export const setPassword = (password) => ({
    type: 'USER_SET_PASSWORD',
    password,
});
export const setEmail = (email) => ({
    type: 'USER_SET_EMAIL',
    email,
});
export const setFirstName = (firstname) => ({
    type: 'USER_SET_FIRST_NAME',
    firstname,
});
export const setLastName = (lastname) => ({
    type: 'USER_SET_LAST_NAME',
    lastname,
});
export const setIsSignedUp = (isSignedUp) => ({
    type: 'USER_SET_IS_SIGNED_UP',
    isSignedUp,
});
export const setSignedUpLoadingState = (isSignedUpLoadingState) => ({
    type: 'USER_SET_IS_SIGNED_UP_LOADING_STATE',
    isSignedUpLoadingState,
});

export const signup = () => (dispatchEvent, getState) => {
    console.log('Sign up Function !!!');
    const username = getState().signupReducer.username;
    const password = getState().signupReducer.password;
    const email = getState().signupReducer.email;
    const firstname = getState().signupReducer.firstname;
    const lastname = getState().signupReducer.lastname;

    if(username.length > 0 && password.length > 0){
        const axios = require("axios");
        const body = {
            username: `${username}`,
            password: `${password}`,
            email: `${email}`,
            firstname: `${firstname}`,
            lastname: `${lastname}`,
        };
        // axios.post(`http://18.191.184.143:3001/login?username=${username}&password=${password}`)
        // .then((res) =>{
        //     console.log(res.data);
        // })
        // .then((response) => {
            // if(response.data.success){
            //     dispatchEvent(setSignedUpLoadingState('error'));
            // }
            //lsof -i:3000
            //else{
                axios.post(`http://18.191.184.143:3001/register`,body) 
                .then((response) =>{
                    console.log("second url", response);
                    if(response.data.success){
                        console.log("I'm here in if = true", response);
                        dispatchEvent(setIsSignedUp(true));
                    }
                    else{
                        console.log("I'm here in else/ ", response)
                        dispatchEvent(setSignedUpLoadingState('error'));
                    }
                })
            //}
        // })
}
};