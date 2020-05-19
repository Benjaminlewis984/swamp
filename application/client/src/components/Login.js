import React from "react";
import { connect } from "react-redux";
import {
  setUserName,
  setPassword,
  setEmail,
  setFirstName,
  setLastName,
  setIsLoggedIn,
  login,
} from "../redux/actions/loginAction";
import { Redirect } from "react-router-dom";
import { ButtonContainer } from "./Button";

const Login = ({
  username,
  password,
  firstName,
  lastName,
  email,
  isLoggedIn,
  loginLoadingState,
  dispatch,
  //authenticated,
}) => {

  if (isLoggedIn) {
    console.log("Test ::: I'm here ");
    return (
      <div>
        {/* <p>Welcome {username}!!!</p> */}
        <Redirect path="/result"></Redirect>
      </div>
    );
  }

  return (
    <div class="container-fluid bg-light py-3">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card card-body">
            <h3 class="text-center mb-4">Login</h3>
            <fieldset>
              <div class="form-group has-success">
                <input
                  class="form-control input-lg"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => dispatch(setUserName(e.target.value))}
                ></input>
              </div>
              <div class="form-group has-success">
                <input
                  class="form-control input-lg"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                ></input>
              </div>
              <ButtonContainer id="login" onClick={() => dispatch(login())}>
                Log In
              </ButtonContainer>
              <p className="text-center">
                <a href="signup">Don’t have account?</a>
              </p>
              {loginLoadingState === "error" && (
                <p className="text-center alert alert-danger alert-dismissible">
                  {" "}
                  Username or Password incorrect
                </p>
              )}
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};
// comment mapping function maps react to redux
const mapStateToProps = (state) => {
  // this map react props to redux state

  return {
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    email: state.loginReducer.email,
    firstName: state.loginReducer.firstName,
    lastName: state.loginReducer.lastName,
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginLoadingState: state.loginReducer.loginLoadingState,
    authenticated: state.loginReducer.authenticated,
  };
};

export default connect(mapStateToProps)(Login);
