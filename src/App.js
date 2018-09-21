import React, { Component } from 'react';
import './App.css';
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom';
import RouterPrincipal from './router.js';
import Maquinas from './menuMaquinas.js';
class App extends Component {
  constructor(){
    super()
  }


  render() {
    return (
      <RouterPrincipal/>
    );
  }
}



export default App;
