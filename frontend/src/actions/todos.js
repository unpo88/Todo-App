import axios from 'axios';

import { GET_TODOS, DELETE_TODO, ADD_TODO, UPDATE_TODO } from './types';
import { tokenConfig } from './auth';

import { createMessage, returnErrors } from './messages';

// GET TODOS
export const getTodos = () => (dispatch, getState) => {
    axios.get("http://localhost:8080/api/todo/", tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ getTodos: "Todos Get" }));
            dispatch({
                type: GET_TODOS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// GET TODO
export const getTodo = (id) => (dispatch, getState) => {
    axios.get(`http://localhost:8080/api/todo/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ getTodo: "Todo Get" }));
            dispatch({
                type: GET_TODO,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE TODO
export const deleteTodo = (id) => (dispatch, getState) => {
    axios.delete(`http://localhost:8080/api/todo/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteTodo: "Todo Deleted" }));
            dispatch({
                type: DELETE_TODO,
                payload: id
            });
        }).catch(err => console.log(err.response.data));
}

// ADD TODO
export const addTodo = todo => (dispatch, getState) => {
    axios.post('http://localhost:8080/api/todo/', todo, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addTodo: "Todo Added" }));
            dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// UPDATE TODO
export const updateTodo = (id, completed, content) => (dispatch, getState) => {
    return axios.put(`http://localhost:8080/api/todo/${id}/`, { completed, content }, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ updateTodo: "Todo Update" }));
            dispatch({
                type: UPDATE_TODO,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}