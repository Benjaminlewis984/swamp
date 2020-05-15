import React, { useState } from "react";
import styled from 'styled-components';
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { ProductConsumer } from "../context";
import { useHistory } from "react-router-dom";
import Title from "./Title";
import Disclaimer from './Disclaimer';
import logo from "../imgs/SWAMP.png";

const Home = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  let history = useHistory();

  return (
    <div>
    <ProductConsumer>
      {(value) => (
        <HomeWrapper className="container">
          <div class="mx-auto rounded text-center pt-0">

          <img src={logo} alt="store" className="navbar-brand row col-10 mx-auto justify-content-center"/>
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

const homeSearch = () => {
  // return (
  //    <div className="container justify-content-center ml-auto">
  //           <form>
  //             <div className="input-group">
  //               <div className="input-group-prepend">
  //                 <select
  //                   id="category-field"
  //                   class="form-control dropdown toggle"
  //                   data-toggle="dropdown"
  //                   aria-hashpopup="true"
  //                   aria-expanded="false"
  //                   onChange={(e) => setCategory(e.target.value)}>
  //                     <option value="all">All</option>
  //                     <option value="document">Documents</option>
  //                     <option value="image">Images</option>
  //                     <option value="audio">Audio</option>
  //                     <option value="video">Video</option>
  //                 </select>
  //               </div>

  //               <input
  //                 id="userInput"
  //                 class="form-control"
  //                 type="text"
  //                 aria-label="Text input with dropdown button"
  //                 placeholder="Search by title.."
  //                 value={query}
  //                 onChange={(e) => setQuery(e.target.value)}
  //               ></input>

  //               <button
  //                 className="btn btn-dark"
  //                 onClick={() => {
  //                   value.setProducts(category, query);
  //                   history.push("/result"); }}>
  //                 <i class="fas fa-search"></i>
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  // )
}

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