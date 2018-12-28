import React, { Component } from 'react';
import { Image,Icon,Grid,Container,Header,Divider,List,Select,Accordion,Card } from 'semantic-ui-react'
import { Menu, Button,Form, Radio,Dropdown, Modal,FormItem } from 'antd';
import 'antd/dist/antd.css';
import '../estilo/item-maquina.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Route,Link} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import axios from 'axios';


const months = ["Enero","Febrero","Marzo"];


class ItemMaquina extends Component {
  constructor(props){

    super(props)
    this.state = {
      activeIndex: 0,
      AddElement:"",
      RemoveElement:"",
      MtoPorMaquina:[],
      Maquina:{},
      visible:false,
      Componentes:{},
      CompoMaquina:{},
      VariablesF:[],
      Indicadores:[],
      Luces:[],
      Rodamientos:[],
      MotoresE:[],
   }
   this.Actualizar =this.Actualizar.bind(this);
   this.Add =this.Add.bind(this);
   this.Eliminar =this.Eliminar.bind(this);
   this.handleCancelModal =this.handleCancelModal.bind(this);
   this.handleCancelModalRemove =this.handleCancelModalRemove.bind(this);

   this.handleSubmit =this.handleSubmit.bind(this);






  }


  Add=e=>{
  this.setState({
    visible : true,
    AddElement:e,
   })

}
Eliminar=e=>{
  this.setState({
    RemoveElement:e,
    visible2:true,

  })


}
handleSubmit = (e) => {
  e.preventDefault()
  var self = this;
var  ML=JSON.parse(localStorage.getItem('Maquina'));
var  CL=JSON.parse(localStorage.getItem('Componentes'));
  axios.post(`http://localhost:4000/Subir_Componente`,{Maquina:ML.Nombre,Area:ML.Area,Tipo:this.state.AddElement,Modelo_Componente:this.modeloC.value,FechaI_Componente:this.fechaC.value,Estado_Componente:this.NuevaC.value,Corriente_Componente:this.CorrienteC.value})
    .then(res => {
      self.modeloC.value = "";
      self.fechaC.value ="";
      self.NuevaC.value = "";
      self.CorrienteC.value = "";
      self.setState({
        visible: false,
        AddElement:"",
      });
      window.location.reload();
        })

}
handleSubmitRevome = (e) => {
  e.preventDefault()
  var self = this;
var  ML=JSON.parse(localStorage.getItem('Maquina'));
var  CL=JSON.parse(localStorage.getItem('Componentes'));
  axios.post(`http://localhost:4000/Eliminar_Componente`,{Maquina:ML.Nombre,Area:ML.Area,Tipo:this.state.RemoveElement, key:this.key.value})
    .then(res => {
      self.key.value = "";
      self.setState({
        visible2: false,
        RemoveElement:"",
      });
      window.location.reload();
        })

}

handleCancelModal(){
  this.setState({
    visible : false,
   })
}
handleCancelModalRemove(){
  this.setState({
    visible2 : false,
   })
}


  componentDidMount() {
    var ML={};
    var CL={};


       if(this.props.location.Maquina && this.props.location.Componentes){

         ML=JSON.parse(localStorage.getItem('Maquina'));
        CL=JSON.parse(localStorage.getItem('Componentes'));
         if (this.props.location.Maquina===ML && this.props.location.Componentes===CL) {
           this.setState({
              Maquina: this.props.location.Maquina,
              Componentes:this.props.location.Componentes,
            })
         }
         else{
           this.setState({
              Maquina: this.props.location.Maquina,
              Componentes:this.props.location.Componentes,
            })
            if (JSON.parse(localStorage.getItem('Maquina')) && JSON.parse(localStorage.getItem('Componentes'))) {
              localStorage["Maquina"] = JSON.stringify(this.props.location.Maquina);

              localStorage["Componentes"] = JSON.stringify(this.props.location.Componentes);
            }
            else {
              localStorage.setItem('Maquina',JSON.stringify(this.props.location.Maquina));
              localStorage.setItem('Componentes',JSON.stringify(this.props.location.Componentes));
            }
              this.Actualizar(this.props.location.Maquina,this.props.location.Componentes);
         }
       }
       else{
         ML=JSON.parse(localStorage.getItem('Maquina'));
        CL=JSON.parse(localStorage.getItem('Componentes'));
         this.setState({
           Maquina: ML,
           Componentes:CL,
         });
         if (ML && CL) {
           this.Actualizar(ML,CL);
         }
       }





}

Actualizar(ML,CL){
var self=this;
  axios.post(`http://localhost:4000/MtoMaquina`,{Area:ML.Area,Maquina:ML.Nombre})
    .then(res => {
      console.log("lado del cleinte :: "+res.data);
      this.setState({
        MtoPorMaquina: res.data.MantenimientosPorMaquina,

      });
    })

    axios.post(`http://localhost:4000/CompoMaquina`,{Area:ML.Area,Maquina:ML.Nombre})
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        var a = res.data.ComponentesPorMaquina[0].Componentes.Indicador_VF;
        self.setState({
          CompoMaquina: res.data.ComponentesPorMaquina,
        });
        if (res.data.ComponentesPorMaquina[0].Componentes.Indicador_VF) {
          var a =[];
          var obj = res.data.ComponentesPorMaquina[0].Componentes.Indicador_VF;
          Object.keys(obj).forEach(function(key){
            a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
            })
          self.setState({
            VariablesF: a,
          });
        }
        if (res.data.ComponentesPorMaquina[0].Componentes.Luces) {
          var a =[];
          var obj = res.data.ComponentesPorMaquina[0].Componentes.Luces;
          Object.keys(obj).forEach(function(key){
            a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
            })
          self.setState({
            Luces: a,
          });
        }
        if (res.data.ComponentesPorMaquina[0].Componentes.Motor_electrico) {
          var a =[];
          var obj = res.data.ComponentesPorMaquina[0].Componentes.Motor_electrico;
          Object.keys(obj).forEach(function(key){
            a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
            })
          self.setState({
            MotoresE: a,
          });
        }
        if (res.data.ComponentesPorMaquina[0].Componentes.Rodamiento) {
          var a =[];
          var obj = res.data.ComponentesPorMaquina[0].Componentes.Rodamiento;
          Object.keys(obj).forEach(function(key){
            a = a.concat([{key:key,Tipo:obj[key].Tipo,Modelo:obj[key].Modelo,FechaInstalacion:obj[key].FechaInstalacion,EstadoPieza:obj[key].EstadoPieza,CorrienteComponente:obj[key].CorrienteComponente}]);
            })
          self.setState({
            Rodamientos: a,
          });
        }
      })
}



  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state
      let open=true;
      let open2=true;


    return (

     <div className='contenido-card'>
      <Modal
              title="Nuevo Componente"
              visible={this.state.visible}
              onOk={this.handleSubmit}
              onCancel={this.handleCancelModal}
              width="300px"
              footer={[
                  null, null,
              ]}
            >

            <h3>Datos del componentes</h3>
            <Form onSubmit={this.handleSubmit}>

                <h5>Tipo</h5>
                <label>{this.state.AddElement}</label>
                <h5>Modelo</h5>
                <input  ref={(modeloC) => this.modeloC = modeloC} required/>
                <h5>fecha de instalacion</h5>
                <input  ref={(fechaC) => this.fechaC = fechaC} required/>
                <h5>Pieza nueva o usada</h5>
                <input  ref={(NuevaC) => this.NuevaC = NuevaC}  required/>
                <h5>Tipo de corriente</h5>
                <input  ref={(CorrienteC) => this.CorrienteC = CorrienteC}  required/>
                <br/>
                <Button id="btnaceptar" htmlType="submit" bsSize="large" >Aceptar</Button>
             </Form>


      </Modal>
      <Modal
              title="Eliminar Componente"
              visible={this.state.visible2}
              onOk={this.handleSubmit}
              onCancel={this.handleCancelModalRemove}
              width="300px"
              footer={[
                  null, null,
              ]}
            >

            <h3>LLave para eliminar</h3>
            <Form onSubmit={this.handleSubmitRevome}>

                <h5>Tipo</h5>
                <label>{this.state.RevomeElement}</label>
                <h5>Llave</h5>
                <input  ref={(key) => this.key = key} required/>
                <br/>
                <Button id="btnaceptar" htmlType="submit" bsSize="large" >Aceptar</Button>
             </Form>


      </Modal>
    <List>
    <Card id ='CardSoloItem' color='grey' fluid >
      <Card.Content>
       <Image floated='left'style={{marginRight:"10%"}} size='medium' src= {this.state.Maquina.Imagen} />
        <Card.Header >{this.state.Maquina.Nombre}</Card.Header>
        <Card.Meta>{this.state.Maquina.Marca} </Card.Meta>
        <Card.Description>Area: {this.state.Maquina.Area}</Card.Description>
        <Card.Description>año de instalacion : {this.state.Maquina.AnoInstalacion}</Card.Description>
      </Card.Content>
    </Card>


      <Divider style={{width:'75%',margin:'auto',paddingTop:'0'}} />
    <List.Item>
    <div className='historial-header'>
      <Header as='h3' icon='calendar outline' content='Historial de mantenimientos'/>
    </div>
    </List.Item>
    <List.Item>
      <div className='filtrarFechas'>
        <Select placeholder='año' options={months} />
        <Select placeholder='Mes' options={months} />
      </div>
    </List.Item>
      { open ?
        <div className='contenido-card'>
          <List divided verticalAlign='middle' size="big">
            {this.state.MtoPorMaquina.map((it,key)=>{
              return(<Carta datos={it}  key={key}/>)
            })}
          </List>
        </div> :
        <div className='contenido-card'>
        </div>
      }
      <List.Item>
        <div className="contenedorGrid">
          <Grid>
          <Header id="HeaderComponentes" as='h5' icon='globe' content='Variables Fisicas'/>
          <div className="botonesAdd">
          <Icon onClick={() => this.Add("Indicador_VF")} name='add' size='big' />
          <Icon onClick={() => this.Eliminar("Indicador_VF")} name='delete' size='big' />
          </div>
            <Grid.Row verticalAlign='top'>
              {this.state.VariablesF.map((it,key)=>{
                return(<CartaCompo datos={it}  key={key}/>)
              })}
            </Grid.Row>
            <div className="divid"></div>
            <Header id="HeaderComponentes" as='h5' icon='cogs' content='Rodamientos'/>
            <div className="botonesAdd">
            <Icon onClick={() => this.Add("Rodamiento")} name='add' size='big' />
            <Icon onClick={() => this.Eliminar("Rodamiento")} name='delete' size='big' />
            </div>
            <Grid.Row verticalAlign='top'>
              {this.state.Rodamientos.map((it,key)=>{
                return(<CartaCompo datos={it}  key={key}/>)
              })}
            </Grid.Row>
            <div className="divid"></div>
            <Header id="HeaderComponentes" as='h5' icon='idea' content='Luces'/>
            <div className="botonesAdd">
            <Icon onClick={() => this.Add("Luces")} name='add' size='big' />
            <Icon onClick={() => this.Eliminar("Luces")} name='delete' size='big' />
            </div>
            <Grid.Row verticalAlign='top'>
              {this.state.Luces.map((it,key)=>{
                return(<CartaCompo datos={it}  key={key}/>)
              })}
            </Grid.Row>
            <div className="divid"></div>
            <Header id="HeaderComponentes" as='h5' icon='microchip' content='Motores Electricos'/>
            <div className="botonesAdd">
            <Icon onClick={() => this.Add("Motor_electrico")} name='add' size='big' />
            <Icon onClick={() => this.Eliminar("Motor_electrico")} name='delete' size='big' />
            </div>
            <Grid.Row verticalAlign='top'>
              {this.state.MotoresE.map((it,key)=>{
                return(<CartaCompo datos={it}  key={key}/>)
              })}
            </Grid.Row>
            <div className="divid"></div>
          </Grid>
        </div>
      </List.Item>


    </List>
      </div>

    );
  }
}

class Carta extends Component{
  render(){
    return(
      <List.Item className="itemLista">
        <List.Content>
          <List.Header style={{fontSize: "20px"}}>{this.props.datos.Encargado}</List.Header>
          <List.Description as='a'>Area : {this.props.datos.Area}</List.Description>
          <List.Description as='a'>Tiempo  : {this.props.datos.Tiempo} minutos </List.Description>
          <List.Description as='a'>Costo : {this.props.datos.Costo}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}
class CartaCompo extends Component{


  render(){


    return(
    <div className='cardCompo'>
      <Grid.Column>
          <br/>
          <Header as='h3' style={{textAlign:'center',paddingTop:'2vh'}}>
          {this.props.datos.Tipo}
          </Header>
          <Header as='h2' style={{textAlign:'center'}}>
          <Header.Content>{this.props.datos.Modelo}</Header.Content>
          </Header>
        Estado de la pieza :  {this.props.datos.EstadoPieza}<br/>
        id  :  {this.props.datos.key}
      </Grid.Column><br/>
      </div>
    );
  }
}



export default ItemMaquina;
