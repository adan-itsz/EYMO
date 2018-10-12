import React, { Component } from 'react';
import { Image,Icon,Container,Header,Divider,List,Select,Accordion } from 'semantic-ui-react'
import '../estilo/item-maquina.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Route,Link} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const months = ["Enero","Febrero","Marzo"];


class ItemMaquina extends Component {
  constructor(props){
    super(props)
  }
  state = { activeIndex: 0 }

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

    <List>
      <List.Item>
      <div className='itemDescripcion'>
        <img className='imagen-item' src='https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/110189_cube_2900_k_2016.jpg' />
        <List>
        <List.Item>
          <div className='title'>
            <Header as='h2' icon  style={{float:'right'}}>
              <Icon name='settings' />
              Maquina MCubicos 18
              <Header.Subheader>Area 4</Header.Subheader>
            </Header>
          </div>
        </List.Item>
        <List.Item>
          <Divider  />
        </List.Item>
        <List.Item>
          <div className='description'>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
               eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </div>
        </List.Item>
      </List>
      </div>
    </List.Item>
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
    <List.Item>
        <div className='acordeon'>

        </div>
    </List.Item>
    </List>
      </div>
    );
  }
}




export default ItemMaquina;
