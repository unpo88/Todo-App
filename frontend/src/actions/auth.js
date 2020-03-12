import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

import { returnErrors } from './messages';

// CHECK TOKEN & LOAD USER
export const loader = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('http://localhost:8080/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state));
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// LOGIN USER
export const login = (user_id, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ user_id, password });

    axios.post('http://localhost:8080/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state));
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// REGISTER USER
export const register = (user_id, user_name, password) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ user_id, user_name, password });

    axios.post('http://localhost:8080/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state));
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGOUT
export const logout = () => (dispatch, getState) => {
    axios.post("http://localhost:8080/api/auth/logout", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.state));
        });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // If token, add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}