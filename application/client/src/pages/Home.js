import React, { useState } from 'react';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert, Table } from 'reactstrap';
import axios from 'axios';
import '../styles/Browse.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [showTable, setShowTable] = useState(false)

  const searchByTitle = () => {
    console.log('Button click')

    axios.post('http://18.191.184.143:3001/browse', {
      category: 'all',
      search: query,
    }).then((res) => {
      console.log('TEST');
      setResult(res.data.results);
      setQuery('');
      
      let element = document.getElementById('results');
      element.style.display = "block";
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h1>swamp.</h1>
      <Input type='text' value={query} onChange={e => setQuery(e.target.value)} placeholder='Search by title..' />
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
            <td> <img src={`http://localhost:3001/${items.preview_path}`}></img></td>
          </tr>)}
      </table>
    </div>
  );
};

export default Home;