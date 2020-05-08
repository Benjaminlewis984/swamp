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
import {
  setUserName,
  setPassword,
  setEmail,
  setFirstName,
  setLastName,
  setIsLoggedIn
} from '../redux/actions/loginAction';


const authenticate = () => {
  return Cookies.get("isLoggedIn");
};

const checkAuth = async () => {
  const data = await axios.get(`http://0.0.0.0:3001/auth`);
  return data;
};


const Navbar = ({ 
  username,
  password,
  firstName,
  lastName,
  email,
  isLoggedIn,
  loginLoadingState,
  dispatch,
  //authenticated,
}) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [navSearch, setNavSearch] = useState(true);
  let history = useHistory();
  let location = useLocation();

  const logout = () => {
    axios.defaults.withCredentials = true;
    console.log("Removing Cookies");
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");
    axios.get(`http://18.191.184.143:3001/logout`).then((res) => {
      console.log(res);
      console.log(res.data.success);
      dispatch(setIsLoggedIn(false));
      dispatch(setUserName(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setFirstName(""));
      dispatch(setLastName(""));
      
    });
    
    return <Link to="/"></Link>;
  };

  // Function for conditional display of the search bar
  const showBar = () => {
    console.log("PATHNAME: " + location.pathname)
    if(location.pathname === "/") { setNavSearch(true); }
  }

  // checkAuth()
  // .then((response) => {
  //   console.log(response);
  // });

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

      {!authenticate() && (
        <Link to="/login">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-sign-in-alt"></i>
            </span>
            login
          </ButtonContainer>
        </Link>
      )}
      {!authenticate() && (
        <Link to="/signup">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-user-plus"></i>
            </span>
            sign up
          </ButtonContainer>
        </Link>
      )}
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
    username: state.loginReducer.username,
    password: state.loginReducer.password,
    email: state.loginReducer.email,
    firstName: state.loginReducer.firstName,
    lastName: state.loginReducer.lastName,
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginLoadingState: state.loginReducer.loginLoadingState,
    authenticated: state.loginReducer.authenticated,
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