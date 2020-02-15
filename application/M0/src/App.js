import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Dang from './pages/Dang';
import William from './pages/William';
import Joe from './pages/Joe';
import Kevin from './pages/Kevin';
import Ben from './pages/Ben';
import Onu from './pages/Onu';

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
          </div>
          <div>
            <Link to="/william">William</Link>
          </div>
          <div>
            <Link to="/Joe">Weerachai</Link>
          </div>
          <div>
            <Link to="/Kevin">Kevin</Link>
          </div>
          <div>
            <Link to="/ben">Ben</Link>
          </div>
          <div>
            <Link to="/onu">Onu</Link>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dang" component={Dang} />
          <Route exact path="/william" component={William} />
          <Route exact path="/Joe" component={Joe} />
          <Route exact path="/Kevin" component={Kevin} />
          <Route exact path="/ben" component={Ben} />
          <Route exact path="/onu" component={Onu} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
