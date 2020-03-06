import axios from 'axios';

import { GET_TODOS, DELETE_TODO, ADD_TODO } from './types';
import { tokenConfig } from './auth';

// GET TODOS
export const getTodos = () => (dispatch, getState) => {
    axios.get("http://localhost:8080/api/todo/", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TODOS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};

// DELETE TODO
export const deleteTodo = (id) => (dispatch, getState) => {
    axios.delete(`http://localhost:8080/api/todo/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_TODO,
                payload: id
            });
        }).catch(err => console.log(err));
}

// ADD TODO
export const addTodo = todo => (dispatch, getState) => {
    axios.post('http://localhost:8080/api/todo/', todo, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: res.data
            });
        }).catch(err => console.log(err));
}