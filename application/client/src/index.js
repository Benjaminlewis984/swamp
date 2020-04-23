import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { ProductProvider } from './context';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import searchReducer, {searchResults} from './redux/reducers/searchReducers';

const store = createStore(searchReducer);

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
