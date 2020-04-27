import React from 'react';
import { connect } from 'react-redux';
import{
    setUserName,
    setPassword,
    setEmail,
    setFirstName,
    setLastName,
    signup,
} from '../redux/actions/signupAction';
import { Redirect } from 'react-router-dom';

const Signup = ({
    username,
    password,
    email,
    firstname,
    lastname,
    isSignedUp,
    isSignedUpLoadingState,
    dispatch,
    }) => {

    if(isSignedUp === true){
        return <Redirect to="/" />;
    }

    return(
        <div>
            <h2>SIGN UP</h2>
            
            <div>
                username:
                <input
                    value={username}
                    onChange={e => dispatch(setUserName(e.target.value))}
                />
            </div>
            <div>
                password:
                <input
                    value={password}
                    onChange={e => dispatch(setPassword(e.target.value))}
                />
            </div>
            <div>
                email:
                <input
                    value={email}
                    onChange={e => dispatch(setEmail(e.target.value))}
                />
            </div>
            <div>
                First Name:
                <input
                    value={firstname}
                    onChange={e => dispatch(setFirstName(e.target.value))}
                />
            </div>
            <div>
                Last Name:
                <input
                    value={lastname}
                    onChange={e => dispatch(setLastName(e.target.value))}
                />
            </div>
            <div>
                {isSignedUpLoadingState === 'error' && <b>userName is not valid, Enter new userName</b>}
                <button id="signup" onClick={()=> dispatch(signup())}>Sign Up</button>
            </div>
        </div>

    );
};

const mapStateToProps = state => {
    return{
        username: state.signupReducer.username,
        password: state.signupReducer.password,
        email: state.signupReducer.email,
        firstname: state.signupReducer.firstname,
        lastname: state.signupReducer.lastname,
        isSignedUpLoadingState: state.signupReducer.isSignedUpLoadingState,
        isSignedUp: state.signupReducer.isSignedUp,
    };
};

export default connect(mapStateToProps)(Signup)