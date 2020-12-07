import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Axios from 'axios'


import { setToken, deleteToken, getToken, initAxiosInterceptors } from './Helpers/auth-helpers'
import Nav from './componentes/Nav'
import Signup from './vistas/Signup'
import Login from './vistas/Login'
import Loading from './componentes/Loading'
import Main from './componentes/Main'

initAxiosInterceptors();

export default function App() {
  // the initial value is null because we don´t know if the user exists yet
  const [usuario, setUsuario] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(true);

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
    const { data } = await Axios.post('/api/usuarios/login', { email, password });
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

  /*   if (cargandoUsuario) {
      return (
        <Main center >
          <Loading />
        </Main>
      )
    } */

  return (
    <Router>
      {usuario ?
        (

          <LoginRoutes />
        ) : (
          <LogoutRoutes login={login} signup={signup} />
        )}

    </Router>);

}

function LoginRoutes() {
  return (
    <Switch>
      <Route
        path="/"
        component={() => (
          <Fragment>
            <Nav />
            <Main center>

              <h1>Soy el feed</h1>
            </Main>
          </Fragment>
        )} default
      />

    </Switch>
  )
}

// this function create two routes, for login and logout
function LogoutRoutes({ login, signup }) {
  return (
    <Switch>
      <Route
        path="/login/"
        render={(props) => <Login{...props} login={login} />}
      />
      <Route
        // this route doesn´t have path because is the defaout route
        render={(props) => <Signup{...props} signup={signup} />}
        default
      />
    </Switch>
  )
}