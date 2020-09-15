import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/auth';

const defaultState = {
  isAuthenticated: false,
  username: '',
  errorMessage: ''
}

const user = (state = defaultState, action) => {

  switch (action.type) {

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        username: action.username,
        errorMessage: '',
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        username: '',
        errorMessage: action.error
      });

    case LOGOUT:
      return Object.assign({}, state, {
        isAuthenticated: false,
        username: '',
        errorMessage: ''
      });

    default:
      return state;

  }
}

export default user;
