import React from 'react';
// import { Auth } from "aws-amplify";
import ValidatedLoginForm from './ValidatedLoginForm';

const Login = () => {

    // async function handleSubmit(event) {
    //     event.preventDefault();
      
    //     try {
    //       await Auth.signIn(email, password);
    //       alert("Logged in");
    //     } catch (e) {
    //       alert(e.message);
    //     }
    //   }

    return (
        <ValidatedLoginForm />
    );
};

export default Login;