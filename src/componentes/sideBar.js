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
    visibleMaquina: false,
    visibleMto:false,
    visibleReporte:false,
    auth: true,
    anchorEl: null,
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
    ComponentesPorMaquina:[],
    AreaMto:"",
    VariablesF:[],
    Indicadores:[],
    Luces:[],
    Rodamientos:[],
    MotoresE:[],
    TipoMto:"",
    Correctivo:"",
    Preventivo:"",
    EstadoPiezaMto:"",
    MetodoMto:"",
      }

  }

  handleItemClick=e=>{

  }

  SeleccionMaquina =(e)=>{
    var self = this;
    if (this.state.AreaMto ) {
      axios.post(`http://localhost:4000/CompoMaquina`,{Area:this.state.AreaMto,Maquina:e.target.value})
        .then(res => {
          console.log("lado del cleinte :: "+res.data);
          if(res.data.ComponentesPorMaquina[0].Componentes){
          var a=[];



          if (res.data.ComponentesPorMaquina[0].Componentes.Indicador_VF) {
            var obj = res.data.ComponentesPorMaquina[0].Componentes.Indicador_VF;
            Object.keys(obj).forEach(function(key){
              a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
              })

          }
          if (res.data.ComponentesPorMaquina[0].Componentes.Luces) {
            var obj = res.data.ComponentesPorMaquina[0].Componentes.Luces;
            Object.keys(obj).forEach(function(key){
              a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
              })

          }
          if (res.data.ComponentesPorMaquina[0].Componentes.Motor_electrico) {
            var obj = res.data.ComponentesPorMaquina[0].Componentes.Motor_electrico;
            Object.keys(obj).forEach(function(key){
              a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
              })

          }
          if (res.data.ComponentesPorMaquina[0].Componentes.Rodamiento) {
            var obj = res.data.ComponentesPorMaquina[0].Componentes.Rodamiento;
            Object.keys(obj).forEach(function(key){
              a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
              })

          }
          self.setState({
            VariablesF: a,
          });
        }

        })
    }
    else {
      alert("selecciona primero una Area");
    }

  }

  SeleccionArea=(e)=>{
    var self = this;
    var area = e.target.value
    axios.post(`http://localhost:4000/MaquinasDisponibles`,{AreaID:e.target.value})
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        self.setState({
          MaquinasPorArea: res.data.MaquinasPorArea,
          AreaMto:area,
        });
      })

  }

  handleNuevaMaquina = () => {
    this.setState({
      visibleMaquina: true,
    });
  }
  handleNuevoMto = () => {
    this.setState({
      visibleMto: true,
    });
  }

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
       visibleMaquina: false,
       visibleMto:false,
       visibleReporte:false,
       ArrayComponentes: [],
       EstadoActual:"activa",
     });
   }
   handleCancelModal2 = (e) => { //cierra el segundo modal (datos de componentes)
      console.log(e);             // en este caso no se limpian los campos porque se guardan de diferente forma
      this.setState({
        visibleReporte:false,
      });
    }
    handleCancelModal3 = (e) => { //cierra el segundo modal (datos de componentes)
       console.log(e);             // en este caso no se limpian los campos porque se guardan de diferente forma
       this.setState({
         visibleMto:false,
         Preventivo:"",
         Correctivo:"",
          EstadoPiezaMto:"",
          TipoMto:"",
         MetodoMto:"",
       });
       if (this.ComponenteMtm) {
            this.ComponenteMtm.value = "";
       }
       if (this.Costo) {
         this.Costo.value = "";

       }
       if (this.Tiempo) {
         this.Tiempo.value="";
       }
       if (this.Remplazo) {
         this.Remplazo.value="";
       }
       if (this.AreaMtm) {
         this.AreaMtm.value="";
       }
       if (this.MaquinaMtm) {
         this.MaquinaMtm.value="";
       }





     }

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
     NuevaC =(event) =>{

       if (event.key=="1") {
         this.setState({
           NuevaC:"Nueva"
         })
       }
       else {
         this.setState({
           NuevaC:"Usada"
         })
       }
     }
     CorrienteC =(event) =>{

       if (event.key=="1") {
         this.setState({
           CorrienteC:"AC"
         })
       }
       else {
         this.setState({
           CorrienteC:"DC"
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
              visibleReporte: false,
              visibleMaquina: false,
              visibleMto: false,
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



    //se toma el nombre de el componente seleccionado para que no pueda ser modificado
    AgregarComponente=component=>{

      this.setState({
        visibleReporte: true,
        NombreComponente:component,
      });
    }

 //guardamos cada componente para cargarlo en la lista
    handleSubmit = (e) => {
      e.preventDefault()
      var ArrayAux = [];
      var a =
     this.state.ArrayComponentes.push({Tipo:this.state.NombreComponente,Modelo_Componente:this.modeloC.value,FechaI_Componente:this.fechaC.value,Estado_Componente:this.state.NuevaC,Corriente_Componente:this.state.CorrienteC});

      this.modeloC.value = "";
      this.fechaC.value ="";
      this.NuevaC.value = "";
      this.CorrienteC.value = "";
      this.setState({
        visibleReporte: false,
        NombreComponente:"",
      });

    }
    handleSubmitMantenimiento =(e)=>{
      var date = new Date();
      var fecha = (date.getFullYear()+'/'+date.getMonth()+1)+'/'+date.getDate();
      var self = this;
      var user =firebase.auth().currentUser;
      axios.post(`http://localhost:4000/Subir_Mantenimiento`,{
        ObjetivoMtoPreventivo:this.state.Preventivo,
        ObjetivoMtoCorrectivo:this.state.Correctivo,
        Componente:this.ComponenteMtm.value,
        TipoMan:this.state.TipoMto,
        Costo:this.Costo.value,
        Encargado:user.email,
        UidEncargado: user.uid,
        Tiempo:this.Tiempo.value,
        Nueva:this.state.EstadoPiezaMto,
        Area:this.AreaMtm.value,
        Maquina:this.MaquinaMtm.value,
        MetodoMto:this.state.MetodoMto,
        FechaDeSubida:fecha,})
        .then(res => {
          self.setState({
            visibleMto: false,
          });
        })
    }

    handleChangeTipoMto = (e) => {
        this.setState({
          TipoMto: e,

        });

    }
handleChangeEstado = (e) => {
  this.setState({
    EstadoPiezaMto: false,


  });

}
handleChangeCorrectivo = (e) => {
  this.setState({
    Correctivo: e,

  });

}
handleChangePreventivo = (e) => {
  this.setState({
    Preventivo: e,

  });
}
  handleChangeMetodo = (e) => {
    this.setState({
      MetodoMto: e,

    });


}



  render(){
      const FormItem = Form.Item;

    const Corri = (
        <Menu onClick={this.CorrienteM}>
        <Menu.Item key="1">AC</Menu.Item>
        <Menu.Item key="2">DC</Menu.Item>
        </Menu>
      );
      const CorrienteC = (
          <Menu onClick={this.CorrienteC}>
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
        const NuevaC = (
            <Menu onClick={this.NuevaC}>
            <Menu.Item key="1">Nueva</Menu.Item>
            <Menu.Item key="2">Usada</Menu.Item>
            </Menu>
          );

    return(
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
          <i class="material-icons" style={{ fontSize: '2em' }}>content_paste </i>
        </NavIcon>
        <NavText style={{fontSize:'1em'}}>
          Mantenimientos
        </NavText>
      </NavItem>
    </Link>
    </NavItem>

    <NavItem  onClick={this.handleNuevoMto}>
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>create</i>
        </NavIcon>
        <NavText style={{fontSize:'1em'}}>
          Nuevo Mto.
        </NavText>
    </NavItem>

    <NavItem onClick={this.handleNuevaMaquina}>
        <NavIcon>
          <i class="material-icons" style={{ fontSize: '2em' }}>memory </i>
        </NavIcon>
        <NavText style={{fontSize:'1em'}}>
          Nueva Maquina
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
             title="Nueva máquina"
             visible={this.state.visibleMaquina}
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
             <Dropdown  style={{width:'35%'}} id="dropC" overlay={Corri}>
                 <a className="ant-dropdown-link">
                    <strong>Tipo corriente</strong><Icon type="down" />
                 </a>
              </Dropdown>
              </div>
              <br/>

              <Dropdown id="dropC" overlay={EstadoM}>
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
            visible={this.state.visibleReporte}
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
           <input style={{width:'100%'}} type="month"  ref={(fechaC) => this.fechaC = fechaC} required/>
           <br/><h5>Pieza nueva o usada</h5>
           <Dropdown id="dropC" overlay={NuevaC}>
               <a className="ant-dropdown-link">
                  <strong>estado de la máquina</strong><Icon type="down" />
               </a>
            </Dropdown><br/><br/>
           <br/><h5>Tipo de corriente</h5>
           <Dropdown  style={{width:'35%'}} id="dropC" overlay={CorrienteC}>
               <a className="ant-dropdown-link">
                  <strong>Tipo corriente</strong><Icon type="down" />
               </a>
            </Dropdown>
           </FormItem>
           <FormItem>
           <Button id="btnaceptar" htmlType="submit" bsSize="large" >Aceptar</Button>
           </FormItem>

           </Form>


  </Modal>

  <Modal
           title="Nuevo Mantenimiento"
           visible={this.state.visibleMto}
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
         <input list="Areas2" onChange={this.SeleccionMaquina} ref={(MaquinaMtm) => this.MaquinaMtm = MaquinaMtm} />
         <datalist id="Areas2">
         {this.state.MaquinasPorArea.map((it,key)=>{
           return(<option value={it}></option>)})}

         </datalist>

         <h5>Selecciona un Componente</h5>
         <input list="Componentes" ref={(ComponenteMtm) => this.ComponenteMtm = ComponenteMtm} />
         <datalist id="Componentes">
         {this.state.VariablesF.map((it,key)=>{
           return(<option value={it.Tipo+"/"+it.key} label={it.Modelo}></option>)})
         }
         </datalist>
         <h5>Tipo de Mantenimiento</h5>
         <Select  style={{ width: 160 }} onChange={this.handleChangeTipoMto}>
              <Option value="Correctivo">Correctivo</Option>
              <Option value="Preventivo">Preventivo</Option>
          </Select>
          {this.state.TipoMto =="Correctivo" ?
          <div>
            <h5>Objetivo de Mantenimiento Correctivo</h5>
            <Select  style={{ width: 180 }} onChange={this.handleChangeCorrectivo} >
                 <Option value="RemplazoPieza">Remplazo Pieza</Option>
                 <Option value="MismaPieza">Misma Pieza</Option>
                 <Option value="RemplazoPiezaParcial">Remplazo Pieza Parcial</Option>

            </Select>
          </div>
          :
          <div>
            <h5>Objetivo de Mantenimiento Preventivo</h5>
            <Select  style={{ width: 120 }} onChange={this.handleChangePreventivo} >
                 <Option value="Preservar">Preservar</Option>
                 <Option value="NoPolvo">No Polvo</Option>
             </Select>
          </div>
          }
         <h5>Costo</h5>
          <input  ref={(Costo) => this.Costo = Costo} required/>
          <h5>Tiempo</h5>
          <input  ref={(Tiempo) => this.Tiempo = Tiempo} placeholder="min" required/>

          <h5>Estado de pieza remplazada</h5>
          <Select  style={{ width: 120 }} onChange={this.handleChangeEstado} >
               <Option value="Nueva">Nueva</Option>
               <Option value="Usada">Usada</Option>
           </Select>
           </FormItem>
           <h5>Metodo</h5>
           <Select  style={{ width: 120 }} onChange={this.handleChangeMetodo} >
                <Option value="Visual">Visual</Option>
                <Option value="Manual">Manual</Option>
            </Select>
          <FormItem>
          <Button id="btnaceptar" htmlType="submit" bsSize="large" >Aceptar</Button>
          </FormItem>

          </Form>


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
