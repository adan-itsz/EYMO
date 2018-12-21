import React, { Component } from 'react';
import '../estilo/App.css';
import {ref} from '../const.js'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom';
import { Menu, Icon, Button,Form,FormItem, Radio,Dropdown, Modal } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { List,Label } from 'semantic-ui-react';
import * as firebase from 'firebase';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {TextField,MuiThemeProvider}from 'material-ui/TextField';
import axios from 'axios';

const SubMenu = Menu.SubMenu;

class BarraLateral extends Component {
  constructor(){
    super()
    this.SeleccionArea =this.SeleccionArea.bind(this);
    this.ImagenChange=this.ImagenChange.bind(this);


    }
  state = {
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

  toggleCollapsed = () => {
   this.setState({
     collapsed: !this.state.collapsed,
   });
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

 handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

//evento que puesta el menu primera vez servira para tomar algun valor inicial, ejemplo id de area ya existente
 handleMenuClick= event => {
  console.log('click', event);

  switch (event.key) {
    case "1":
    this.showModal();
      break;
    case "2":
      break;
    case "3":

      break;
    default:

  }

};

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
//**** Fin de los campos de cada maquinas

//*** Validamos datos de cada maquina
  validar =() =>{
    this.subirDatos();
   }
   validarComponentes =() =>{
     this.subirDatos();
    }


    ImagenChange=(event)=>{
      let reader = new FileReader();
      let file = event.target.files[0];
       reader.onload = (e) => {
         this.setState({
           file: file,
           imagePreviewUrl: reader.result,
         });
         console.log(this.state.file);
       };
       reader.readAsDataURL(file);

    }

    subirImagen=()=>{
    /* var nombre2 = this.state.file.name;
      axios.post(`http://localhost:4000/Subir_ImagenMaquina`,{ nombre:nombre2})
      .then(res => {
           console.log(res.data);
           this.setState({
             ImganeURl: res.data,
           });
           this.subirDatos();

         })
        */

    }
    //Metodo sera eliminado para emplazarlo con un server
   subirDatos=()=>{
     var self = this;
     axios.post(`http://localhost:4000/Subir_Agente`,{NombreA:this.state.NombreA,AreaA:this.state.AreaA,ProfesionA:this.state.ProfesionA,EdadA:this.state.EdadA,CorreoA:this.state.CorreoA, PassA: this.state.PassA})
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



   handleClickMenu = (e) => {
   console.log('click ', e);
   switch (e.key) {
     case "1":
     window.location.href = "/admin/";
       break;
     case "2":
     window.location.href = "/admin/Agentes";

       break;
     case "3":

       break;
     default:

   }

    }






  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const FormItem = Form.Item;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Agente</Menu.Item>

      </Menu>
    );
    return (
      <div className="AppBarMenu">
      <AppBar position="static" style={{backgroundColor:'white',position:'relative',zIndex:1}}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flexGrow: 1,}}>
              Photos
            </Typography>
              <div>
              <Button type="primary" className="botonMenu" onClick={this.toggleCollapsed}>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
              </Button>

              <Dropdown overlay={menu}>
                <Button>
                  Agregar <Icon type="down" />
                </Button>
              </Dropdown>


              <a onClick={() => this.handleItemClick(firebase.auth().signOut() )} href="/">Salir</a>


              </div>
          </Toolbar>
        </AppBar>

        <Modal
                 title="Nuevo Agente"
                 visible={this.state.visible}
                 onOk={this.validar}
                 onCancel={this.handleCancelModal}
                 width="900px"
               >
               <h3>Datos del Agente</h3>
                 <h4>Nombre</h4>
                  <input  onChange={this.NombreA}></input>
                <h4>Area</h4>
                  <input  onChange={this.AreaA}/>

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


      <div style={{ width: 256,position:'absolute', zIndex:2 }}>

        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          onClick={this.handleClickMenu}
          mode="inline"
          theme='light'
          inlineCollapsed={this.state.collapsed}
          style={{height:'50%'}}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Analitics</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Agentes</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Mantenimientos</span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
    );
  }
}




export default BarraLateral;
