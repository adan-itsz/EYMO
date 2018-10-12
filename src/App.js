import React, { Component } from 'react';
import './estilo/App.css';
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom';
import RouterPrincipal from './routers/router.js';
import Maquinas from './componentes/menuMaquinas.js';
import BarraLateral from './componentes/menu.js';
class App extends Component {
  constructor(){
    super()
  }


  render() {
    return (
      <div>
      <BarraLateral/>
      <RouterPrincipal/>
      </div>
    );
  }
}



export default App;
