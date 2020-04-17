import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Team from './pages/Team';
import Dang from './pages/About/Dang';
import William from './pages/About/William';
import Joe from './pages/About/Joe';
import Kevin from './pages/About/Kevin';
import Ben from './pages/About/Ben';
import Onu from './pages/About/Onu';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={Team} />
          <Route exact path="/dang" component={Dang} />
          <Route exact path="/will" component={William} />
          <Route exact path="/joe" component={Joe} />
          <Route exact path="/kevin" component={Kevin} />
          <Route exact path="/ben" component={Ben} />
          <Route exact path="/onu" component={Onu} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
