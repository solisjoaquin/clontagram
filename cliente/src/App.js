import React, { Fragment, useState, useEffect } from 'react';
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
    <Fragment>
      {/* <Nav className="ContenedorTemporal" /> */}
      {/* <Signup signup={signup} /> */}
      <Login login={login} />
      <div>{JSON.stringify(usuario)}</div>

    </Fragment>);

}
