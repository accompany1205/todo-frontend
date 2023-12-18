import { combineReducers } from 'redux';
import taskReducer from './taskReduer';

const rootReducer = combineReducers({
  tasks: taskReducer, // The key 'tasks' would be how you access this part of the state object
});

export default rootReducer;