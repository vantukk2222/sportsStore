// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './reducers/Login/authReducer';
import signUpReducer from './reducers/Register/signUpReucer';
const rootReducer = combineReducers({
  auth: authReducer,
  signup: signUpReducer,
  

  // ...other reducers if any
});
export default rootReducer;
