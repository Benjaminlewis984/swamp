import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { ProductConsumer } from "../context";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import Disclaimer from './Disclaimer';
import logo from "../imgs/SWAMP.png";
import ReactGA from 'react-ga';

const Home = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  let history = useHistory();

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  })

  return (
    <div>
      <ProductConsumer>
        {(value) => (
          <HomeWrapper className="container">
            <div class="mx-auto rounded text-center pt-0">

              <img src={logo} alt="store" className="navbar-brand row col-10 mx-auto justify-content-center" />
            </div>
            <div className="row col-10 mx-auto my-2 justify-content-center">
              <h3>A media marketplace for gators, by gators.</h3>
            </div>
          </HomeWrapper>
        )}
      </ProductConsumer>
      <Disclaimer />
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchReducer.searchResults,
  };
};

export default connect(mapStateToProps)(Home);

const HomeWrapper = styled.nav`
padding-top: 10rem;

-webkit-user-select: none;     
-moz-user-select: none;
-ms-user-select: none;
user-select: none;

`