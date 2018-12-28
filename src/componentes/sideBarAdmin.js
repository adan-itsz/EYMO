import React, { Component } from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {Router, Route, BrowserRouter, Switch, Link} from 'react-router-dom'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {Menu,Dropdown,Modal,Form ,Select} from 'antd';
import { Divider, Header,List,Icon,Table,Button,Input} from 'semantic-ui-react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import * as firebase from 'firebase';
const Option = Select.Option;


class navbar extends Component{
  constructor(){
    super()
    var self = this;
    axios.post(`http://localhost:4000/AreasDisponibles`,{})
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        self.setState({
          AreasDisponibles: res.data.Areas,
        });
      })
    this.state = {
      collapsed: true,
      auth: true,
      anchorEl: null,
      visible: false,
      NombreA:"",
      AreaA:"",
      ProfesionA:"",
      EdadA:"",
      CorreoA:"",
      contador:0, //se tomara la cantidad de componentes que ya tiene una maquina
      PassA: "",
      ImganeURl:"",
      file:null,
      AreasDisponibles : [],
      MaquinasPorArea: [],
      }

  }


  subirDatos=()=>{
    var self = this;
    axios.post(`http://localhost:4000/Subir_Agente`,{NombreA:this.state.NombreA,AreaA:this.AreaAgente.value,ProfesionA:this.state.ProfesionA,EdadA:this.state.EdadA,CorreoA:this.state.CorreoA, PassA: this.state.PassA})
      .then(res => {
        console.log(res.data);
        self.setState({
          NombreA:"",
          AreaA:"",
          ProfesionA:"",
          EdadA:"",
          CorreoA:"",
          PassA:"",
          visible: false,
        });
      })
  }
  handleItemClick=e=>{

  }

  handleCancelModal = (e) => {   //Cuando cierra el primer modal (datos mquina) limpia los campos
     console.log(e);
     this.setState({
       NombreA:"",
       AreaA:"",
       ProfesionA:"",
       EdadA:"",
       CorreoA:"",
       PassA:"",
       visible: false,

     });
   }


    showModal = () => {
      this.setState({
        visible: true,
      });
    }


  //***** Cambios de estados de los campos de datos de las maquinas
    NombreA =(event) =>{
      this.setState({
        NombreA:event.target.value
      })
    }
    AreaA =(event) =>{
      this.setState({
        AreaA:event.target.value
      })
    }
    ProfesionA =(event) =>{
      this.setState({
        ProfesionA:event.target.value
      })
    }
    EdadA =(event) =>{
      this.setState({
        EdadA:event.target.value
      })
    }
    CorreoA =(event) =>{
      this.setState({
        CorreoA:event.target.value
      })
    }
    PassA =(event) =>{
      this.setState({
        PassA:event.target.value
      })
    }

    SeleccionArea=(e)=>{
      var self = this;
      axios.post(`http://localhost:4000/MaquinasDisponibles`,{AreaID:e.target.value})
        .then(res => {
          console.log("lado del cleinte :: "+res.data);
          self.setState({
            MaquinasPorArea: res.data.MaquinasPorArea,
          });
        })

    }

  render(){
      const FormItem = Form.Item;

    return(
<div>

  <SideNav>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="Home">

    <NavItem>
    <Link to="/admin/">
      <NavItem >
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>home</i>
        </NavIcon>
        <NavText>
          Home
        </NavText>
      </NavItem>
    </Link>
    </NavItem>

    <NavItem>
    <Link to="/admin/Agentes">
      <NavItem >
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>person</i>
        </NavIcon>
        <NavText>
          Agentes Disponibles
        </NavText>
      </NavItem>
    </Link>
    </NavItem>


    <NavItem>
    <Link to="/admin/Mantenimientos">
      <NavItem>
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>content_paste </i>
        </NavIcon>
        <NavText style={{fontSize:'1em'}}>
          Mantenimientos
        </NavText>
      </NavItem>
    </Link>
    </NavItem>


    <NavItem onClick={this.showModal}>
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>person_add </i>
        </NavIcon>
        <NavText style={{fontSize:'1em'}}>
          Nueva Agente
        </NavText>
    </NavItem>



      <NavItem onClick={() => this.handleItemClick(firebase.auth().signOut() )}>
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>exit_to_app </i>
        </NavIcon>
        <NavText style={{fontSize:'1em'}}>
          Salir
        </NavText>
      </NavItem>


    </SideNav.Nav>
    </SideNav>

    <Modal
             title="Nuevo Agente"
             visible={this.state.visible}
             onOk={this.subirDatos}
             onCancel={this.handleCancelModal}
             width="900px"
           >
           <h3>Datos del Agente</h3>
             <h4>Nombre</h4>
              <input  onChange={this.NombreA}></input>
              <h5>Selecciona Area</h5>
              <input list="Areas" onChange={this.SeleccionArea} ref={(AreaAgente) => this.AreaAgente= AreaAgente}/>
              <datalist id="Areas">
              {this.state.AreasDisponibles.map((it,key)=>{
                return(<option value={it}></option>)})}
              </datalist>

             <h4>Profesion</h4>
              <input onChange={this.ProfesionA}></input>

             <h4>Edad</h4>
              <input onChange={this.EdadA}></input>

             <h4>Correo</h4>
              <input onChange={this.CorreoA}></input>
             <h4>Contraseña</h4>
             <input onChange={this.PassA}></input>

             <div>
             </div>

   </Modal>




</div>
)
}
}

class Carta extends Component{
  render(){
    return(
      <List.Item>
      <List.Header>{this.props.datos.Tipo}</List.Header>

        <Card>
        <CardActionArea>

            <CardContent>
              <Typography gutterBottom  component="h4">
                 {this.props.datos.Modelo_Componente}
              </Typography>
              <Typography component="p">
              {this.props.FechaI_Componente}
              </Typography>
            </CardContent>
        </CardActionArea>
      </Card>
    </List.Item>

    );
  }
}


export default navbar;
