import React, { Component } from 'react';
import { Image,Icon,Container,Header,Divider,List,Card,Button,Modal,Form,Select,Accordion } from 'semantic-ui-react'
import '../estilo/MantenimientosPendientes.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Route,Link} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BarraLateral from '../componentes/sideBarAdmin.js';

import axios from 'axios';




class AgentesDisponibles extends Component {
  constructor(props){

    super(props)

    var self = this;
    axios.post(`http://localhost:4000/Fallas`)
      .then(res => {

        console.log("lado del cleinte :: "+res.data);
        this.setState({
          AgentesDis:res.data.Fallas,
        })

      })





  }
  state = {
    activeIndex: 0,
    AgentesDis:[],
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
    <div>
    <BarraLateral/>
     <div className='contenido-card'>

    <List divided verticalAlign='middle' size="big">

    {this.state.AgentesDis.map((it,key)=>{
      return(<Carta datos={it}  key={key}/>)
    })}
    </List>
      </div>
    </div>
    );
  }
}



class Carta extends Component{

  constructor(){
    super();

    this.state={
      open: false,
      openfinalizado: false,
      dimmer:true,
    }
  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  showFinalizado = dimmer => () => this.setState({ dimmer, openfinalizado: true })

  close = () => this.setState({ open: false, openfinalizado: false })

  render(){

    return(

      <div>

        <Card style={{borderRadius:'2vh', width:'95%', minWidth:'250px', margin:' 1em 2.5em'}}>
          <Card.Content>

          <div style={{width:"70%", display:"inline-flex"}}>
            <div>
              <Card.Meta>Area</Card.Meta>
              <Card.Header>{this.props.datos.area}</Card.Header><br/>

            </div>
            <div style={{paddingLeft:"30%"}}>
              <Card.Meta>Maquina</Card.Meta>
              <Card.Header>{this.props.datos.maquina}</Card.Header><br/>
            </div>
            <div style={{paddingLeft:"30%"}}>
              <Card.Meta>Componente</Card.Meta>
              <Card.Header>{this.props.datos.componente}</Card.Header><br/>
            </div>


            </div>



          </Card.Content>

        </Card>

      </div>
    )
  }
}




export default AgentesDisponibles;
