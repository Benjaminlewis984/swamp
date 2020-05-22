import React from 'react';
import { connect } from 'react-redux';
//import { setUser, setLoadingState } from '../redux/actions/userAction';
import {
  setUser,
  setPassword,
  setIsLoggedIn,
  setLoadingState,
} from '../redux/actions/userAction';
import {Redirect} from 'react-router-dom';

const Login = ({ 
  user,
  password,
  isLoggedIn,
  loadingState,
  dispatch,
}) => {
  const login = () => {
    dispatch(setLoadingState('loading'));
    setTimeout(() => {
      if(user === 'joe' && password ==='123'){
      // fake doing something on server
      dispatch(setIsLoggedIn(true));
      dispatch(setLoadingState('init'));
      } else{
        dispatch(setLoadingState('error'));
      }
    },2000)
  };
  if(isLoggedIn){
    return <Redirect to="/" />;
  }
  if(loadingState === 'loading'){
    return <h2> Loading ...</h2>
  }
  //const [user, setUser] = React.useState('');
  return (
    <div>
      <h2>Login</h2>
      <div>
        User:
        <input 
        value={user}
        onChange={e=> dispatch(setUser(e.target.value))}
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
        {loadingState === 'error' && <b> Username or Password incorrect</b>}
        <button onClick={login}>Log in</button>
      </div>
    </div>
  );
};
// comment mapping function maps react to redux
const mapStateToProps = state => {
  // this map react props to redux state
  return {
    user: state.userReducer.user,
    password: state.userReducer.password,
    isLoggedIn: state.userReducer.isLoggedIn,
    loadingState: state.userReducer.loadingState,
  };
};

export default connect(mapStateToProps)(Login);
