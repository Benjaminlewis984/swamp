import React, { Component, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from "./Button";
import Home from './Home';
import logo from '../imgs/gator.png';
import Cookies from 'js-cookie';

const authenticate = () => {
    return Cookies.get("isLoggedIn");
}

const logout = () => {
    console.log("Removing Cookies");
    Cookies.remove('isLoggedIn');
    Cookies.remove('username');
    
    window.location.reload(false)
    return (
        <Redirect to="/"></Redirect>
    )
}


export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm 
            navbar-dark px-sm-5">
                <Link to="/">
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/result" className="nav-link">
                            Browse
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                </ul>
                <Link to="/cart" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-cart-plus"></i>
                        </span>
                        cart
                    </ButtonContainer>
                </Link>

                {!authenticate() && (
                    <Link to="/login">
                        <ButtonContainer>
                            <span className="mr-2">
                                <i className="fas fa-sign-in-alt"></i>
                            </span>
                        login
                    </ButtonContainer>
                    </Link>)}
                {!authenticate() && (
                    <Link to="/signup">
                        <ButtonContainer>
                            <span className="mr-2">
                                <i className="fas fa-user-plus"></i>
                            </span>
                        sign up
                    </ButtonContainer>
                    </Link>)}
                {authenticate() && (
                    <Link to="/dashboard">
                        <ButtonContainer>
                            <span className="mr-2">
                                <i className="fas fa-home"></i>
                            </span>
                    Dashboard
                </ButtonContainer>
                    </Link>
                )}
                {authenticate() && (
                    <Link to="/" >
                        <ButtonContainer onClick={logout}>
                            <span className="mr-2">
                                <i className="fas fa-sign-out-alt"></i>
                            </span>
                    Logout
                </ButtonContainer>
                    </Link>
                )}


            </NavWrapper>
        )
    }
}
const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }
`