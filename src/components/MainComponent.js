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
    createBookmarks: (parent, child, name, url) => dispatch(createBookmarks(parent, child, name, url)),
    editBookmarks: (nodeId, name, url ) => dispatch(editBookmarks(nodeId, name, url)),
    deleteBookmarks: (nodeId) => dispatch(deleteBookmarks(nodeId))
})

class Main extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
      
      const OrganiserPage = () => {
        return (
            <Organiser user={this.props.user} bookmarks={this.props.bookmarks} 
            deleteBookmarks={this.props.deleteBookmarks} 
            createBookmarks={this.props.createBookmarks} 
            editBookmarks={this.props.editBookmarks} />
        )
      }
      return (
        <>
            <Header registerUser={this.props.registerUser} loginUser={this.props.loginUser} logoutUser={this.props.logoutUser} status={this.props.user.status}/>
            <Switch>
              <Route path="/organiser" component={OrganiserPage}/>
              <Redirect to="/organiser" />
            </Switch>
        </>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));