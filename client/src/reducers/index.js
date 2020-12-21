import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import issue from './issue';
export default combineReducers({
  alert,
  auth,
  issue,
});
