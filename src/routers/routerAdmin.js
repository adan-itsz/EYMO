import React, { Component } from 'react';
import {Route, BrowserRouter, Switch,Router} from 'react-router-dom'
import Analitics from '../componentes/Analitics.js'
import Agentes from '../componentes/AgentesDisponibles.js';
import ItemMaquina from '../componentes/item-maquina.js';
import BarraLateral from '../componentes/sideBarAdmin.js';
import MantenimientoItem from '../componentes/MantenimientosAdmin.js';
import MtosPendientes from '../componentes/MantenimientosPendientes.js';
class UserRoutes extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className='contenedor-opciones'>


      <BrowserRouter>
        <Switch >
        <Route exact path="/admin/" component={Analitics}/>
        <Route path="/admin/Mantenimientos" component={MantenimientoItem}/>
        <Route path="/admin/MtosPendientes" component={MtosPendientes}/>
        <Route path="/admin/Agentes" component={Agentes}/>
        <Route path="/admin/MaqItem/:id" component={ItemMaquina}/>
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default UserRoutes;
