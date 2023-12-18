// actions/taskActions.js
import AxiosInstance from "../../utils/axios";
import { taskStatuses } from "../../utils/constants";

// Action Types
export const ADD_TASK = "ADD_TASK";
export const GET_TASKS = "GET_TASKS";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

// Asynchronous Thunk action creator to fetch tasks
export const getTasks = () => {
  return async (dispatch) => {
    try {
      const response = await AxiosInstance.get("/task/");
      dispatch({
        type: GET_TASKS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Dispatch error handling actions as necessary
    }
  };
};
// Asynchronous Thunk action creator to create a new task
export const addTask = (title, description) => {
  return async (dispatch) => {
    try {
      const response = await AxiosInstance.post("/task/", {
        title,
        description,
        status: taskStatuses[0],
      });
      dispatch({
        type: ADD_TASK,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Dispatch error handling actions as necessary
    }
  };
};
// Asynchronous Thunk action creator to update a task
export const updateTask = (updatedTask) => {
  return async (dispatch) => {
    try {
      const response = await AxiosInstance.put(`/task/${updatedTask._id}`, {
        ...updatedTask
      });
      dispatch({
        type: UPDATE_TASK,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Dispatch error handling actions as necessary
    }
  };
};
// Asynchronous Thunk action creator to delete a task
export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      await AxiosInstance.delete(`/task/${id}`);
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Dispatch error handling actions as necessary
    }
  };
};

// ... Define other CRUD operations similarly using Thunk
