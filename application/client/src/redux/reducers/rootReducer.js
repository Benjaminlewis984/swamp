import { combineReducers } from 'redux';
import searchReducer from './searchReducers';
import loginReducer from './loginReducer';

export default combineReducers({
    searchReducer,
    loginReducer,
});