import React, { useState } from 'react';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert } from 'reactstrap';
import axios from 'axios';

const Browse = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  const searchByTitle = () => {
    console.log('Button click')

    axios.post('http://localhost:3001/browse', {
      category: 'all',
      search: query,
    }).then((res) => {
        console.log('TEST');
        setResult(res.data.results);
        setQuery('');
    }).catch(err => console.log(err));
  }

  return (
    <div>
      <h1>Browse</h1>
      <Input type='text' value={query} onChange={e=>setQuery(e.target.value)} placeholder='Search by title..' />
      <button onClick={searchByTitle}>Search</button>
      <h2>{result[0]}</h2>
    </div>
  );
};

export default Browse;