import React, { Component } from 'react';
import Header from './HeaderComponent';
import Organiser from './OrganiserComponent';
import { registerUser, loginUser, logoutUser, createBookmarks, deleteBookmarks, editBookmarks } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

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
    createBookmarks: (userId, parent, child, name, url) => dispatch(createBookmarks(userId, parent, child, name, url)),
    editBookmarks: (userId, id, name, url ) => dispatch(editBookmarks(userId, id, name, url)),
    deleteBookmarks: (userId, nodeId) => dispatch(deleteBookmarks(userId, nodeId))
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
              <Route path="/organiser" component={() => <Organiser user={this.props.user} bookmarks={this.props.bookmarks} deleteBookmarks={this.props.deleteBookmarks} createBookmarks={this.props.createBookmarks} editBookmarks={this.props.editBookmarks}/>} />
              <Redirect to="/organiser" />
            </Switch>
        </>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));