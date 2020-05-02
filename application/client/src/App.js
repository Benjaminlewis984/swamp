import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

<<<<<<< HEAD
import Home from './pages/Home';
import Team from './pages/Team';
import Dang from './pages/Dang';
import William from './pages/William';
import Joe from './pages/Joe';
import Kevin from './pages/Kevin';
import Ben from './pages/Ben';
import Onu from './pages/Onu';
import Login from './pages/Login';
import UserLogin from './pages/UserLogin';
import {useSelector, useDispatch} from 'react-redux';
import counterReducer from './reducers/counter';
import {increment, decrement} from './actions';
=======
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Model from './components/Model';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Upload from './components/Upload';
import Home from './components/Home';
>>>>>>> 0c90c426bc5e22ed0bd72350ddbf526b9468e037

import Team from './components/Team';
import Dang from './components/About/Dang';
import William from './components/About/William';
import Joe from './components/About/Joe';
import Kevin from './components/About/Kevin';
import Ben from './components/About/Ben';
import Onu from './components/About/Onu';

<<<<<<< HEAD
  return (
    <div className="App">
      <BrowserRouter>
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/userLogin">Show Login</Link>
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
          <Route path="/login" component={Login} />
          <Route path="/" component={UserLogin} />
        </Switch>
=======
class App extends Component {
  
  render() {
    return (
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={ProductList} />
            <Route path="/details" component={Details} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/upload" component={Upload} />
>>>>>>> 0c90c426bc5e22ed0bd72350ddbf526b9468e037

            <Route path="/about" component={Team} />
            <Route path="/dang" component={Dang} />
            <Route path="/will" component={William} />
            <Route path="/joe" component={Joe} />
            <Route path="/kevin" component={Kevin} />
            <Route path="/ben" component={Ben} />
            <Route path="/onu" component={Onu} />

            <Route component={Default} />
          </Switch>
          <Model />
        </React.Fragment>
    );
  }
  
}

export default App;