import React, { Component } from 'react';
import '../estilo/App.css';
import {ref} from '../const.js'
import { Select } from 'semantic-ui-react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom';
import { Menu, Icon, Button,Form, Radio,Dropdown, Modal } from 'antd';
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
import FormData from 'form-data';
import navbar from './sideBar.js';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

const SubMenu = Menu.SubMenu;

class BarraLateral extends Component {
  constructor(){
    super()
    this.SeleccionArea =this.SeleccionArea.bind(this);
    this.subirDatos =this.subirDatos.bind(this);
    this.subirImagen =this.subirImagen.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleSubmitMantenimiento=this.handleSubmitMantenimiento.bind(this);


    this.ImagenChange=this.ImagenChange.bind(this);
    this.subirMantenimiento=this.subirMantenimiento.bind(this);


    var self = this;
    axios.post(`http://localhost:4000/AreasDisponibles`,{})
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        self.setState({
          AreasDisponibles: res.data.Areas,
        });
      })

    }
  state = {
    collapsed: true,
    auth: true,
    anchorEl: null,
    visible: false,
    NombreM:"",
    AreaM:"",
    MarcaM:"",
    AnoM:"",
    CorrienteM:"",
    contador:0, //se tomara la cantidad de componentes que ya tiene una maquina
    ArrayComponentes: [],
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
    this.setState({ visible3: true });

      break;
    case "3":

      break;
    default:

  }

};

handleCancelModal = (e) => {   //Cuando cierra el primer modal (datos mquina) limpia los campos
   console.log(e);
   this.setState({
     NombreM:"",
     AreaM:"",
     MarcaM:"",
     AnoM:"",
     CorrienteM:"",
     NombreComponente:"",
     visible: false,
     ArrayComponentes: [],
     EstadoActual:"activa",
   });
 }
 handleCancelModal2 = (e) => { //cierra el segundo modal (datos de componentes)
    console.log(e);             // en este caso no se limpian los campos porque se guardan de diferente forma
    this.setState({
      visible2:false,
    });
  }
  handleCancelModal3 = (e) => { //cierra el segundo modal (datos de componentes)
     console.log(e);             // en este caso no se limpian los campos porque se guardan de diferente forma
     this.setState({
       visible3:false,
     });
   }

  showModal = () => {
    this.setState({
      visible: true,
    });


  }
  showModalReporte = () => {
    this.setState({
      visible3: true,
    });
  }

//***** Cambios de estados de los campos de datos de las maquinas
  NombreM =(event) =>{
    this.setState({
      NombreM:event.target.value
    })
  }
  EstadoActual =(event) =>{

    if (event.key=="1") {
      this.setState({
        EstadoActual:"Nueva"
      })
    }
    else {
      this.setState({
        EstadoActual:"Usada"
      })
    }

  }
  AreaM =(event) =>{
    this.setState({
      AreaM:event.target.value
    })
  }
  MarcaM =(event) =>{
    this.setState({
      MarcaM:event.target.value
    })
  }
  AnoM =(event) =>{
    this.setState({
      AnoM:event.target.value
    })
  }
  CorrienteM =(event) =>{
    if (event.key=="1") {
      this.setState({
        CorrienteM:"AC"
      })
    }
    else {
      this.setState({
        CorrienteM:"DC"
      })
    }

  }
//**** Fin de los campos de cada maquinas

//*** Validamos datos de cada maquina

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

      let archivo = this.state.file;
      var user = firebase.auth().currentUser;
      const ref = firebase.storage().ref(`Maquinas/${archivo.name}`)
      const task = ref.put(archivo);
      var self = this;
      var downloadURL;
      var promise = new Promise(
        function(resolve,reject){

            task.on('state_changed',function(snapshot){

            },(error) =>{
              alert(error);
            },()=>{
              task.snapshot.ref.getDownloadURL().then(function(dURL) {
                resolve(downloadURL= dURL);
              });


            })
        })


      promise.then(
        function(url){

      self.subirDatos(downloadURL);
        }
      )

    }
    //Metodo sera eliminado para emplazarlo con un server
   subirDatos=(url)=>{
     var self = this;
     if(this.state.ArrayComponentes.length){
     if(this.state.NombreM.length !=0 && this.state.AreaM.length){
       axios.post(`http://localhost:4000/Subir_MaquinaNueva`, {NombreM:this.state.NombreM,AreaM:this.state.AreaM,MarcaM:this.state.MarcaM,AnoInstalacionM:this.state.AnoM,CorrienteM:this.state.CorrienteM,ArrayComponentes:this.state.ArrayComponentes,Imagen:url})
         .then(res => {
           console.log("lado del cleinte :: "+res.data);
           self.setState({
             visible: false,
             NombreM:"",
             AreaM:"",
             MarcaM:"",
             AnoInstalacionM:"",
             CorrienteM:"",
             ArrayComponentes:[],
             ImganeURl:"",
           });
         })
     }
     else{
       alert("Tienes que llenar todos los campos");
     }
   }
   else {
     alert("Tienes que agrgar por lo menos un componente");

   }


   }
   subirMantenimiento=(e)=>{
     var self = this;
     axios.post(`http://localhost:4000/Subir_MaquinaNueva`,{NombreM:this.state.NombreM,AreaM:this.state.AreaM,MarcaM:this.state.MarcaM,AnoInstalacionM:this.state.AnoM,CorrienteM:this.state.CorrienteM,ArrayComponentes:this.state.ArrayComponentes, imagen: this.state.ImganeURl})
       .then(res => {
         console.log("lado del cleinte :: "+res.data);
         self.setState({
           visible3: false,
         });
       })
   }


   //se toma el nombre de el componente seleccionado para que no pueda ser modificado
   AgregarComponente=component=>{

     this.setState({
       visible2: true,
       NombreComponente:component,
     });
   }

//guardamos cada componente para cargarlo en la lista
   handleSubmit = (e) => {
     e.preventDefault()
     var ArrayAux = [];
    this.state.ArrayComponentes.push({Tipo:this.state.NombreComponente,Modelo_Componente:this.modeloC.value,FechaI_Componente:this.fechaC.value,Estado_Componente:this.NuevaC.value,Corriente_Componente:this.CorrienteC.value});

     this.modeloC.value = "";
     this.fechaC.value ="";
     this.NuevaC.value = "";
     this.CorrienteC.value = "";
     this.setState({
       visible2: false,
       NombreComponente:"",
     });


   }



   handleSubmitMantenimiento =(e)=>{
     var self = this;
     axios.post(`http://localhost:4000/Subir_Mantenimiento`,{TipoMan:this.TipoMan.value,Costo:this.Costo.value,Encargado:this.Encargado.value,Tiempo:this.Tiempo.value,Remplazo:this.Remplazo.value,Nueva:this.Nueva.value,Area:this.AreaMtm.value,Maquina:this.MaquinaMtm.value})
       .then(res => {
         self.setState({
           visible3: false,
         });
       })
   }


  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const FormItem = Form.Item;
    const Corri = (
        <Menu onClick={this.CorrienteM}>
        <Menu.Item key="1">AC</Menu.Item>
        <Menu.Item key="2">DC</Menu.Item>
        </Menu>
      );
      const EstadoM = (
          <Menu onClick={this.EstadoActual}>
          <Menu.Item key="1">Nueva</Menu.Item>
          <Menu.Item key="2">Usada</Menu.Item>
          </Menu>
        );


    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Maquina</Menu.Item>
        <Menu.Item key="2">Mantenimiento</Menu.Item>
      </Menu>
    );
    return (
      <div className="AppBarMenu">
      <div>

        <SideNav>
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="Home">

          <NavItem>
          <Link to="/user/">
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
          <Link to="/user/Perfil">
            <NavItem >
              <NavIcon>
                <i class="material-icons" style={{ fontSize: '2em' }}>person</i>
              </NavIcon>
              <NavText>
                Perfil
              </NavText>
            </NavItem>
          </Link>
          </NavItem>


          <NavItem>
          <Link to="/user/Mantenimientos">
            <NavItem>
              <NavIcon>
                <i class="material-icons" style={{ fontSize: '2em' }}>directions_boat </i>
              </NavIcon>
              <NavText style={{fontSize:'1em'}}>
                Envios
              </NavText>
            </NavItem>
          </Link>
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

      </div>
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
                 title="Nueva máquina"
                 visible={this.state.visible}
                 onOk={this.subirImagen}
                 onCancel={this.handleCancelModal}
                 width="900px"
               >
               <h3>Datos de la maquina</h3>
                 <h4>Nombre</h4>
                 <input style={{width:'35%'}}  onChange={this.NombreM}></input><br/>
                 <br/><h4>Area</h4>
                 <input  style={{width:'35%'}} list="Areas" onChange={this.AreaM}/>
                 <datalist id="Areas">
                 Seleccionar
                 {this.state.AreasDisponibles.map((it,key)=>{
                   return(<option value={it}></option>)})}
                 </datalist><br/>
                 <br/><h4>Marca</h4>
                 <input  style={{width:'35%'}} onChange={this.MarcaM}></input><br/>
                 <h4>Año de instalacion</h4>
                 <input  style={{width:'35%'}} type="month" onChange={this.AnoM}></input>
                 <div className="dropC">
                 <br/>
                 <Dropdown  style={{width:'35%'}} id="dropC"  overlay={Corri}>
                     <a className="ant-dropdown-link">
                        <strong>Tipo corriente</strong>

                     </a>
                  </Dropdown>

                  </div>

                  <br/>
<strong>Año de instalacion</strong>
                  <Dropdown id="dropC" value={this.EstadoM} overlay={EstadoM}>
                      <a className="ant-dropdown-link">
                         <strong>estado de la máquina</strong><Icon type="down" />
                      </a>
                   </Dropdown><br/><br/>
                 <h4>Subir Imagen</h4>
                 <input type='file' onChange={this.ImagenChange.bind(this)}/>


                 <div className="agregarComponentes">
                 <Button className="botonplus" onClick={() => this.AgregarComponente("Motor_electrico")}>
                   Motor <br/>Electrico <br/><Icon type="plus" />
                 </Button>
                  <Button className="botonplus" onClick={() => this.AgregarComponente("Motor_electrico")}>
                    Motor <br/>Electrico <br/><Icon type="plus" />
                  </Button>
                  <Button className="botonplus" value onClick={() => this.AgregarComponente("Rodamiento")}>
                    Rodamiento <br/><Icon type="plus" />
                  </Button>
                  <Button className="botonplus" onClick={() => this.AgregarComponente("Indicador_VF")}>
                    Indicadores<br/> V/F<br/> <Icon type="plus" />
                  </Button>
                  <Button className="botonplus" onClick={() => this.AgregarComponente("Luces")}>
                    Luces <br/><Icon type="plus" />
                  </Button>

                 </div>
                 <div>
                 </div>

                 <div className='lista-Componentes'>
                   <List horizontal style={{textAlign:'center'}}>
                      {this.state.ArrayComponentes.map((it,key)=>{
                        var desResumen=it.Tipo;
                        return(<Carta datos={it} description={desResumen} key={key}/>)
                      })}
                  </List>
                 </div>

       </Modal>
       <Modal
                title="Nuevo Componente"
                visible={this.state.visible2}
                onOk={this.handleSubmit}
                onCancel={this.handleCancelModal2}
                width="500px"
                footer={[
                    null, null,
                ]}
              >

              <h3>Datos del componentes</h3>
              <Form  style={{width:'80%'}}onSubmit={this.handleSubmit}>
              <FormItem>

              <h5>Nombre: {this.state.NombreComponente}</h5>
               <br/><h5>Modelo</h5>
               <input  style={{width:'100%'}} ref={(modeloC) => this.modeloC = modeloC} required/>
               <br/><h5>fecha de instalacion</h5>
               <input style={{width:'100%'}} ref={(fechaC) => this.fechaC = fechaC} required/>
               <br/><h5>Pieza nueva o usada</h5>
               <input  style={{width:'100%'}}ref={(NuevaC) => this.NuevaC = NuevaC}  required/>
               <br/><h5>Tipo de corriente</h5>
               <input  style={{width:'100%'}} ref={(CorrienteC) => this.CorrienteC = CorrienteC}  required/>
               </FormItem>
               <FormItem>
               <Button id="btnaceptar" htmlType="submit" bsSize="large" >Aceptar</Button>
               </FormItem>

               </Form>


      </Modal>

      <Modal
               title="Nuevo Mantenimiento"
               visible={this.state.visible3}
               onOk={this.handleSubmitReporte}
               onCancel={this.handleCancelModal3}
               width="500px"
               footer={[
                   null, null,
               ]}
             >

             <h3>Datos del mantenimeinto</h3>
             <Form onSubmit={this.handleSubmitMantenimiento}>
             <FormItem>

             <h5>Selecciona Area</h5>
             <input list="Areas" onChange={this.SeleccionArea} ref={(AreaMtm) => this.AreaMtm = AreaMtm}/>
             <datalist id="Areas">
             {this.state.AreasDisponibles.map((it,key)=>{
               return(<option value={it}></option>)})}

             </datalist>
             <h5>Selecciona Maquina</h5>
             <input list="Areas2" ref={(MaquinaMtm) => this.MaquinaMtm = MaquinaMtm} />
             <datalist id="Areas2">
             {this.state.MaquinasPorArea.map((it,key)=>{
               return(<option value={it}></option>)})}

             </datalist>

              <h5>Tipo de mantenimiento</h5>
              <input placeholder="correctivo/preventivo"  ref={(TipoMan) => this.TipoMan = TipoMan} required/>
              <h5>Costo</h5>
              <input  ref={(Costo) => this.Costo = Costo} required/>
              <h5>Encargado</h5>
              <input  ref={(Encargado) => this.Encargado = Encargado}  required/>
              <h5>Tiempo</h5>
              <input  ref={(Tiempo) => this.Tiempo = Tiempo}  required/>
              <h5>Remplazo de componente?</h5>
              <input  ref={(Remplazo) => this.Remplazo = Remplazo}  required/>
              <h5>Estado de pieza remplazada</h5>
              <input  placeholder="nueva/usada" ref={(Nueva) => this.Nueva = Nueva}  required/>
              </FormItem>
              <FormItem>
              <Button id="btnaceptar" htmlType="submit" bsSize="large" >Aceptar</Button>
              </FormItem>

              </Form>


     </Modal>

    </div>
    );
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


export default BarraLateral;
