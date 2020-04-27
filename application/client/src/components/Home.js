import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert, Table } from 'reactstrap';
// import Search from "./Search";
import { setSearchResults } from '../redux/actions/searchActions';
import {connect } from 'react-redux';

const Home = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [dropDown, setDropDown] = useState([]);

  const searchAll = () => {
    console.log('search all');
  }

  const getValue = (val) => {
    var e = document.getElementById("category");
    console.log(e.selectedIndex);
    var result = e;
    console.log(result);
  }

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
          <button type="button" class="btn btn-default dropdown-toggle" onChange={e => getValue(e)}>
            <span id="search_concept"> Filter </span>
            <span class="caret"></span>
            <select id="category">
            <option value="all" selected>All</option>
            <option value="document">Documents</option>
            <option value="image">Images</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
            </select>

          
          </button>

          <Input type='text' value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder='Search by title..' />

          <button onClick={dropDown}>Search</button>
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
                  <img src={`http://18.191.184.143:3001/${items.preview_path}`} alt="product" style={{width:'5rem', height: '5rem'}}>
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