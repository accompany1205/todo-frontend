// reducers/taskReducer.js
import {
  ADD_TASK,
  GET_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
} from "../actions/taskActions";

const initialState = {
  tasks: [],
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case UPDATE_TASK:
      const _tasks = state.tasks.map((task) => {
        if (task._id === action.payload._id) {
          return action.payload;
        }
        return task;
      });
      return {
        ...state,
        tasks: [..._tasks],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter((task) => task._id !== action.payload)],
      };

    default:
      return state;
  }
}

export default taskReducer;
