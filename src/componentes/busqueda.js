import React, { Component } from 'react';
import { Icon,List, Input } from 'semantic-ui-react';
import { Divider, Header,Table,Modal,Button,Form,Card,Image,Label} from 'semantic-ui-react';
import '../estilo/Busqueda.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Route,Link} from 'react-router-dom';
import axios from 'axios';
import BarraLateral from './sideBar.js';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

const maquinariaLista={
  datos:[
    {
      'img':'https://www.arburg.com/fileadmin/redaktion/bilder/vollbild_650x320px/110189_cube_2900_k_2016.jpg',
      'title':'moldes',
      'head':'MCubicos 1',
      'description':'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      img:'http://www.elempaque.com/documenta/imagenes/4096761/Maquinas-para-envolver-productos-de-rollos-y-barras-g1.jpg',
      title:'envolver',
      head:'Envol 12',
      description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      img:'https://www.fabricantes-maquinaria-industrial.es/wp-content/uploads/2017/03/todo-sobre-las-maquinas-de-corte-laser-1024x592.png',
      title:'molde',
      head:'MCubicos 6',
      description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      img:'https://www.fabricantes-maquinaria-industrial.es/wp-content/uploads/2017/03/todo-sobre-las-maquinas-de-corte-laser-1024x592.png',
      title:'molde',
      head:'MCoo 5',
      description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      img:'https://www.fabricantes-maquinaria-industrial.es/wp-content/uploads/2017/03/todo-sobre-las-maquinas-de-corte-laser-1024x592.png',
      title:'MClo 18',
      head:'MClo 18',
      description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    },
    {
      img:'https://www.fabricantes-maquinaria-industrial.es/wp-content/uploads/2017/03/todo-sobre-las-maquinas-de-corte-laser-1024x592.png',
      title:'molde',
      head:'Envol 13',
      description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    }
  ]
}


class Buscar extends Component {
  constructor(match){


    super()
    console.log(maquinariaLista);
    this.state={
      query:'',
      resultados:[],
      ArrayMAquinas: [],
      idArea:`${match.match.params.id}`,
      TodosComponentes:[],
      resultadosInterface:[]
    }
    axios.post(`http://localhost:4000/ConsultaMaquina`,{Area:`${match.match.params.id}`})
      .then(res => {
        console.log("lado del cleinte :: "+res.data);
        this.setState({
          resultados:res.data.Maquinas,
          resultadosInterface:res.data.Maquinas,
          TodosComponentes: res.data.Componentes
        })
      })
  }


  buscarObjetos=()=>{
    var res=[];
    var longitud=this.state.query.length;
    if(longitud==0){
      res=this.state.resultados
    }
    else{
    this.state.resultados.forEach(it=>{
      if(it.Nombre.substring(0,longitud)==this.state.query){
        res=res.concat(it);
      }
    })
  }
    this.setState({
      resultadosInterface:res
    })
  }

  onChangeInput=event=>{

    console.log(event.target.value);
    this.setState({
      query: event.target.value
    },() => {
        this.buscarObjetos();
    })

  }

  render() {
    var list=this.state.resultadosInterface.length>0;
    var ArraComp = this.state.TodosComponentes
    return (
      <div>
      <BarraLateral/>
      <div className='contenedor-busqueda'>
        <div className='busqueda'>
          <Input  fluid icon={<Icon name='search' inverted circular link />}
          onChange={this.onChangeInput}
          ref={input => this.search = input} placeholder='Nombre maquina...' />
        </div>

        {
          list==true ?
          <div id="bodyRutas">
          <div id="RutasPublicas">

               {this.state.resultadosInterface.map((it,key)=>{
                 return(<Carta datos={it} Componente={ArraComp[key]}  key={key}/>)
               })}

           </div>
          </div>
        :<div >
          <img className='not-found' src='http://www.cgcollege.org/Assets/images/icons/nodata-found.png'/>
        </div>
       }

      </div>
      </div>
    );
  }
}



class Carta extends Component{

  constructor(){
    super();


  }

  render(){
    const newTo = {
      pathname: `/user/MaqItem/`+this.props.key,
      Maquina: this.props.datos,
      Componentes: this.props.Componente
        };

    return(

      <div id="borderCarta">

      <Link id='agregarLibro' to={newTo}>
        <Card id = 'CardSolo' color='grey' fluid >
          <Card.Content>
          <Label  attached='top right'>X</Label>
           <Image floated='right'style={{marginRight:"10%"}} size='small' src= {this.props.datos.Imagen} />
            <Card.Header >{this.props.datos.Nombre}</Card.Header>
            <Card.Meta>{this.props.datos.Area}</Card.Meta>
            <Card.Description></Card.Description>
            <Card.Description>año de instalacion : {this.props.datos.AnoInstalacion}</Card.Description>
          </Card.Content>


    </Card>
    </Link>
      </div>
    )
  }
}


export default Buscar;
