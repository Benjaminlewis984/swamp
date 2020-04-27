import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from "./Button";
import logo from '../imgs/gator.png';


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
                            Marketplace
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
                
                <Link to="/login">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-sign-in-alt"></i>
                        </span>
                        login
                    </ButtonContainer>
                </Link>
                <Link to="/signup">
                    <ButtonContainer>
                        <span className="mr-2">
                            <i className="fas fa-user-plus"></i>
                        </span>
                        sign up
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        )
    }
}
const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainYellow) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }
`