import React, { Component } from 'react';
import '../estilo/App.css';
import {Route, BrowserRouter, Link, Redirect, Switch,Router} from 'react-router-dom';
import { Menu, Icon, Button } from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const SubMenu = Menu.SubMenu;

class BarraLateral extends Component {
  constructor(){
    super()
  }
  state = {
    collapsed: true,
    auth: true,
    anchorEl: null,
  }
  toggleCollapsed = () => {
   this.setState({
     collapsed: !this.state.collapsed,
   });
 }

 handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div style={{position:'relative' }}>
      <AppBar position="static" style={{backgroundColor:'white',position:'absolute',zIndex:1}}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flexGrow: 1,}}>
              Photos
            </Typography>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="black">
                  <AccountCircle />
                </IconButton>
              </div>
          </Toolbar>
        </AppBar>


      <div style={{ width: 256,position:'absolute', zIndex:2 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme='light'
          inlineCollapsed={this.state.collapsed}
          style={{height:'50%'}}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    </div>
    );
  }
}



export default BarraLateral;
