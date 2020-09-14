import React, { Component } from 'react';
import Header from './HeaderComponent';
import Organiser from './OrganiserComponent';
import { registerUser, loginUser, logoutUser, postBookmark } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Manager from './ManagerComponent';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';


const mapStateToProps = state => {
    return{
      user: state.user,
      bookmarks: state.bookmarks
    }
}
const mapDispatchToProps = (dispatch) => ({
    registerUser: (firstName, lastName, email, password) => dispatch(registerUser(firstName, lastName, email, password)),
    loginUser: (email, password) => dispatch(loginUser(email, password)),
    logoutUser: () => {dispatch(logoutUser())},
    postBookmark: (userId, parent, child, name, url) => dispatch(postBookmark(userId, parent, child, name, url))
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
              <Route path="/organiser" component={() => <Organiser username={this.props.user.name} bookmarks={this.props.bookmarks}/>} />
              <Route path="/manager" component={() => <Manager createBookmark = {this.props.postBookmark} userId={this.props.user.id}/> } />
              <Redirect to="/organiser" />
            </Switch>
        </>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));