import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import logo from "../imgs/gator.png";
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
  const [isAuth, setIsAuth] = useState("unchecked");

  let history = useHistory();
  let location = useLocation();

  const logout = () => {
    axios.defaults.withCredentials = true;
    axios.get(`/logout`);
    
    return <Link to="/"></Link>;
  };

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

      {isAuth != "unchecked" && !isAuth && (
        <Link to="/login">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-sign-in-alt"></i>
            </span>
            login
          </ButtonContainer>
        </Link>
      )}
      {isAuth != "unchecked" && !isAuth && (
        <Link to="/signup">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-user-plus"></i>
            </span>
            sign up
          </ButtonContainer>
        </Link>
      )}
      {isAuth != "unchecked" && isAuth && (
        <Link to="/dashboard">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-home"></i>
            </span>
            Dashboard
          </ButtonContainer>
        </Link>
      )}
      {isAuth != "unchecked" && isAuth && (
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
  background: var(--mainYellow);
  .nav-link {
    color: var(--mainPurple) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
`;

const SearchBar = styled.nav`
width: 40rem;
`;