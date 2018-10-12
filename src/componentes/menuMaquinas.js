import React, { Component } from 'react';
import { Grid, Card, Icon,  Image,Header } from 'semantic-ui-react';
import {Route,Link} from 'react-router-dom';
import '../estilo/maquinas.css'
class Maquinas extends Component {
  constructor(){
    super()


  }
  seleccion= boton =>()=>{
    switch(boton){
      case 'uno':
        window.location.href = '/busqueda/1';
      break;
      case 'dos':
        window.location.href = '/busqueda/2';
      break;
      case 'tres':
        window.location.href = '/busqueda/3';
      break;
      case 'cuatro':
        window.location.href = '/busqueda/4';
      break;
      case 'cinco':
        window.location.href = '/busqueda/5';
      break;
      case 'seis':
        window.location.href = '/busqueda/6';
      break;
      case 'siete':
        window.location.href = '/busqueda/7';
      break;
      case 'ocho':
        window.location.href = '/busqueda/8';
      break;
      case 'nueve':
        window.location.href = '/busqueda/9';
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
          <div className="imagen">
            <Image src='imgs/01.png'/>
          </div>
           <Header as='h3' style={{textAlign:'center'}}>
            <Header.Content>Area 1</Header.Content>
           </Header>
         </div>
         </Grid.Column>

         <Grid.Column onClick={this.seleccion('dos')}>
         <div className='card'>
         <div className="imagen">
           <Image src='imgs/02.png'/>
        </div>
           <Header as='h3' style={{textAlign:'center'}}>
            <Header.Content>Area 2</Header.Content>
           </Header>
         </div>
         </Grid.Column>

         <Grid.Column onClick={this.seleccion('tres')} >
          <div className='card'>
          <div className="imagen">
            <Image src='imgs/03.png'/>
          </div>
           <Header as='h3' style={{textAlign:'center'}}>
            <Header.Content>Area 3</Header.Content>
           </Header>
         </div>
         </Grid.Column>

      </Grid.Row>
      <Grid.Row verticalAlign='top'>
      <Grid.Column onClick={this.seleccion('cuatro')}>
       <div className='card'>
       <div className="imagen">
         <Image src='imgs/04.png'/>
       </div>
        <Header as='h3' style={{textAlign:'center'}}>
         <Header.Content>Area 4</Header.Content>
        </Header>
      </div>
      </Grid.Column>

        <Grid.Column onClick={this.seleccion('cinco')}>
         <div className='card'>
         <div className="imagen">
           <Image src='imgs/05.png'/>
         </div>
          <Header as='h3' style={{textAlign:'center'}}>
           <Header.Content>Area 5</Header.Content>
          </Header>
        </div>
        </Grid.Column>

        <Grid.Column onClick={this.seleccion('seis')}>
         <div className='card'>
         <div className="imagen">
           <Image src='imgs/07.png'/>
         </div>
          <Header as='h3' style={{textAlign:'center'}}>
           <Header.Content>Area 6</Header.Content>
          </Header>
        </div>
        </Grid.Column>

        </Grid.Row>

        <Grid.Row verticalAlign='top'>
          <Grid.Column onClick={this.seleccion('siete')}>
           <div className='card'>
           <div className="imagen">
             <Image src='imgs/08.png'/>
           </div>
            <Header as='h3' style={{textAlign:'center'}}>
             <Header.Content>Area 7</Header.Content>
            </Header>
          </div>
          </Grid.Column>

          <Grid.Column onClick={this.seleccion('ocho')}>
           <div className='card'>
           <div className="imagen">
             <Image src='imgs/09.png'/>
           </div>
            <Header as='h3' style={{textAlign:'center'}}>
             <Header.Content>Area 8</Header.Content>
            </Header>
          </div>
          </Grid.Column>

          <Grid.Column onClick={this.seleccion('nueve')}>
           <div className='card'>
           <div className="imagen">
             <Image src='imgs/10.png'/>
           </div>
            <Header as='h3' style={{textAlign:'center'}}>
             <Header.Content>Area 9</Header.Content>
            </Header>
          </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </div>

    );
  }
}



export default Maquinas;
