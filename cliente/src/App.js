import React, { Fragment } from 'react';
import Nav from './componentes/Nav'
import Signup from './vistas/Signup'

export default function App() {
  return (
  <Fragment>
    <Nav className="ContenedorTemporal" />
    <Signup />
    
  </Fragment>);
  
}
