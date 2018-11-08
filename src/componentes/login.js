import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {ref,firebaseAuth} from '../const.js'
//css
import './login.css'
//material-ui components
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';


const styles = {
  title: {
    cursor: 'pointer',
  },
  button:{
    color:'#2C434B'
  }
};

class Login extends Component{
  constructor(){
    super()

  }
    state = {
      email:'',
      password:''
    }

 autenticar =() =>{
    firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(function(error){
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {

              alert('contraseña incorrecta');
          }
      else if(errorCode==='auth/user-not-found'){
            alert('Usuario inexistente');
      }
          else {
                  alert(errorMessage);
                }
                console.log(error);

    });
  }
  user =(event) =>{
    this.setState({
      email:event.target.value
    })
  }
  pass =(event) =>{
    this.setState({
      password:event.target.value
    })
  }
  render(){
    return(

      <div>
      <MuiThemeProvider>
      <div className="contenedor-login">
        <div id="login-form">
          <div id="login-mail">
            <h2>Correo</h2>
            <TextField
              underlineFocusStyle={{borderColor: "#DED5B8"}}
              onChange={this.user}
            />
          </div>
          <div id="login-password">
            <h2>Contraseña</h2>
            <TextField
              underlineFocusStyle={{borderColor: "#DED5B8"}}
              type="password"
              onChange={this.pass}
            />
          </div>

            <RaisedButton label="Aceptar" primary={true}
            onClick={this.autenticar}/>

        </div>
        </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Login;
