// import React, { Component } from 'react';
// import './App.css';
// import { Switch, Route, Link, BrowserRouter } from "react-router-dom";

// import Home from './components/Home';

// const App = () => {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <div className="nav-bar">
//             <Link to="/">Home</Link>
//             <Link to="/about">About</Link>
//         </div>
//         <Switch>
//           <Route exact path="/" component={Home} />
          // <Route exact path="/about" component={Team} />
          // <Route exact path="/dang" component={Dang} />
          // <Route exact path="/will" component={William} />
          // <Route exact path="/joe" component={Joe} />
          // <Route exact path="/kevin" component={Kevin} />
          // <Route exact path="/ben" component={Ben} />
          // <Route exact path="/onu" component={Onu} />
//         </Switch>
//       </BrowserRouter>
//     </div>
//   );
// }

import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route } from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Model from './components/Model';

import Team from './components/Team';
import Dang from './components/About/Dang';
import William from './components/About/William';
import Joe from './components/About/Joe';
import Kevin from './components/About/Kevin';
import Ben from './components/About/Ben';
import Onu from './components/About/Onu';

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