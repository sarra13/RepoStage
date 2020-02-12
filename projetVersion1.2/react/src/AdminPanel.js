import React , { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody,MDBIcon } from 'mdbreact';
class AdminPanel extends Component{

        constructor(props){
          super(props)
          this.state ={
            }
          }



    componentDidMount(){
      axios.get("/getAllTuteurs")
         .then(response => {
           this.setState({
             options:response.data,
              selectedOption : '' ,   
              numTuteurSelection : ''  ,
              numTuteur:'',
              username:'',
              password:'',
           })
         })
    }
       
    handlenumEtuChange = selectedOption => {

            this.setState({
              numTuteur : selectedOption.value ,
              numTuteurSelection : selectedOption 
            })  
      }

      onAddSubmit(){

            axios.get("/ajoutEtudiant?username="+this.state.username+"&password="+this.state.password+"&numTuteur="+this.state.numTuteur)
    
      }

 render(){
  
  return (
   <MDBContainer style={{width:"40%",marginTop:"20px"}}>
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
                  <MDBBtn color="cyan" onClick={this.onAddSubmit.bind(this)}>
                    Ajouter
                  </MDBBtn>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
      </MDBRow>
    </MDBContainer>
  );
  }
}
     

export default AdminPanel;

