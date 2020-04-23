import React, { useState } from 'react';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert, Table } from 'reactstrap';
import axios from 'axios';
import '../styles/Browse.css';

const [result, setResult] = useState([]);
const [query, setQuery] = useState('');

const searchByTitle = () => {
  console.log('Button click')
  
  axios.post('http://18.191.184.143:3001/browse', {
    // axios.get(`http://18.191.184.143:3001/browse?titleSearch=${query}`, {
    category: 'all',
    search: query,
  }).then((res) => {
    console.log('TEST');
    setResult(res.data.results);
    console.log(result);
    setQuery('');
    
    let element = document.getElementById('results');
    element.style.display = "block";
  }).catch(err => console.log(err));
}

const Home = () => {
  return (
    <div>
      <h1>swamp.</h1>
      {result}
      <Input type='text' value={query} onChange={e => setQuery(e.target.value)} placeholder='Search by title..' />
      <button onClick={searchByTitle}>Search</button>
      <Table id='results' display="none">
        <th class='results th'>
          <td>Title</td>
          <td>Description</td>
          <td>Category</td>
          <td>Preview</td>
        </th>
            {result.map(items =>
              <tr>
                <td>{items.title}</td>
                <td>{items.description}</td>
                <td>{items.category}</td>
                <td> <img src={`http://18.191.184.143:3001/${items.preview_path}`}></img></td>
              </tr>)}
      </Table>
    </div>
  );
};

export default Home;