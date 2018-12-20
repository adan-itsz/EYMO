import React, { Component } from 'react';
import {Route, BrowserRouter, Switch,Router} from 'react-router-dom'
import Analitics from '../componentes/Analitics.js'
import Buscar from '../componentes/busqueda.js';
import ItemMaquina from '../componentes/item-maquina.js';
import BarraLateral from '../componentes/menuSuperUser.js';
import MantenimientoItem from '../componentes/Mantenimientos.js';
class UserRoutes extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className='contenedor-opciones'>
      <BarraLateral/>

      <BrowserRouter>
        <Switch >
        <Route exact path="/admin/" component={Analitics}/>
        <Route path="/admin/Mantenimientos" component={MantenimientoItem}/>
        <Route path="/admin/Agentes/:id" component={Buscar}/>
        <Route path="/admin/MaqItem/:id" component={ItemMaquina}/>
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default UserRoutes;
