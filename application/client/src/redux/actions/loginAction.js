export const setUserName = (username) => ({
  type: "USER_SET_USERNAME",
  username,
});
export const setPassword = (password) => ({
  type: "USER_SET_PASSWORD",
  password,
});
export const setIsLoggedIn = (isLoggedIn) => ({
  type: "USER_SET_IS_LOGGED_IN",
  isLoggedIn,
});
export const setLoadingState = (loginLoadingState) => ({
  type: "USER_SET_LOG_IN_LOADING_STATE",
  loginLoadingState,
});
export const setAuthenticated = (authenticated) => ({
  type: "USER_SET_AUTHENTICATED",
  authenticated,
});

export const setACCID = (acc_id) => ({
  type: "SET_ACC_ID",
  acc_id,
});

export const setEmail = (email) => ({
  type: "SET_EMAIL",
  email,
});

export const setLastName = (lastname) => ({
  type: "SET_LAST_NAME",
  lastname,
});

export const setFirstName = (firstname) => ({
  type: "SET_FIRST_NAME",
  firstname,
});

export const login = () => (dispatchEvent, getState) => {
  const axios = require("axios");
  axios.defaults.withCredentials = true;

  const username = getState().loginReducer.username;
  const password = getState().loginReducer.password;

  if (username.length > 0 && password.length > 0) {
    axios
      .post(
        `http://18.191.184.143:3001/login?username=${username}&password=${password}`,
        { validateStatus: false }
      )
      .then((response) => {
        if (response.data.success === "true") {

          dispatchEvent(setIsLoggedIn(true));
          dispatchEvent(setUserName(response.data.user.username));
          dispatchEvent(setEmail(response.data.user.email));
          dispatchEvent(setFirstName(response.data.user.first_name));
          dispatchEvent(setLastName(response.data.user.last_name));

          window.location.reload(true);
          console.log(response);
        }
      })
      .catch((e) => {
        // dispatchEvent(setLoadingState('error'));
      });
  }
};
