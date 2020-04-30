import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setUserName,
  setPassword,
  login
} from '../redux/actions/loginAction';
import { Redirect } from "react-router-dom";
import { ButtonContainer } from "./Button";
import { Dashboard } from './Dashboard';
import Cookies from 'js-cookie';

const Login = ({ 
  username,
  password,
  isLoggedIn,
  loginLoadingState,
  dispatch,
  //authenticated,
}) => {
  const [auth, setAuth] = React.useState(false);

  const readCookie = () => {    
    if(Cookies.get(username)){
      setAuth(true);
    }
  }
  React.useEffect(() => {
    readCookie();
  },[])

  if (isLoggedIn) {
    return <div>
      {/* <p>Welcome {username}!!!</p> */}
      <Redirect path='/'></Redirect>
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
              <ButtonContainer id="login" 
              onClick={()=>dispatch(login())
                // ,()=>{loginRefresh()}
                
              }
              
              >Log In</ButtonContainer>
              <p className="text-center"> 
                <a href='signup'>
                  Don’t have account? 
                </a>
              </p>
              {loginLoadingState === 'error' && <p className="text-center alert alert-danger alert-dismissible" > Username or Password incorrect</p>}
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
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginLoadingState: state.loginReducer.loginLoadingState,
    authenticated: state.loginReducer.authenticated,
  };
};

export default connect(mapStateToProps)(Login);
