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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';


const months = ["Enero","Febrero","Marzo"];


class ItemMaquina extends Component {
  constructor(props){

    super(props)
    try {

      this.setState({
         Maquina: this.props.location.Maquina,
         Componentes:this.props.location.Componentes,
       })

    } catch (e) {

    }

    axios.post(`http://localhost:4000/MtoMaquina`,{Area:this.props.location.Maquina.Area,Maquina:this.props.location.Maquina.Nombre})
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        this.setState({
          MtoPorMaquina: res.data.MantenimientosPorMaquina,
        });
      })

  }
  state = {
    activeIndex: 0,
    MtoPorMaquina:[],
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



    return (
     <div className='contenido-card'>

    <List>
      <List.Item>
      <div className='itemDescripcion'>
        <img className='imagen-item' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisjG7YVQiVLtLH4paHwwm-n14Ync6Tq7i0mB0GUHYAOUctWro' />
        <List>
        <List.Item>
          <div className='title'>
            <Header as='h2' icon  style={{float:'right'}}>
              <Icon name='settings' />
              {this.props.location.Maquina.Nombre}
              <Header.Subheader>Area {this.props.location.Maquina.Area}</Header.Subheader>
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



export default ItemMaquina;
