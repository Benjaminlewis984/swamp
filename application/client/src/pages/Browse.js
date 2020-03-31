import React, { useState } from 'react';
import { Container, Row, Col, Label, Form, FormGroup, Input, Alert } from 'reactstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Browse = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  function searchTitle(e) {
        axios.post('http://0.0.0.0:3001/browse', {
            
        }).then((res) => {
            setResult(res.data)
        }).catch(err => console.log(err));
    }

  return (
    <div>
      <h1>Browse</h1>
      <Input type='text' value={query} onChange={e=>setQuery(e.target.value)} placeholder='Item Title' />
      <Button onClick={searchTitle} block>Search</Button>
    </div>
  );
};

export default Browse;