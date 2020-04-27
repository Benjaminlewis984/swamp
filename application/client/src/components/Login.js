import React from 'react';
import { connect } from 'react-redux';
import {
  setUserName,
  setPassword,
  // setIsLoggedIn,
  // setLoadingState,
  login
} from '../redux/actions/loginAction';
// import {Redirect} from 'react-router-dom';

const Login = ({ username,
  password,
  isLoggedIn,
  loginLoadingState,
  dispatch,
}) => {
  if(isLoggedIn){
    return  <div>
              <p>Welcome {username}!!!</p>
              <p>You are Loggen in</p>
            </div> 
  }
  return (
    <div>
      <h2>Login</h2>
      <div>
        username:
        <input 
        value={username}
        onChange={e=> dispatch(setUserName(e.target.value))}
        />
      </div>
      <div>
        Password:
        <input
        type="password" 
        value={password}
        onChange={e=> dispatch(setPassword(e.target.value))}
        />
      </div>
      <div>
        {loginLoadingState === 'error' && <b> Username or Password incorrect</b>}
        <button id="login" onClick={()=>dispatch(login())}>Log in</button>
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
