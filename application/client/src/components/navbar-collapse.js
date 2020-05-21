import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import logo from "../imgs/gator.png";
import axios from "axios";
import { ProductConsumer } from "../context";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbarcollapse = () => {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [navSearch, setNavSearch] = useState(true);
    const [isAuth, setIsAuth] = useState("unchecked");

    let history = useHistory();
    let location = useLocation();

    const checkAuth = (action) => {
        axios.defaults.withCredentials = true;
        axios.get(`/auth`).then((res) => {
            if (res.data.success == "true") {
                action(true);
            }
            else {
                action(false);
            }
        });
    };

    const logout = () => {
        axios.defaults.withCredentials = true;
        axios.get(`/logout`);

        return <Link to="/"></Link>;
    };

    // Function for conditional display of the search bar
    const showBar = () => {
        console.log("PATHNAME: " + location.pathname)
        if (location.pathname === "/") { setNavSearch(true); }
    }

    checkAuth((value) => {
        setIsAuth(value);
    })

    var staticElements = (
        <NavWrapper>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">
                    <img src={logo} alt="store" />
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/result">Browse <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/about">About</a>
                        </li>
                
                        <li class="nav-item">
                            <a class="nav-link" href="/cart">
                                <i className="fas fa-cart-plus"></i>
                                Cart
                            </a>
                        </li>
                        {isAuth != "unchecked" && !isAuth && (
                            <li class="nav-item">
                                <a class="nav-link" href="/login">
                                    <i className="fas fa-sign-in-alt"></i>
                                    Login
                                </a>
                            </li>
                        )}

                        {isAuth != "unchecked" && !isAuth && (
                            <li class="nav-item">

                                <a class="nav-link" href="/signup">
                                    <i className="fas fa-user-plus"></i>
                                        sign up

                                </a>
                            </li>
                        )}

                        {isAuth != "unchecked" && isAuth && (
                            <li class="nav-item">

                                <a class="nav-link" href="/dashboard">
                                    <i className="fas fa-home"></i>
                                                          Dashboard

                                                  </a>
                            </li>
                        )}

                        {isAuth != "unchecked" && isAuth && (
                         <li class="nav-item">

                         <a class="nav-link" href="/" onClick={logout}>
                             <i className="fas fa-sign-out-alt"></i>
                                 Logout

                         </a>
                     </li>
                        )}
                    </ul>


                </div>

                        {/* Search bar */}
                        {navSearch ?
                            <ProductConsumer className="flex-shrink-1 align-content-center">
                                {(value) => (
                                    <SearchBar className="container justify-content-center">
                                        <div className="input-group mb-2">
                                            {/* <DropDown className="input-group-prepend"> */}
                                            <select
                                                id="category"
                                                onChange={(e) => setCategory(e.target.value)}>
                                                <option value="all" selected>All</option>
                                                <option value="document">Documents</option>
                                                <option value="image">Images</option>
                                                <option value="audio">Audio</option>
                                                <option value="video">Video</option>
                                            </select>
                                            {/* </DropDown> */}

                                            <input
                                                id="userInput"
                                                class="form-control"
                                                type="text"
                                                aria-label="Text input with dropdown button"
                                                placeholder="Search by title.."
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                            ></input>

                                            <button
                                                className="btn btn-dark"
                                                onClick={() => {
                                                    value.setProducts(category, query);
                                                    history.push("/result");
                                                }}
                                            >
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </SearchBar>
                                )}
                            </ProductConsumer>
                            : null}
                        {/* Search bar end */}

            </nav>
        </NavWrapper>
    )

    return (staticElements);
};


export default Navbarcollapse;

const SearchBar = styled.nav`
width: 40rem;
`;

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;