import React, { Component } from 'react';
import { Image,Icon,Container,Header,Divider,List,Select,Accordion } from 'semantic-ui-react'
import '../estilo/Mantenimientos.css';
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


class MantenimientoItem extends Component {
  constructor(props){

    super(props)

    var self = this;
    axios.post(`http://localhost:4000/TomarHistorial`)
      .then(res => {

        console.log("lado del cleinte :: "+res.data);
        this.setState({
          ArrayMantenimientos:res.data.Mantenimientos,
        })

      })





  }
  state = {
    activeIndex: 0,
    ArrayMantenimientos:[],
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
     <div className='contenido-card'>

    <List divided verticalAlign='middle' size="big">

    {this.state.ArrayMantenimientos.map((it,key)=>{
      return(<Carta datos={it.data}  key={key}/>)
    })}
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
        <List.Header style={{fontSize: "20px"}}>Maquina : {this.props.datos.Maquina}</List.Header>
        <List.Description as='a'>Area : {this.props.datos.Area}</List.Description>
        <List.Description as='a'>Encargado : {this.props.datos.Encargado}</List.Description>
        <List.Description as='a'>Tiempo : {this.props.datos.Tiempo} min.</List.Description>
        <List.Description as='a'>Costo : {this.props.datos.Costo}</List.Description>
      </List.Content>
    </List.Item>

    );
  }
}



export default MantenimientoItem;
