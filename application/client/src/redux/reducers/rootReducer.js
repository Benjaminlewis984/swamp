import { combineReducers } from 'redux';
<<<<<<< HEAD
import notesReducer from './notesReducer';
import userReducer from './userReducer';

export default combineReducers({
  notesReducer,
  userReducer,
=======
import searchReducer from './searchReducers';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';

export default combineReducers({
    searchReducer,
    loginReducer,
    signupReducer,
>>>>>>> 0c90c426bc5e22ed0bd72350ddbf526b9468e037
});