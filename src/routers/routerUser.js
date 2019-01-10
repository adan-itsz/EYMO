import React, { Component } from 'react';
import {Route, BrowserRouter, Switch,Router} from 'react-router-dom'
import Maquinas from '../componentes/menuMaquinas.js'
import Buscar from '../componentes/busqueda.js';
import ItemMaquina from '../componentes/item-maquina.js';
import MantenimientoItem from '../componentes/Mantenimientos.js';
import Perfil from '../componentes/PerfilUser.js';
class RouterPrincipal extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div className='contenedor-opciones'>


      <BrowserRouter>
        <Switch >
        <Route exact path="/user/" component={Maquinas}/>
        <Route path="/user/Mantenimientos" component={MantenimientoItem}/>
        <Route path="/user/Perfil" component={Perfil}/>
        <Route path="/user/busqueda/:id" component={Buscar}/>
        <Route path="/user/MaqItem/:id" component={ItemMaquina}/>
      </Switch>
      </BrowserRouter>
      </div>
    );
  }
}




export default RouterPrincipal;
