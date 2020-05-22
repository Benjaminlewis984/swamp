import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';


const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root'));
=======
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from './context';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
require('dotenv').config()
const store = createStore(rootReducer,applyMiddleware(thunk));

ReactDOM.render(
    <ProductProvider>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ProductProvider>,
    document.getElementById('root'));
>>>>>>> 0c90c426bc5e22ed0bd72350ddbf526b9468e037

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
