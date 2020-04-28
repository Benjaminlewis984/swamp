import React from 'react';
import { connect } from 'react-redux';
import {
  setUserName,
  setPassword,
  login
} from '../redux/actions/loginAction';
import { ButtonContainer } from "./Button";

const Login = ({ username,
  password,
  isLoggedIn,
  loginLoadingState,
  dispatch,
}) => {
  if (isLoggedIn) {
    return <div>
      <p>Welcome {username}!!!</p>
      <p>You are Logged in</p>
    </div>
  }
  return (
    <div class="container-fluid bg-light py-3">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card card-body">
            <h3 class="text-center mb-4">Login</h3>
            <fieldset>
              <div class="form-group has-success">
                <input class="form-control input-lg"
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={e => dispatch(setUserName(e.target.value))}>
                </input>
              </div>
              <div class="form-group has-success">
                <input class="form-control input-lg"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={e => dispatch(setPassword(e.target.value))}>
                </input>
              </div>
              <ButtonContainer id="login" onClick={()=> dispatch(login())}>Log In</ButtonContainer>
              {loginLoadingState === 'error' && <b> Username or Password incorrect</b>}
            </fieldset>
          </div>
        </div>
      </div>
    </div>

  );
};
// comment mapping function maps react to redux
const mapStateToProps = state => {
  // this map react props to redux state
  return {
    userName: state.loginReducer.username,
    password: state.loginReducer.password,
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginLoadingState: state.loginReducer.loginLoadingState,
  };
};

export default connect(mapStateToProps)(Login);
