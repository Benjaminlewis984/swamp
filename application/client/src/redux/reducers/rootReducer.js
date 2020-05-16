import { combineReducers } from 'redux';
import searchReducer from './searchReducers';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import purchaseReducer from './purchaseReducer';

export default combineReducers({
    searchReducer,
    loginReducer,
    signupReducer,
    purchaseReducer
});