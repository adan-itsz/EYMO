import React, { Component } from 'react';
import { Grid, Card, Icon,  Image,Header } from 'semantic-ui-react';
import {Route,Link} from 'react-router-dom';
import { Statistic } from 'semantic-ui-react';
import axios from 'axios';
import '../estilo/Analitics.css'
class Maquinas extends Component {
  constructor(){
    super()
    this.state={
      TotalAreas:"",
      TotalMaquinas:"",
      TotalComponentes:"",
      TotalMantenimientos:"",
    }

    axios.post(`http://localhost:4000/ConsultaAnalitics`)
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        this.setState({
          TotalAreas: res.data.TotalAreas,
          TotalMaquinas:res.data.TotalMaquinas,
          TotalComponentes:res.data.TotalComponentes,
          TotalMantenimientos:res.data.TotalMantenimientos,
        })

      })

  }



  seleccion= boton =>()=>{
    switch(boton){
      case 'uno':
        window.location.href = '/admin/busqueda/01';
      break;
      case 'dos':
        window.location.href = '/admin/busqueda/02';
      break;
      case 'tres':
        window.location.href = '/admin/busqueda/03';
      break;
      case 'cuatro':
        window.location.href = '/admin/busqueda/04';
      break;
      case 'cinco':
        window.location.href = '/admin/busqueda/05';
      break;
      case 'seis':
        window.location.href = '/admin/busqueda/06';
      break;
      case 'siete':
        window.location.href = '/admin/busqueda/07';
      break;
      case 'ocho':
        window.location.href = '/admin/busqueda/08';
      break;
      case 'nueve':
        window.location.href = '/admin/busqueda/09';
      break;

    }

  }


  render() {
    return (
      <div className="contenedorGrid">

      <Grid container columns={3}>
      <Grid.Row verticalAlign='top'>
         <Grid.Column onClick={this.seleccion('uno')} >
          <div className='card'>
            <Statistic id="Stadisticas">
              <Statistic.Value>{this.state.TotalAreas}</Statistic.Value>
              <Statistic.Label>Total de areas</Statistic.Label>
            </Statistic>
         </div>
         </Grid.Column>

         <Grid.Column onClick={this.seleccion('dos')}>
         <div className='card'>
            <Statistic id="Stadisticas">
              <Statistic.Value>{this.state.TotalMaquinas}</Statistic.Value>
              <Statistic.Label>Total de maquinas</Statistic.Label>
            </Statistic>
         </div>
         </Grid.Column>

         <Grid.Column onClick={this.seleccion('tres')} >
          <div className='card'>
            <Statistic id="Stadisticas">
              <Statistic.Value>{this.state.TotalComponentes}</Statistic.Value>
              <Statistic.Label>Total de componentes</Statistic.Label>
            </Statistic>
         </div>
         </Grid.Column>

      </Grid.Row>
      <Grid.Row verticalAlign='top'>
      <Grid.Column onClick={this.seleccion('cuatro')}>
       <div className='card'>
          <Statistic id="Stadisticas">
            <Statistic.Value>{this.state.TotalMantenimientos}</Statistic.Value>
            <Statistic.Label>Total de mantenimientos</Statistic.Label>
          </Statistic>
      </div>
      </Grid.Column>
      </Grid.Row>

      </Grid>

      </div>

    );
  }
}



export default Maquinas;
