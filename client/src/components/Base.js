import React, { PropTypes, Component } from 'react';
import { Link, IndexLink } from 'react-router';
import axios from 'axios';
import Auth from '../modules/Auth';

import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  margin: 5,
  title: {
    cursor: 'pointer',
    color: '#fff'
  }, 
  appbar: {
    marginBottom: 20
  }
};

function handleTouchTap() {

}

export default class Base extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsOpen: false,
      authenticated: false
    };
    
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {

  }

  getUserInfo() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/user');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.response);
      } 
    });
    xhr.send();
  }

  logout() {
      axios.get('/auth/logout')
        .then((response) => {
          console.log(response.data);
        });
  }

  handleToggle() {
    this.setState({settingsOpen: !this.state.settingsOpen});
  }

  handleClose() {
    this.setState({settingsOpen: false});
  }

  render() {
    return (
      <div>
        <AppBar
          style={styles.appbar}
          title={<Link to="/"><span style={styles.title}>PseudoCoin (Project 3)</span></Link>}
          onTitleTouchTap={handleTouchTap}
          iconElementLeft={<IconButton><NavigationMenu onTouchTap={this.handleToggle} /></IconButton>}
          iconElementRight=
            {Auth.isUserAuthenticated() ? (
            <div className="top-bar-right">
              <Link to="/logout"><FlatButton label="Log out" style={styles} /></Link>
            </div>
          ) : (
            <div className="top-bar-right">
              <Link to="/signup"><RaisedButton label="Sign Up" primary={true} style={styles} /></Link>
              <Link to="/login"><RaisedButton label="Login"  style={styles} /></Link>  
            </div>
          )
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.settingsOpen}
          onRequestChange={this.handleToggle}
        >
          <MenuItem onTouchTap={this.handleClose}>BTC</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>BTG</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>ETH</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>LTC</MenuItem>
        </Drawer>
      { /* child components*/ }
      {this.props.children}

    </div>
    );
  }
}


Base.propTypes = {
  children: PropTypes.object.isRequired
};

