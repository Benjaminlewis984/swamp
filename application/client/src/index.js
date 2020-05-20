import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
