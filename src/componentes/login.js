import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import '../estilo/login.css';




class LoginForm extends Component{
  constructor(){
    super();
    this.state = {
      currentItem:'',
      userName:'',
      password:'',

    }
  //  this.login = this.login.bind(this);

  }
/*  login=()=>{
      console.log(this.state.userName.value+' ' +this.state.password);
      auth.signInWithEmailAndPassword(this.state.userName.value, this.state.password.value)
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
  }*/

  render(){
    return(
      <div className='contenedor-login'>
      <div className='login-form'>
        {/*

        */}

        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='https://react.semantic-ui.com/logo.png' /> Ingresa con tu cuenta
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'  onChange = {(event,correo) => this.setState({userName:correo})}/>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange = {(event,newValue) => this.setState({password:newValue})}
                />

                <Button color='teal' fluid size='large' >
                  Ingresa
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
      </div>
    );
    }
}
export default LoginForm
