import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css'

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
    <div className="container">
      <div className="row">
      <div className="col-10 mx-auto text-center text-title 
      pt-5"> search
      </div>
      </div>
    </div>
  );
};

export default Home;