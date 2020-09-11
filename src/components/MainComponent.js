import React, { Component } from 'react';
import Header from './HeaderComponent';
import Organiser from './OrganiserComponent';
import { registerUser, loginUser } from '../redux/ActionCreators';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    registerUser: (firstName, lastName, email, password) => dispatch(registerUser(firstName, lastName, email, password)),
    loginUser: (email, password) => dispatch(loginUser(email, password))
})

class Main extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
      
      return (
        <>
            <Header registerUser={this.props.registerUser} loginUser={this.props.loginUser}/>
            <Switch>
              <Route path="/organiser" component={() => <Organiser />} />
            </Switch>
        </>
      );
    }
  }
  
  export default withRouter(connect(null, mapDispatchToProps)(Main));