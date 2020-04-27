import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert, Table } from 'reactstrap';
import Search from "./Search";
import { setSearchResults } from '../redux/actions/searchActions';
import {connect } from 'react-redux';

const Home = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  const searchByTitle = () => {
    console.log('Button click')

    axios.post(`http://18.191.184.143:3001/browse`,  {
        "query": {
          "category": "all",
          "search": ""
        }    
    // axios.get(`http://18.191.184.143:3001/browse?title=${query}`,  {
      //category: 'all',
      // search: query,
      // searchResults: result, 
    })
    .then((res) => {
      console.log('TEST');
      console.log(res.data.results);
      setResult(res.data.results);
      // setQuery('');

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
        <div className="input-group-btn search-panel">
          <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span id="search_concept"> Filter </span>
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#All">All</a></li>
            <li><a href="#Documents">Documents</a></li>
            <li><a href="#Images">Images</a></li>
            <li><a href="#Music">Music</a></li>
            <li><a href="#Video">Video</a></li>
          </ul>

          <Input type='text' value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder='Search by title..' />

          <button onClick={searchByTitle}>Search</button>
          <table id='results' display="none">
            <tr className='table-head'>
              <td>Title</td>
              <td>Description</td>
              <td>Category</td>
              <td>Preview</td>
            </tr>
            {result.map(items =>
              <tr>
                <td>{items.title}</td>
                <td>{items.description}</td>
                <td>{items.category}</td>
                <td> 
                  <img src={`http://18.191.184.143:3001/${items.preview_path}`}>
                </img>
                </td>
              </tr>)}
          </table>
        </div>
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