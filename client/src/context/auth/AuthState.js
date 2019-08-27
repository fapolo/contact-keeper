import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // CARREGAR USUARIO
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const response = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // REGISTRAR USUARIO
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await axios.post("/api/users", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // LOGIN USUARIO
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const response = await axios.post("/api/auth", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // LOGOUT
  const logout = () =>
    dispatch({
      type: LOGOUT
    });

  // LIMPAR ERROS
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
