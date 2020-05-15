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
// import { Redirect } from 'react-router-dom';
import { ButtonContainer } from "./Button";
import { Redirect } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Form } from "reactstrap";

const Signup = ({
    username,
    password,
    email,
    firstname,
    lastname,
    //isSignedUp,
    isSignedUpLoadingState,
    dispatch,
    }) => {

    const verify = (confirmPassword) => {
        if(password === confirmPassword) {
            console.log("Valid");
        } else {
            console.log("DOESN'T MATCH");
        }
    }

    const clearFields = () => {
        dispatch(setUserName(''));
        dispatch(setPassword(''));
        dispatch(setEmail(''));
        dispatch(setFirstName(''));
        dispatch(setLastName(''));

        document.getElementById('signup-form').value = '';
    }

    if(isSignedUpLoadingState === 'good'){
        return  <div> 
                    Welcome {username}. You have been registered
                    <Redirect path='/login'></Redirect>
                </div>
    }
    return(
        <div class="container-fluid bg-light py-3">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <div class="card card-body">
                        <h3 class="text-center mb-4">Sign-Up</h3>
                        <fieldset id="signup-form">
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
                            <div class="form-group has-success">
                                <input class="form-control input-lg" 
                                placeholder="Confirm Password" 
                                name="password" type="password"
                                onChange={e => verify(e.target.value)}>
                                </input>
                            </div>
                            <div class="form-group has-success">
                                <input class="form-control input-lg" 
                                placeholder="SFSU e-mail address" 
                                name="email" 
                                type="text"
                                value={email}
                                onChange={e => dispatch(setEmail(e.target.value))}>
                                </input>
                            </div>
                            <div class="form-group has-success">
                                <input class="form-control input-lg" 
                                placeholder="First Name" 
                                name="firstname" 
                                type="text"
                                value={firstname}
                                onChange={e => dispatch(setFirstName(e.target.value))}>
                                </input>
                            </div>
                            <div class="form-group has-success">
                                <input class="form-control input-lg" 
                                placeholder="Last Name" 
                                name="lasttname" 
                                type="text"
                                value={lastname}
                                onChange={e => dispatch(setLastName(e.target.value))}>
                                </input>
                            </div>
                            
                            <div>
                                <a href="#">
                                    <input type="checkbox" required /> Terms and Condition
                                </a>
                            </div> 

                            <div class="row">
                                <div>                     
                                    <ButtonContainer onClick={() => clearFields()}>Cancel</ButtonContainer>
                                    <ButtonContainer id="signup" 
                                    onClick={()=> dispatch(signup())
                                    }
                                    >Submit</ButtonContainer>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
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