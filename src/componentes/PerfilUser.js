import React, { Component } from 'react';
import { Image,Icon,Container,Header,Divider,List,Card,Button,Modal,Form,Select,Accordion } from 'semantic-ui-react'
import '../estilo/Mantenimientos.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Route,Link} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BarraLateral from '../componentes/sideBar.js';
import * as firebase from 'firebase'

import axios from 'axios';


const months = ["Enero","Febrero","Marzo"];


class AgentesDisponibles extends Component {
  constructor(props){

    super(props)

    var self = this;
    var user = firebase.auth().currentUser;
    axios.post(`http://localhost:4000/PerfilUser`,{Id:user.uid})
      .then(res => {

        console.log("lado del cleinte :: "+res.data);
        this.setState({
          Agente:res.data.Agente[0],
        })

      })





  }
  state = {
    activeIndex: 0,
    Agente:[],
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
        <Card style={{width:'40%', minWidth:'250px', margin:' 1em 2.5em'}}>
          <Card.Content>
          <Card.Header>Datos generales</Card.Header><br/>
            <Image circular floated='right' size='small' style={{marginLeft: 'auto',marginRight: 'auto',textAlign: 'center'}}src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />

            <Card.Meta>Nombre</Card.Meta>
            <Card.Header>{this.state.Agente.displayName}</Card.Header><br/>
            <Card.Meta>E-mail</Card.Meta>
            <Card.Header>{this.state.Agente.email}</Card.Header><br/>
            <Card.Meta>Profesion</Card.Meta>
            <Card.Header>{this.state.Agente.Profesion}</Card.Header><br/>
            <Card.Meta>Edad</Card.Meta>
            <Card.Header>{this.state.Agente.Edad}</Card.Header><br/>


            </Card.Content>

     </Card>
      </div>
    </div>
    );
  }
}







export default AgentesDisponibles;
