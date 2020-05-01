import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import logo from "../imgs/gator.png";

export default class Navbar extends Component {
render() {
    return (
    <NavWrapper
        className="navbar navbar-expand-sm 
        anavbar-dark px-sm-5"
    >
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
                <Link to="/about" className="nav-link">
                    About
                </Link>
            </li>
        </ul>

        <SearchBar className="container justify-content-center ml-auto">
        <form>
            <div className="input-group">
            <DropDown className="input-group-prepend">
                <select
                id="category-field"
                class="form-control dropdown toggle"
                data-toggle="dropdown"
                aria-hashpopup="true"
                aria-expanded="false"
                >
                <option value="">All</option>
                <option value="document">Documents</option>
                <option value="image">Images</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                </select>
            </DropDown>

            <input
                id="userInput"
                class="form-control text-white mh-100"
                type="text"
                aria-label="Text input with dropdown button"
                placeholder="Search by title.."
            ></input>

            <button className="btn btn-dark">
                <i class="fas fa-search"></i>
            </button>
            </div>
        </form>
        </SearchBar>

        <Link to="/cart" className="ml-auto">
        <ButtonContainer>
            <span className="mr-2">
            <i className="fas fa-cart-plus"></i>
            </span>
            {/* cart */}
        </ButtonContainer>
        </Link>

        <Link to="/login">
        <ButtonContainer>
            <span className="mr-2">
            <i className="fas fa-sign-in-alt"></i>
            </span>
            {/* login */}
        </ButtonContainer>
        </Link>
        
        <Link to="/signup">
        <ButtonContainer>
            <span className="mr-2">
            <i className="fas fa-user-plus"></i>
            </span>
            {/* sign up */}
        </ButtonContainer>
        </Link>
    </NavWrapper>
    );
}
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
}
`;

const SearchBar = styled.nav`
padding-right: 3.5rem;
`;

const DropDown = styled.nav`
width: 7rem;
`;
