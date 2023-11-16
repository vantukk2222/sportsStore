// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './reducers/Login/authReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  // ...other reducers if any
});

export default rootReducer;
