import React from 'react';
import { connect } from 'react-redux';
import {
    setUserName,
    setPassword,
    setEmail,
    setFirstName,
    setLastName,
    signUp,
} from '../redux/actions/signupAction';
import { ButtonContainerAlt } from "./ButtonAlt";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from 'react-router-dom';
import Disclaimer from './Disclaimer';

const Signup = ({
    username,
    password,
    email,
    firstname,
    lastname,
    isSignedUpLoadingState,
    dispatch,
}) => {
    let history = useHistory();

    const verify = (confirmPassword) => {
        if (password === confirmPassword) {
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

    if (isSignedUpLoadingState === 'good') {
        history.push("/result")
    }
    return (
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
                                    <input type="checkbox" required /> Terms and Conditions
                                </a>
                            </div>

                            <div class="row">
                                <div className="col-md-8">
                                    <ButtonContainerAlt id="signup"
                                        onClick={() => dispatch(signUp())
                                        }>Submit</ButtonContainerAlt>
                                    <ButtonContainerAlt onClick={() => {
                                        clearFields()
                                        history.push("/")
                                        }
                                    }>Cancel</ButtonContainerAlt>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            <Disclaimer />
        </div>

    );
};

const mapStateToProps = state => {
    return {
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