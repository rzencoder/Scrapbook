import axios from "axios";
import { browserHistory } from "react-router";
import { getAllPosts } from "./posts";

const path = "https://scrapbook-fcc.herokuapp.com";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true,
    username: user.username,
  };
}

function loginError(error) {
  return {
    type: LOGIN_FAILURE,
    isAuthenticated: false,
    username: "",
    error,
  };
}

export function checkAuth() {
  return (dispatch) => {
    return axios
      .post(path + "/auth/verify")
      .then((res) => {
        const user = res.data;
        dispatch(receiveLogin(user));
        dispatch(getAllPosts());
      })
      .catch((err) => {
        console.log("Login Required", err.response.data);
        dispatch(loginError(err.response.data));
        browserHistory.push("/");
      });
  };
}

function logoutUser() {
  return {
    type: LOGOUT,
    isAuthenticated: false,
    username: "",
  };
}

export function logout() {
  return (dispatch) => {
    return axios
      .get(path + "/logout")
      .then((res) => {
        dispatch(logoutUser());
        browserHistory.push("/");
      })
      .catch((err) => {
        console.log("Login Error");
      });
  };
}
