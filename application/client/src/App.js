import React from 'react';
import './App.css';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Team from './pages/Team';
import Dang from './pages/Dang';
import William from './pages/William';
import Joe from './pages/Joe';
import Kevin from './pages/Kevin';
import Ben from './pages/Ben';
import Onu from './pages/Onu';
import {useSelector, useDispatch} from 'react-redux';
import counterReducer from './reducers/counter';
import {increment, decrement} from './actions';

const App = () => {
  const reduxCounter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

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

        <div className="counter">
        <h1>Redux Counter : {reduxCounter}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        {isLogged ? <h2>This is something only logged in people can see</h2> : ''}
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;