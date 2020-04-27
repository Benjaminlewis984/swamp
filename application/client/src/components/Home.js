import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert, Table } from 'reactstrap';
import { setSearchResults } from '../redux/actions/searchActions';
import {connect } from 'react-redux';
import { ButtonContainer } from "./Button";

const Home = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [saveSelectedDropDown, setSaveSelectedDropDown] = useState('all');

  const getValue = (val) => {
    var e = document.getElementById("category");
    console.log(e.selectedIndex);
    console.log(e.options[e.selectedIndex].value);
    setSaveSelectedDropDown(e.options[e.selectedIndex].value);
  }

  const searchByTitle = () => {
    console.log('Button click')

    axios.post(`http://18.191.184.143:3001/browse`,   {
        "query": {
          "category": saveSelectedDropDown,
          "search": query
        }    
    })
    .then((res) => {
      console.log('TEST');
      console.log(res.data.results);
      setResult(res.data.results);
      let element = document.getElementById('results');
      element.style.display = "block";
    }).catch(err => console.log(err));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mx-auto text-center text-title pt-5"> swamp </div>
      </div>
      <div className="input-group">
            <select id="category" onChange={e => getValue(e)}>
            <option value="all" selected>All</option>
            <option value="document">Documents</option>
            <option value="image">Images</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            </select>

          <Input type='text' value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder='Search by title..' />

          <ButtonContainer onClick={searchByTitle}>Search</ButtonContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchReducer.searchResults,
  };
};


export default connect(mapStateToProps)(Home);