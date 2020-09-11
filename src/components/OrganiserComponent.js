import React, { Component } from 'react';
import Header from './HeaderComponent';

class Organiser extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            username: localStorage.username
        }
    }
    render() {
      
      return (
        <>
         <h1>Hi {this.state.username}</h1>
        </>
      );
    }
  }
  
  export default Organiser;