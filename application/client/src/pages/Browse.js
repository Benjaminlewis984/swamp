import React, { useState } from 'react';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert, Table } from 'reactstrap';
import axios from 'axios';

const Browse = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [showTable, setShowTable] = useState(false)

  const searchByTitle = () => {
    console.log('Button click')

    axios.post('http://localhost:3001/browse', {
      category: 'all',
      search: query,
    }).then((res) => {
      console.log('TEST');
      setResult(res.data.results);
      setQuery('');
      toggle();
    }).catch(err => console.log(err));
  }

  const toggle = () => {
    var element = document.getElementById('results');
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
  return (
    <div>
      <h1>Browse</h1>
      <Input type='text' value={query} onChange={e => setQuery(e.target.value)} placeholder='Search by title..' />
      <button onClick={searchByTitle}>Search</button>
      <Table id='results' display = 'none'>
        {() => {
          if (showTable) {
            result.map(items =>
              <tr>
                <td>{items.title}</td>
                <td>{items.description}</td>
                <td>{items.category}</td>
                <td> <img src={`http://localhost:3001/${items.preview_path}`}></img></td>
              </tr>)
          }
        }}
      </Table>




    </div>
  );
};

export default Browse;