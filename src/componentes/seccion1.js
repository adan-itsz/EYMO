import React, { Component } from 'react';
import './seccion1.css';
import 'font-awesome/css/font-awesome.min.css';

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Dropdown,
  List,
  Menu,
  Responsive,
  Segment,
  Label

} from 'semantic-ui-react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const tileData = [
   {
    img: '01.JPG',
    title: 'Image',
    author: 'author',
    cols: 1,
  },
  {
    img: '02.jpg',
    title: 'Image',
    author: 'author',
    cols: 1,
   },
   {
     img: '03.JPG',
     title: 'Image',
     author: 'author',
     cols: 2,
    },
    {
      img: '04.JPG',
      title: 'Image',
      author: 'author',
      cols: 2,
     },
];
class Seccion1 extends Component{
  constructor(props){
    super();
    this.state={
      open:true,
      cerrado:true
    }
  }
  handleClick=()=>{
    this.setState({
      open:!this.state.open
    })
  }
  changePosicion(){
    this.setState({cerrado: !this.state.cerrado})

  }
  render(){
    let open=this.state.open;
     let ribbonclass = this.state.cerrado ? "ribbon-figura" : "ribbon-figura-cerrado";
     let flechaclass = this.state.cerrado ? "flecha" : "flecha-cerrado";
    let listaclass = this.state.cerrado ? "lista-terraza" : "lista-terraza-cerrado";
    let tequilaClass = this.state.cerrado ? "rutaTequila" : "rutaTequila-cerrado";
    let tequilaTexto = this.state.cerrado ? "rutaTequila-texto" : "rutaTequila-texto-cerrado";

    return(
    <div style={{height:'100%'}}>
      { open ?
        <Segment  vertical style={{ padding: '8em 0em',marginLeft:'1em',marginRight:'1em',height:'100%'}}>
          <Grid container stackable verticalAlign='middle' style={{height:'100%'}}>
            <Grid.Row >
            <Grid.Column floated='center'width={7}>

                <div className='panel-izquierdo2'>
                <GridList cellHeight={170} style={{ width: '500',height: '450'}} cols={2.5}>
                  {tileData.map(tile => (
                    <GridListTile className= 'imagenGrid' onClick={this.handleClick2} key={tile.img} cols={tile.cols || 1}>
                        <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                  ))}
                </GridList>
                </div>

            </Grid.Column>

              <Grid.Column floated='right' width={7} >
              <div style={{width:'90%',marginLeft:'12%',marginRight:'-12%'}}>
                <h1 className='titulos' style={{textAlign:'center'}}>#EXPERIEncia TERRAZA</h1>
                <p  className='parrafo-seccion2'style={{ fontSize: '1.24em',textAlign:'center' }}>
                  Con un espacio único, amplio, versátil y diferente, Terraza Fortuna es el lugar ideal para la realización de
                  todo tipo de eventos. Nuestra hermosa terraza a la sombra de enormes árboles y nuestro bello jardín son los
                  elementos que convertirán un evento especial en una historia inolvidable.
                </p>
                <div class="flex2">
                 <a onClick={this.handleClick} class="bttn" >Saber más</a>
               </div>
                </div>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Segment>:

        <Segment  vertical style={{ padding: '0em 0em',marginLeft:'0em',marginRight:'0em',height:'100px',position:'relative'}}>
        <div className="panelDos" >
          <div className='contenedor-videoTerraza'>

            <video className="terraza-video" autoPlay loop muted>
                <source src="./terraza.mp4" type="video/mp4; "/>
            </video>
            <div className={ribbonclass}>
            </div>
            <div ><i onClick={this.changePosicion.bind(this)}  className="fa fa-angle-right" id={flechaclass}></i></div>

            <div className={listaclass}>
                  <div className = 'tour-slide'>
                <Label as='a' color='red' ribbon>
                    Tour degustación
                  </Label>

                  <p className='parrafos-terraza'>Disfruta de los recorridos por la fábrica y comprueba la calidad en nuestros procesos. Prueba la
                  buena cerveza hecha en Jalisco y empápate de una gran experiencia cervecera.
                  </p>
                  </div>
                  <div className = 'costos-slide'>

                  <Label as='a' color='red' ribbon>
                    Costos
                  </Label>
                    <p className='parrafos-terraza'>$150. Incluye: Tour por la fábrica, degustación de cerveza (300 ml.) y botana.
                    <br/>$200. Incluye: Tour por la fábrica, degustación de nuestros cinco estilos de cerveza (5 vasos de 190 ml.) y botana.</p>
                  </div>
                  <div className = 'horarios-slide'>

                  <Label as='a' color='red' ribbon>
                      Horarios
                  </Label>
                    <p className='parrafos-terraza'>Lunes a viernes de 10:30 a 15:00 hrs. Sábados y domingos de 10:00 a 12:30 hrs.<br/>
                    Reservación requerida, vía OpenTable.<br/>
                    Contacto: Teléfono 36 27 71 32 <br/>knavarro@cervezafortuna.com</p>
                    </div>
            </div>
            <div className={tequilaClass}></div>
            <h1 className={tequilaTexto}>Ruta del tequila</h1>
            <h1 className={tequilaTexto} style={{fontSize:'1em',fontWeight:'100',left:'57%',top:'82%'}}>Cerveza Fortuna es la primera y única cervecería afiliada a la Ruta del Tequila.</h1>
            <div className='btn-atras' onClick={this.handleClick}>
              <i className="material-icons md-48" style={{fontSize: "50px",color:'white',opacity:'.8'}}>keyboard_backspace</i>
            </div>
        </div>

      </div>
      </Segment>
      }
      </div>
    )
  }
}
export default Seccion1;
