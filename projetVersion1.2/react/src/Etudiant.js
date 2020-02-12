import React, { Component } from "react";
import axios from 'axios';

import "./Etudiant.css";

import DatePicker from "react-datepicker";
 import { MDBContainer , MDBAlert} from 'mdbreact';

import "react-datepicker/dist/react-datepicker.css";


class Etudiant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      NomEtudiant:"",
      PrenomEtudiant:"",
      NomTuteur:"",
      PrenomTuteur:"",
      TelEtudiant:"",
      TelTuteur:"",
      Faculte:"",
      Date:"",
      datareceived1:"",
      
  }}
 /* PrenomEtudiant:datareceived1.prenom,

  NomTuteur:datareceived1.nomT,
  PrenomTuteur:datareceived1.prenomT,
  TelEtudiant:datareceived1.TelE,
  TelTuteur:datareceived1.TelT,
  Faculte:datareceived1.Fac,
  Date:datareceived1.date,*/
  componentDidMount() {
     if (    Number.isInteger(parseInt(this.props.numEtu,10))   ){ 
    axios.get("http://127.0.0.1:3001/etudiant/getInformationsEtudiant?id="+this.props.numEtu)
   .then(response => {
     var datareceived1=response.data[0]
     
     this.setState({
     NomEtudiant:datareceived1.nom
        
     })
     console.log(response.data);
   })  
 }
};

componentWillReceiveProps(newProps) {
                console.log(  newProps.numEtu );

   if (  this.props.numEtu !==  newProps.numEtu &&  Number.isInteger(parseInt(newProps.numEtu,10))   ){

             axios.get("http://127.0.0.1:3001/etudiant/getInformationsEtudiant?id="+newProps.numEtu)
            .then(response => {
              var datareceived1=response.data[0]

              this.setState({

                NomEtudiant:datareceived1.nom,
        
                          })
              console.log(response.data);

            })  
  }
 }  
  render() {
    if (this.props.numEtu==''){
  return(          <MDBContainer>
            <MDBAlert color="warning" dismiss>
              <strong>ERREUR !</strong> Merci de Choisir un etudiant.
            </MDBAlert>
          </MDBContainer>);
      }
      else
    return (
      <div className="wrapper">
        <div className="form-wrapper"></div>
      <div style={{width: "50%",margin:"0 auto",}}>
<div className="container login-container"  style={{width: "100%",  margin:"0 auto",
}} >


                <div className="login-form-1" style={{width: "100%"}} >
                    <form>
                    <h1>Etudiant:</h1>

                <div className="NomEtudiant">
    
              <label htmlFor ="NomEtudiant">Nom:</label>
              <input
                placeholder="Nom"
                type="text"
                name="NomEtudiant"
                value={this.state.NomEtudiant}
              />
            </div>
            <div className="PrenomEtudiant">
                            <label htmlFor ="PrenomEtudiant">Prénom:</label>
              <input
                placeholder="Prénom"
                type="text"
                name="PrenomEtudiant"
                value={this.state.PrenomEtudiant}
              />
            </div>
            
            <div className="TelEtudiant">     
                     <label htmlFor ="TelEtudiant">Tel:</label>
              <input
                placeholder="Tel"
                type="text"
                name="TelEtudiant"
                value={this.state.TelEtudiant}
                onChange={this.handleTelEtudiantChange}
              />
            </div>
            <h1>Tuteur:</h1>

            <div className="NomTuteur">    
              <label htmlFor ="NomTuteur">Nom:</label>
              <input
                placeholder="Nom"
                type="text"
                name="NomTuteur"
                value={this.state.NomTuteur}
                onChange={this.handleNomTuteurChange}
              />
            </div>
            <div className="PrenomTuteur">   
                       <label htmlFor ="PrenomTuteur">Prénom:</label>
              <input
                placeholder="Prénom"
                type="text"
                name="PrénomTuteur"
                value={this.state.PrénomTuteur}
                onChange={this.handlePrénomTuteurChange}
              />
            </div>
            <div className="TelTuteur">
                            <label htmlFor ="TelTuteur">Tel:</label>
              <input
                placeholder="Tel"
                type="text"
                name="TelTuteur"
                value={this.state.TelTuteur}
                onChange={this.handleTelTuteurChange}
              />
            </div>
            
            <div className="Date">
              
                            <label htmlFor="Date">Date d'entrée en DES :</label>
       
              <input
                placeholder="jj/mm/aaaa"
                type="text"
                name="Date"
                value={this.state.Date}
              />

          </div>
          </form>

          </div> 
        </div>
      </div>
       </div>
       
             
    );}
              }
              export default Etudiant
