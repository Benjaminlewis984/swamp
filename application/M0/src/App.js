import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Dang from './pages/Dang';
import William from './pages/William';
// import Ben from './pages/Ben';
// etc..

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav-bar">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/dang">Dang</Link>
            <Link to="/william">William</Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dang" component={Dang} />
          <Route exact path="/william" component={William} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;