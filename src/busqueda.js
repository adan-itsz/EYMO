import React, { Component } from 'react';
import { Icon,List, Input } from 'semantic-ui-react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Route,Link} from 'react-router-dom';

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
      resultados:maquinariaLista.datos,
      idArea:`${match.match.params.id}`
    }
  }


  buscarObjetos=()=>{
    var res=[];
    var longitud=this.state.query.length;
    if(longitud==0){
      res=maquinariaLista.datos
    }
    else{
    maquinariaLista.datos.forEach(it=>{
      if(it.head.substring(0,longitud)==this.state.query){
        res=res.concat(it);
      }
    })
  }
    this.setState({
      resultados:res
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
    var list=this.state.resultados.length>0;
    return (
      <div className='contenedor-busqueda'>
        <div className='busqueda'>
          <Input  fluid icon={<Icon name='search' inverted circular link />}
          onChange={this.onChangeInput}
          ref={input => this.search = input} placeholder='Nombre maquina...' />
        </div>

        {
          list==true ?
          <div className='lista-maquinas'>
            <List style={{textAlign:'center'}}relaxed='very'>
               {this.state.resultados.map((it,key)=>{
                 var desResumen=it.description.substring(0,126);
                 return(<Carta datos={it} description={desResumen} key={key}/>)
               })}
           </List>
          </div>
        :<div >
          <img className='not-found' src='http://www.cgcollege.org/Assets/images/icons/nodata-found.png'/>
        </div>
       }

      </div>
    );
  }
}

class Carta extends Component{
  render(){
    return(
      <List.Item>
        <Card style={{maxWidth: 545,margin:0}}>
        <CardActionArea>
        <Link id='agregarLibro' to={`/MaqItem/`+this.props.key}>
            <CardMedia
              style={{height: 240}}
              image={this.props.datos.img}
              title={this.props.datos.title}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                 {this.props.datos.head}
              </Typography>
              <Typography component="p">
              {this.props.description}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </List.Item>

    );
  }
}



export default Buscar;
