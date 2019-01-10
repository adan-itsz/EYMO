import React, { Component } from 'react';
import { Grid, Card, Icon,  Image,Header } from 'semantic-ui-react';
import {Route,Link} from 'react-router-dom';
import { Statistic, List, Divider,Label } from 'semantic-ui-react';
import axios from 'axios';
import BarraLateral from '../componentes/sideBarAdmin.js';

import '../estilo/Analitics.css'
class Maquinas extends Component {
  constructor(){
    super()
    this.state={
      TotalAreas:"",
      TotalMaquinas:"",
      TotalComponentes:"",
      TotalMantenimientos:"",
      TopAgentes:[],
      TopMaquinas:[],
      TopAreas:[],
      CostosPromedio:"",
    }

    axios.post(`http://localhost:4000/ConsultaAnalitics`)
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        this.setState({
          TotalAreas: res.data.TotalAreas,
          TotalMaquinas:res.data.TotalMaquinas,
          TotalComponentes:res.data.TotalComponentes,
          TotalMantenimientos:res.data.TotalMantenimientos,
          TopAgentes:res.data.TopAgentes,
          TopAreas:res.data.TopArea,
          TopMaquinas:res.data.TopMaquinas,
          CostosPromedio: res.data.CostosPromedio,
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
      <div>
      <BarraLateral/>
      <div className="contenedorGrid">

      <Grid container columns={3}>
      <Grid.Row verticalAlign='top'>
         <Grid.Column >
          <div className='card'>
            <Statistic id="Stadisticas">
              <Statistic.Value>{this.state.TotalAreas}</Statistic.Value>
              <i class="material-icons" style={{ fontSize: '4em', position:'absolute', left:'65%' }}>business </i>

              <Statistic.Label>Total de areas</Statistic.Label>
            </Statistic>
         </div>
         </Grid.Column>

         <Grid.Column>
         <div className='card'>
            <Statistic id="Stadisticas">
              <Statistic.Value>{this.state.TotalMaquinas}</Statistic.Value>
              <i class="material-icons" style={{ fontSize: '4em', position:'absolute', left:'65%' }}>memory </i>

              <Statistic.Label>Total de maquinas</Statistic.Label>
            </Statistic>
         </div>
         </Grid.Column>

         <Grid.Column  >
          <div className='card'>
            <Statistic id="Stadisticas">
              <Statistic.Value>{this.state.TotalComponentes}</Statistic.Value>
              <i class="material-icons" style={{ fontSize: '4em', position:'absolute', left:'65%' }}>settings </i>
              <Statistic.Label>Total de componentes</Statistic.Label>
            </Statistic>
         </div>
         </Grid.Column>

      </Grid.Row>
      <Grid.Row verticalAlign='top'>
      <Grid.Column >
       <div className='card'>
          <Statistic id="Stadisticas">
            <Statistic.Value>{this.state.TotalMantenimientos}</Statistic.Value>
            <i class="material-icons" style={{ fontSize: '4em', position:'absolute', left:'65%' }}>content_paste </i>
            <Statistic.Label>Total de mantenimientos</Statistic.Label>
          </Statistic>
      </div>
      </Grid.Column>
      <Grid.Column >
       <div className='card'>
          <Statistic id="Stadisticas">
            <Statistic.Value>{this.state.CostosPromedio}</Statistic.Value>
            <i class="material-icons" style={{ fontSize: '4em', position:'absolute', left:'65%' }}>money</i>
            <Statistic.Label>Costo promedio de Mtos.</Statistic.Label>
          </Statistic>
      </div>
      </Grid.Column>
      </Grid.Row>
      <Divider/>
      <Grid.Row>

        <h3 style={{ marginLeft: '35%' }}>Top Agentes con mas mantenimeinto</h3>
        <List horizontal style={{ marginLeft: '22%' }}>
        { this.state.TopAgentes[0]?

          <List.Item>
          <Label circular  color={'grey'} > 2  </Label>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
            <List.Content>
              <List.Header as='a'>{this.state.TopAgentes[1].Agente}</List.Header>
              <List.Description style={{ width: '100%' }}>
                Mantenimiento realizados{' '}
                <a>
                  <b>({this.state.TopAgentes[1].Cantidad})</b>
                </a>{' '}

                </List.Description>
              </List.Content>
              </List.Item>

              :
              <div></div>

        }
        {this.state.TopAgentes[1]?

          <List.Item>
            <Label circular  color={'yellow'} > 1  </Label>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
            <List.Content>
              <List.Header as='a'>{this.state.TopAgentes[0].Agente}</List.Header>
              <List.Description style={{ width: '100%' }}>
              Mantenimiento realizados{' '}
              <a>
                <b>({this.state.TopAgentes[0].Cantidad})</b>
              </a>{' '}

                </List.Description>
              </List.Content>
          </List.Item>
          :
          <div></div>

        }
        {this.state.TopAgentes[2]?
          <List.Item>
          <Label circular  color={'brown'} > 3 </Label>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <List.Content>
              <List.Header as='a'>{this.state.TopAgentes[2].Agente}</List.Header>
              <List.Description style={{ width: '100%' }}>
              Mantenimiento realizados{' '}
              <a>
                <b>({this.state.TopAgentes[2].Cantidad})</b>
              </a>{' '}

                </List.Description>
              </List.Content>
              </List.Item>
              :
              <div></div>

        }


          </List>
      </Grid.Row>
      <Divider/>
      <Grid.Row>

        <h3 style={{ marginLeft: '35%' }}>Maquinas con mas mantenimientos</h3>
        <List horizontal style={{ marginLeft: '22%' }}>
        { this.state.TopMaquinas[0]?

          <List.Item>
          <Label circular  color={'grey'} > 2  </Label>
            <Image avatar src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/maquinaIcon.png?alt=media&token=fb0b2726-bc70-4f6c-aa14-33aec82e1701' />
            <List.Content>
              <List.Header as='a'>{this.state.TopMaquinas[1].Maquina}</List.Header>
              <List.Description style={{ width: '100%' }}>
                Mantenimiento realizados{' '}
                <a>
                  <b>({this.state.TopMaquinas[1].Cantidad})</b>
                </a>{' '}

                </List.Description>
              </List.Content>
              </List.Item>

              :
              <div></div>

        }
        {this.state.TopMaquinas[1]?

          <List.Item>
            <Label circular  color={'yellow'} > 1  </Label>
            <Image avatar src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/maquinaIcon.png?alt=media&token=fb0b2726-bc70-4f6c-aa14-33aec82e1701' />
            <List.Content>
              <List.Header as='a'>{this.state.TopMaquinas[0].Maquina}</List.Header>
              <List.Description style={{ width: '100%' }}>
              Mantenimiento realizados{' '}
              <a>
                <b>({this.state.TopMaquinas[0].Cantidad})</b>
              </a>{' '}

                </List.Description>
              </List.Content>
          </List.Item>
          :
          <div></div>

        }
        {this.state.TopMaquinas[2]?
          <List.Item>
          <Label circular  color={'brown'} > 3 </Label>
            <Image avatar src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/maquinaIcon.png?alt=media&token=fb0b2726-bc70-4f6c-aa14-33aec82e1701' />
            <List.Content>
              <List.Header as='a'>{this.state.TopMaquinas[2].Maquina}</List.Header>
              <List.Description style={{ width: '100%' }}>
              Mantenimiento realizados{' '}
              <a>
                <b>({this.state.TopMaquinas[2].Cantidad})</b>
              </a>{' '}

                </List.Description>
              </List.Content>
              </List.Item>
              :
              <div></div>

        }


          </List>
      </Grid.Row>
      <Divider/>
      <Grid.Row>

        <h3 style={{ marginLeft: '35%' }}>Areas con mas mantenimientos</h3>
        <List horizontal style={{ marginLeft: '22%' }}>
        { this.state.TopAreas[0]?

          <List.Item>
          <Label circular  color={'grey'} > 2  </Label>
            <Image avatar src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Gearssmall-512.png?alt=media&token=f6ec379e-ac07-4f9c-be07-dc012eb4a7fe' />
            <List.Content>
              <List.Header as='a'>{this.state.TopAreas[1].Area}</List.Header>
              <List.Description style={{ width: '100%' }}>
                Mantenimiento realizados{' '}
                <a>
                  <b>({this.state.TopAreas[1].Cantidad})</b>
                </a>{' '}

                </List.Description>
              </List.Content>
              </List.Item>

              :
              <div></div>

        }
        {this.state.TopAreas[1]?

          <List.Item>
            <Label circular  color={'yellow'} > 1  </Label>
            <Image avatar src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Gearssmall-512.png?alt=media&token=f6ec379e-ac07-4f9c-be07-dc012eb4a7fe' />
            <List.Content>
              <List.Header as='a'>{this.state.TopAreas[0].Area}</List.Header>
              <List.Description style={{ width: '100%' }}>
              Mantenimiento realizados{' '}
              <a>
                <b>({this.state.TopAreas[0].Cantidad})</b>
              </a>{' '}

                </List.Description>
              </List.Content>
          </List.Item>
          :
          <div></div>

        }
        {this.state.TopAreas[2]?
          <List.Item>
          <Label circular  color={'brown'} > 3 </Label>
            <Image avatar src='https://firebasestorage.googleapis.com/v0/b/eymo-91ecd.appspot.com/o/Gearssmall-512.png?alt=media&token=f6ec379e-ac07-4f9c-be07-dc012eb4a7fe' />
            <List.Content>
              <List.Header as='a'>{this.state.TopAreas[2].Area}</List.Header>
              <List.Description style={{ width: '100%' }}>
              Mantenimiento realizados{' '}
              <a>
                <b>({this.state.TopAreas[2].Cantidad})</b>
              </a>{' '}

                </List.Description>
              </List.Content>
              </List.Item>
              :
              <div></div>

        }


          </List>
      </Grid.Row>

      </Grid>

      </div>
    </div>
    );
  }
}



export default Maquinas;
