import React from 'react';
import { connect } from 'react-redux';
import{
    setUserName,
    setPassword,
    setEmail,
    signup
    // setIsSignedUp,
    // setLoadingState
} from '../redux/actions/signupAction';
import { Redirect } from 'react-router-dom';

const Signup = ({
    username,
    password,
    email,
    isSignedUp,
    loadingState,
    dispatch,
    }) => {


    if(isSignedUp === true){
        return <Redirect to="/" />;
    }

    // if (loadingState === 'loading') {
    //     return <h2>Loading...</h2>;
    // }

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
                {loadingState === 'error' && <b>userName is not valid, Enter new userName</b>}
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
        loadingState: state.signupReducer.loadingState,
        isSignedUp: state.signupReducer.isSignedUp,
    };
};

export default connect(mapStateToProps)(Signup)