import React,{Component} from 'react'
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom'
import AdminRoute from './routerAdmin.js'
import Login from '../componentes/login.js'
import {ref,firebaseAuth} from '../const.js'
import UserRoutes from './routerUser.js'

function PrivateRouteAdmin ({component: Component, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true &&  user === 'adan1995a@gmail.com'
        ? <Component {...props} />
        : <Redirect to={{pathname: '/useewr' , state: {from: props.location}}} />}
    />
  )
}
function PrivateRouteUser ({component: Component, authed,user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true &&  user !== 'adan1995a@gmail.com'
        ? <Component {...props} />
        : <Redirect to={{pathname: '/' , state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/admin' />}
    />
  )
}

class Routes extends Component{
  state={
    autenticado:false,
    loading:true,
    user:''
  }
  componentDidMount(){
    this.removeListener=firebaseAuth.onAuthStateChanged((user)=>{
      if(user){
        this.setState({
          user:user.email,
          autenticado:true,
          loading:false
        })
      }
      else{
        this.setState({
          autenticado:false,
          loading:false
        })
      }
    })
  }
  componentWillUnmount(){
    this.removeListener()
  }
  render(){
    return this.state.loading === true ? <h1>Loading</h1> :(
      <BrowserRouter>

  <Switch>
    <PublicRoute exact authed={this.state.autenticado} path="/" component={Login}/>
    <PrivateRouteAdmin user={this.state.user } authed={this.state.autenticado} path="/admin" component={AdminRoute}/>
    <PrivateRouteUser user={this.state.user } authed={this.state.autenticado} path="/user" component={UserRoutes}/>
    <Route render={()=><h3> Ocurrió un error </h3>}/>
  </Switch>
  </BrowserRouter>

);
}
}

export default Routes;
