import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Axios from 'axios'


import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors
} from './Helpers/auth-helpers'
import Nav from './componentes/Nav'
import Loading from './componentes/Loading'
import Error from './componentes/Error'

import Signup from './vistas/Signup'
import Login from './vistas/Login'
import Upload from './vistas/Upload'
import Main from './componentes/Main'
import Feed from './vistas/Feed';

initAxiosInterceptors();

export default function App() {
  // the initial value is null because we don´t know if the user exists yet
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

    async function cargarUsuario() {
      if (!getToken()) {
        setCargandoUsuario(false);
        return;
      }

      try {
        const { data: usuario } = await Axios.get('/api/usuarios/whoami')
        setUsuario(usuario);
        setCargandoUsuario(false)
      } catch (error) {
        console.log(error)
      }
    }
    cargarUsuario()
  }, []);



  async function login(email, password) {
    const { data } = await Axios.post('/api/usuarios/login', {
      email,
      password
    });
    setUsuario(data.usuario)
    setToken(data.token)
  }

  async function signup(usuario) {
    const { data } = await Axios.post('/api/usuarios/signup', usuario);
    setUsuario(data.usuario)
    setToken(data.token)
  }

  async function logout() {
    setUsuario(null);
    deleteToken()
  }

  function mostrarError(mensaje) {
    setError(mensaje);
  }

  function esconderError() {
    setError(null)
  }

  /*   if (cargandoUsuario) {
      return (
        <Main center >
          <Loading />
        </Main>
      )
    } */

  return (
    <Router>
      <Nav usuario={usuario} />
      <Error mensaje={error} esconderError={esconderError} />
      {usuario ? (
        <LoginRoutes mostrarError={mostrarError} />
      ) : (
          <LogoutRoutes
            login={login}
            signup={signup}
            mostrarError={mostrarError}
          />
        )}

    </Router>);

}

function LoginRoutes({ mostrarError }) {
  return (
    <Switch>
      <Route
        path="/upload"
        render={(props) => <Upload{...props} mostrarError={mostrarError} />}
      />
      <Route
        path="/"
        render={(props) => <Feed{...props} mostrarError={mostrarError} />}
        default
      />

    </Switch>
  )
}

// this function create two routes, for login and logout
function LogoutRoutes({ login, signup, mostrarError }) {
  return (
    <Switch>
      <Route
        path="/login"
        render={(props) => <Login{...props} login={login} mostrarError={mostrarError} />}
      />
      <Route
        // this route doesn´t have path because is the defaout route
        render={(props) => <Signup{...props} signup={signup} mostrarError={mostrarError} />}
        default
      />
    </Switch>
  )
}