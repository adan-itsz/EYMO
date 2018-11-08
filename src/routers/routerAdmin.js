import React, { Component } from 'react';
import {Route, BrowserRouter, Switch,Router} from 'react-router-dom'
import Maquinas from '../componentes/menuMaquinas.js'
import Buscar from '../componentes/busqueda.js';
import ItemMaquina from '../componentes/item-maquina.js';
import BarraLateral from '../componentes/menu.js';

class RouterPrincipal extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className='contenedor-opciones'>
      <BarraLateral/>

      <BrowserRouter>
        <Switch >
        <Route exact path="/admin/maquinas" component={Maquinas}/>
        <Route path="/admin/maquinas" component={Maquinas}/>
        <Route path="/admin/busqueda/:id" component={Buscar}/>
        <Route path="/admin/MaqItem/:id" component={ItemMaquina}/>
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}




export default RouterPrincipal;
