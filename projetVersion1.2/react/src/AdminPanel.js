import React , { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody,MDBIcon } from 'mdbreact';
import {   MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class AdminPanel extends Component{

        constructor(props){
          super(props)
          this.state ={
          modal: false,
          msgBox:""

            }
          }

    toggleModalSuccesEnvoi = () => {
      this.setState({
        modal: !this.state.modal
      });
    }

    componentDidMount(){
      axios.get("/verifyAdminPrivelege" ,{ headers: {"Authorization" : `${localStorage.token}`} })
         .then(response => {
           if(! response.data.isAdmin){
             window.location.href = '/';
           }

         })
      axios.get("/getAllTuteurs")
         .then(response => {
           this.setState({
             options:response.data,
              selectedOption : '' ,   
              numTuteurSelection : ''  ,
              numTuteur:'',
              username:'',
              usernameTuteur:'',
              password:'',
              passwordTuteur:'',
           })
         })
    }
       
    handlenumEtuChange = selectedOption => {

            this.setState({
              numTuteur : selectedOption.value ,
              numTuteurSelection : selectedOption 
            })  
      }

      onAddStudentSubmit(){

      axios.get("/ajoutEtudiant?username="+this.state.username+"&password="+this.state.password+"&numTuteur="+this.state.numTuteur,{ headers: {"Authorization" : `${localStorage.token}`} })
        .then(response => {
          this.setState({
              modal: !this.state.modal,
              msgBox : response.data.msg
          })
        })
      }

      onAddEnseignantSubmit(){

      axios.get("/ajoutEnseignant?usernameTuteur="+this.state.usernameTuteur+"&passwordTuteur="+this.state.passwordTuteur,{ headers: {"Authorization" : `${localStorage.token}`} })
        .then(response => {
          this.setState({
              modal: !this.state.modal,
              msgBox : response.data.msg
          })
        })
      }

 render(){
  
  return (
    <MDBContainer>
   <MDBContainer style={{width:"40%",marginTop:"20px"}}>
        <MDBContainer>
          <MDBModal isOpen={this.state.modal} toggle={this.toggleModalSuccesEnvoi}>
            <MDBModalHeader toggle={this.toggleModalSuccesEnvoi}></MDBModalHeader>
            <MDBModalBody>
               Message : {this.state.msgBox} 
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="primary" onClick={this.toggleModalSuccesEnvoi} >Fermer</MDBBtn>
            </MDBModalFooter>
          </MDBModal>
      </MDBContainer>
      <MDBRow>
          <MDBCard style={{width:"100%"}}>
            <MDBCardBody >
              <div >
                <p className="h4 text-center py-4">Ajouter Un Stagaire</p>
                <div className="grey-text">
                  <MDBInput
                    label="Nom"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.username} 
                    onChange={ (e) => {this.setState({username : e.target.value}) } }
                  />
                  <MDBInput
                    label="Mot De Passe"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={this.state.password} 
                    onChange={ (e) => {this.setState({password : e.target.value}) } }
                  />

                  <div >

                    <div style={{display: "inline-block"}} >
                      <MDBIcon icon="user" size="2x"/>
                    </div>

                    <div style={{display: "inline-block",width:"90%",margin:"1%"}}>
                       <Select
                          placeholder="Choisir Tuteur"
                          value={this.state.numTuteurSelection}
                          onChange={this.handlenumEtuChange}
                          options={this.state.options}
                        />
                    </div>

                  </div>
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" onClick={this.onAddStudentSubmit.bind(this)}>
                    Ajouter
                  </MDBBtn>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
      </MDBRow>
    </MDBContainer>
    <MDBContainer style={{width:"40%",marginTop:"20px"}}>
  
      <MDBRow>
          <MDBCard style={{width:"100%"}}>
            <MDBCardBody >
              <div >
                <p className="h4 text-center py-4">Ajouter Un Enseignant</p>
                <div className="grey-text">
                  <MDBInput
                    label="Nom"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    value={this.state.usernameTuteur} 
                    onChange={ (e) => {this.setState({usernameTuteur : e.target.value}) } }
                  />
                  <MDBInput
                    label="Mot De Passe"
                    icon="lock"
                    group
                    type="password"
                    validate
                    value={this.state.passwordTuteur} 
                    onChange={ (e) => {this.setState({passwordTuteur : e.target.value}) } }
                  />

                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" onClick={this.onAddEnseignantSubmit.bind(this)}>
                    Ajouter
                  </MDBBtn>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
      </MDBRow>
    </MDBContainer>
    </MDBContainer>
  );
  }
}
     

export default AdminPanel;

