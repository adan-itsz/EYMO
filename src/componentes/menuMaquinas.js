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
          <div className="imagen">
            <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F02.png?alt=media&token=8c627087-76b8-4a58-a659-680f852ff95b'/>
          </div>
           <Header as='h3' style={{textAlign:'center'}}>
            <Header.Content>Area 1</Header.Content>
           </Header>
         </div>
         </Grid.Column>

         <Grid.Column onClick={this.seleccion('dos')}>
         <div className='card'>
         <div className="imagen">
           <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F01.png?alt=media&token=2057c16f-e40a-4735-9bb3-a64a3f5026f0'/>
        </div>
           <Header as='h3' style={{textAlign:'center'}}>
            <Header.Content>Area 2</Header.Content>
           </Header>
         </div>
         </Grid.Column>

         <Grid.Column onClick={this.seleccion('tres')} >
          <div className='card'>
          <div className="imagen">
            <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F03.png?alt=media&token=7ba5a67b-16ac-45a8-8cc2-d9d417ffe136'/>
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
         <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F04.png?alt=media&token=acfcd192-3a58-46d9-952e-b0760f0c95c2'/>
       </div>
        <Header as='h3' style={{textAlign:'center'}}>
         <Header.Content>Area 4</Header.Content>
        </Header>
      </div>
      </Grid.Column>

        <Grid.Column onClick={this.seleccion('cinco')}>
         <div className='card'>
         <div className="imagen">
           <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F05.png?alt=media&token=9ee3f0ab-11d1-4b41-9cd0-4fdc8ba3a3a9'/>
         </div>
          <Header as='h3' style={{textAlign:'center'}}>
           <Header.Content>Area 5</Header.Content>
          </Header>
        </div>
        </Grid.Column>

        <Grid.Column onClick={this.seleccion('seis')}>
         <div className='card'>
         <div className="imagen">
           <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F09.png?alt=media&token=59eb7be0-e069-4c63-b357-2c62cfa3ec97'/>
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
             <Image src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Ing_tala%2FAreas%2F08.png?alt=media&token=6922a337-6141-434d-8563-89e5f10f61a5.png'/>
           </div>
            <Header as='h3' style={{textAlign:'center'}}>
             <Header.Content>Area 7</Header.Content>
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
