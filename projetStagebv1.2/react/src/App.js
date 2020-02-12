import React , { Component } from 'react';

import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import FilterSearchBar from './FilterSearchBar'
import ElementNavbar from './ElementNavbar';
import axios from 'axios';
import Login from './Login';
import  '@material-ui/core';
class App extends Component{

        constructor(props){
          super(props)
          this.state ={
            isLoggedIn : '',
            }
          }


  loginSuccess(session){
            this.setState ({
            isLoggedIn : session.login,
            isEtudiant : session.etudiant,
            userId : session.id,
            isAdmin : session.isAdmin
            });
        localStorage.setItem('isLoggedIn', session.login);
        localStorage.setItem('isEtudiant', session.etudiant);
        localStorage.setItem('isAdmin', session.isAdmin);
        localStorage.setItem('userId', session.id);
window.location.href = '/';  }

  componentDidMount(){
    if(localStorage.isLoggedIn=="true"){
          this.setState ({
            isLoggedIn : localStorage.isLoggedIn,
            isAdmin : localStorage.isAdmin,
            isEtudiant : localStorage.isEtudiant,
            userId : localStorage.userId,
            });
    }
  }

 render(){
 
    /**/
  return (
    <React.Fragment>
    { localStorage.isLoggedIn == "true"  ? 
         <ElementNavbar isAdmin={localStorage.isAdmin} isEtudiant={localStorage.isEtudiant} userId={localStorage.userId} />
        :  
        <Login  onLoginSucces={this.loginSuccess.bind(this)} />
    }
    </React.Fragment>
      );
  }
}
     

export default App;


