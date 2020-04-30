import React, { Component, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from "./Button";
import logo from '../imgs/gator.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ProductConsumer } from "../context";
import { useHistory } from "react-router-dom";
import { Input } from "reactstrap";
import { connect } from "react-redux";

const authenticate = () => {
    return Cookies.get("isLoggedIn");
}

const logout = () => {
    console.log("Removing Cookies");
    Cookies.remove('isLoggedIn');
    Cookies.remove('user');
    axios.get(`http://18.191.184.143:3001/logout`)
        .then((res) => {
            console.log(res);
            console.log(res.data.success);
        })

    window.location.reload(false)
    return (
        <Redirect to="/"></Redirect>
    )
}

const Navbar = () => {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    let history = useHistory();

    return (
        <NavWrapper className="navbar navbar-expand-sm 
            navbar-dark px-sm-5">
            <Link to="/result">
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


            <ProductConsumer className="flex-shrink-1 align-content-center">
                {(value) => (


                    <div className="input-group mb-2">
                        <select id="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="all" selected>
                                All
              </option>
                            <option value="document">Documents</option>
                            <option value="image">Images</option>
                            <option value="audio">Audio</option>
                            <option value="video">Video</option>
                        </select>

                        <Input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by title.."
                        />

                        <ButtonContainer
                            onClick={() => {
                                value.setProducts(category, query);
                                history.push("/result");
                            }}>
                            Search
            </ButtonContainer>
                    </div>

                )}
            </ProductConsumer>



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

const mapStateToProps = (state) => {
    return {
        searchResults: state.searchReducer.searchResults,
    };
};

export default connect(mapStateToProps)(Navbar);



const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }
`