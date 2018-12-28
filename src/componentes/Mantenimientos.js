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
      return(<Carta datos={it}  key={key}/>)
    })}
    </List>
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
              <Card.Header>{this.props.datos.Area}</Card.Header><br/>

              <Card.Meta>Maquina</Card.Meta>
              <Card.Header>{this.props.datos.Maquina}</Card.Header><br/>

            </div>

            <div style={{paddingLeft:"30%"}}>
              <Card.Meta>Componente</Card.Meta>
              <Card.Header>{this.props.datos.Componente}</Card.Header><br/>

              <Card.Meta>Encargado</Card.Meta>
              <Card.Header>{this.props.datos.Encargado}</Card.Header><br/>


            </div>

            <div style={{paddingLeft:"40%"}}>
            <Card.Meta>Fecha</Card.Meta>
            <Card.Header>{this.props.datos.FechaDeSubida}</Card.Header><br/>

              <Button onClick={this.show(true)} style={{width:'25vh'}}secondary circular={true} >Mostrar mas</Button>


            </div>

          </div>

          </Card.Content>

        </Card>

        <Modal dimmer={this.state.dimmer} open={this.state.open} onClose={this.close}>

          <Modal.Content >
            <Form>
              <Form.Group widths='15'>
                <Form.Field>
                  <label>Area</label>
                  {this.props.datos.Area}
                </Form.Field>

                <Form.Field>
                  <label> Maquina</label>
                  {this.props.datos.Maquina}
                </Form.Field>

                <Form.Field>
                <label> Componente</label>
                {this.props.datos.Componente}
                </Form.Field>

                <Form.Field>
                <label> Costo </label>
                {this.props.datos.Costo}

                </Form.Field>
                <Form.Field>
                <label> Encargado </label>
                {this.props.datos.Encargado}
                </Form.Field>
              </Form.Group>

              <Form.Group widths='15'>

                <Form.Field>
                  <label> Fecha</label>
                  {this.props.datos.FechaDeSubida}
                </Form.Field>

                <Form.Field>
                  <label> Metodo de Mto.</label>
                  {this.props.datos.MetodoMto}
                </Form.Field>

              </Form.Group>
            </Form>
          </Modal.Content>

          <Divider/>

          <Modal.Content>

          <Form.Group widths='15'>

            <Form.Field>
              <label> Estado de Pieza</label>
              {this.props.datos.Nueva}
            </Form.Field>

            <Form.Field>
            {this.props.ObjetivoMtoCorrectivo?
              (
                <div>
                <label> Objetivo del mantenimiento correctivo</label>
              {this.props.datos.ObjetivoMtoCorrectivo}
              </div>
            ):(
              <div>
              <label> Objetivo del mantenimiento preventivo</label>
              {this.props.datos.ObjetivoMtoPreventivo}
              </div>
            )

            }
            </Form.Field>
            <Form.Field>
              <label>Tiempo</label>
              {this.props.datos.Tiempo}
            </Form.Field>
            <label>Tipo de Mto.</label>
          {this.props.datos.TipoMan}

          </Form.Group>
          </Modal.Content>


          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Cancelar
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Aceptar"
              onClick={this.close}
            />
          </Modal.Actions>

        </Modal>

      </div>
    )
  }
}




export default MantenimientoItem;
