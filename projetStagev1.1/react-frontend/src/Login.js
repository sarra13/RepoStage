import React from "react";
import axios from 'axios'
import './Login.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Login extends React.Component  {

        constructor(props){
          super(props)
          this.state ={
            username:"",
            password:"",
            modal: false,
            }
          }

toggleModalSuccesEnvoi = () => {
  this.setState({
    modal: !this.state.modal
  });
}

      onLoginSubmit(){

            axios.get("/login?username="+this.state.username+"&password="+this.state.password)
             .then(response => {
              if (Boolean(response.data.login)){
                this.props.onLoginSucces(response.data);
              }else {
                this.toggleModalSuccesEnvoi();
              }
             }) 
      }
    componentDidMount(){
      console.log(this.props)
    }
  render() 
  {  return (

<div style={{marginLeft:"35%",width: "30%",marginTop:"10%"}}>
<div className="container login-container"  style={{width: "100%"}} >

            <div className="row" style={{textAlign: "center"}}>

                <div className="login-form-1" style={{width: "100%"}} >
                    <h3>Login Form</h3>
                        <div className="form-group">
                        <label>Username</label>
                          <input 
                              placehoder="Username" 
                              value={this.state.username} 
                              onChange={ (e) => {this.setState({username : e.target.value}) } }
                              type="text"
                              className="form-control"
                              />   
                        </div>
                         <label>Password</label>
                        <div className="form-group">
                          <input 
                            placehoder="Password" 
                            value={this.state.password} 
                            onChange={ (e) => {this.setState({password : e.target.value}) } }
                            type="password"
                            className="form-control"
                            />
                        </div>
                        <div className="form-group">
                          <MDBBtn onClick={this.onLoginSubmit.bind(this)}>
                            Login
                          </MDBBtn>
                        </div>

                </div>
   
            </div>
        </div>
       <MDBContainer>
      <MDBModal isOpen={this.state.modal} toggle={this.toggleModalSuccesEnvoi}>
        <MDBModalHeader toggle={this.toggleModalSuccesEnvoi}></MDBModalHeader>
        <MDBModalBody>
          Login ou mot de passe erroné. 
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={this.toggleModalSuccesEnvoi} >Fermer</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
        </div>
 
   


         



    );
  }
};

export default Login;