import React, { Component } from 'react';
import {Route, BrowserRouter, Switch,Router} from 'react-router-dom'
import Maquinas from './menuMaquinas.js'
import Buscar from './busqueda.js';
import ItemMaquina from './item-maquina.js';
class RouterPrincipal extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <BrowserRouter>
        <Switch >
        <Route exact path="/" component={Maquinas}/>
        <Route path="/maquinas" component={Maquinas}/>
        <Route path="/busqueda/:id" component={Buscar}/>
        <Route path="/MaqItem/:id" component={ItemMaquina}/>
      </Switch>
      </BrowserRouter>
    );
  }
}




export default RouterPrincipal;
