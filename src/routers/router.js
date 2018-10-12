import React, { Component } from 'react';
import {Route, BrowserRouter, Switch,Router} from 'react-router-dom'
import Maquinas from '../componentes/menuMaquinas.js'
import Buscar from '../componentes/busqueda.js';
import ItemMaquina from '../componentes/item-maquina.js';
class RouterPrincipal extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className='contenedor-opciones'>
      <BrowserRouter>
        <Switch >
        <Route exact path="/" component={Maquinas}/>
        <Route path="/maquinas" component={Maquinas}/>
        <Route path="/busqueda/:id" component={Buscar}/>
        <Route path="/MaqItem/:id" component={ItemMaquina}/>
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}




export default RouterPrincipal;
