import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Login = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/"); //redirect se logado
    }

    if (error === "E-mail inválido" || error === "Senha inválida") {
      setAlert(error, "danger");
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Por favor, complete os dados necessários", "danger");
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        <span className='text-primary'>Login</span> Usuário
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Senha</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Entrar'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
