import React, { Component } from 'react';
import Header from './HeaderComponent';
import Organiser from './OrganiserComponent';
import { registerUser, loginUser, logoutUser } from '../redux/ActionCreators';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return{
       user: state.user
    }
}
const mapDispatchToProps = (dispatch) => ({
    registerUser: (firstName, lastName, email, password) => dispatch(registerUser(firstName, lastName, email, password)),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    logoutUser: () => {dispatch(logoutUser())}
})

class Main extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
      
      return (
        <>
            <Header registerUser={this.props.registerUser} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} status={this.props.user.status}/>
            <Switch>
              <Route path="/" component={() => <Organiser username={this.props.user.name}/>} />
            </Switch>
        </>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));