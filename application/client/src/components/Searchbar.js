import React, { useState } from "react";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Input } from "reactstrap";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../context";
import { useHistory } from "react-router-dom";
import Title from "./Title";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  let history = useHistory();

  return (
    <ProductConsumer>
      {(value) => (
        <div class="input-group md-form form-sm form-1 pl-0">
          <div class="input-group-prepend">
            <span class="input-group-text purple lighten-3" id="basic-text1"><i class="fas fa-search text-white" aria-hidden="true"></i></span>
          </div>
          <input class="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search"></input>
        </div>
      )}
    </ProductConsumer>
  );
};


export default Searchbar;
