import React, { Component, ReactPropTypes, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import logo from "../imgs/gator.png";
import Cookies from "js-cookie";
import axios from "axios";
import { ProductConsumer } from "../context";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const checkAuth = (action) => {
  axios.defaults.withCredentials = true;
  axios.get(`http://18.191.184.143:3001/auth`).then((res) => {
    if (res.data.success == "true") {
      action(true);
    }
    else {
      action(false);
    }
  });
};

const logout = () => {
  Cookies.remove("isLoggedIn");
  Cookies.remove("user");

  axios.defaults.withCredentials = true;
  axios.get(`http://18.191.184.143:3001/logout`);
  
  return <Link to="/"></Link>;
};

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [navSearch, setNavSearch] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  let history = useHistory();
  let location = useLocation();

  // Function for conditional display of the search bar
  const showBar = () => {
    console.log("PATHNAME: " + location.pathname)
    if(location.pathname === "/") { setNavSearch(true); }
  }

  checkAuth((value) => {
    setIsAuth(value);
  })

  var staticElements = (
    <NavWrapper
      className="navbar navbar-expand-sm 
            navbar-dark px-sm-5">
      <Link to="/">
        <img src={logo} alt="store" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav align-items-center mr-auto">
        <li className="nav-item ml-5">
          <Link to="/result" className="nav-link">
            Browse
          </Link>
        </li>
        <li className="nav-item ml-2">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>

      {/* Search bar */}
        { navSearch ? 
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
        : null }
      {/* Search bar end */}

      <Link to="/cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <i className="fas fa-cart-plus"></i>
          </span>
          cart
        </ButtonContainer>
      </Link>

      {!isAuth && (
        <Link to="/login">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-sign-in-alt"></i>
            </span>
            login
          </ButtonContainer>
        </Link>
      )}
      {!isAuth && (
        <Link to="/signup">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-user-plus"></i>
            </span>
            sign up
          </ButtonContainer>
        </Link>
      )}
      {isAuth && (
        <Link to="/dashboard">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-home"></i>
            </span>
            Dashboard
          </ButtonContainer>
        </Link>
      )}
      {isAuth && (
        <Link to="/">
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

  return (
    staticElements
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchReducer.searchResults,
  };
};

export default connect(mapStateToProps)(Navbar);

// CSS Classes
const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

const SearchBar = styled.nav`
width: 40rem;
`;