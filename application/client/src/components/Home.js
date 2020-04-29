import React, { useState } from "react";
import axios from "axios";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "reactstrap";
// import { setSearchResults } from '../redux/actions/searchActions';
import { connect } from "react-redux";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../context";
import { useHistory } from "react-router-dom";
import Title from "./Title";

const Home = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  let history = useHistory();

  return (
    <ProductConsumer>
      {(value) => (
        <div className="container">
          <Title name="swamp." />

          <div className="row text-center col-10 mx-auto my-2 justify-content-center">
            <h3>A media marketplace for gators, by gators.</h3>
          </div>

          <div className="row"> </div>

          <div className="input-group">
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
              }}
            >
              Search
            </ButtonContainer>
          </div>
        </div>
      )}
    </ProductConsumer>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchReducer.searchResults,
  };
};

export default connect(mapStateToProps)(Home);
