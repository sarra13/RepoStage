import React, { Component } from "react";
import axios from 'axios';

import "./Etudiant.css";

import DatePicker from "react-datepicker";
 
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
      
    axios.get("http://127.0.0.1:3001/etudiant/getInformationsEtudiant?id="+this.props.numEtu)
   .then(response => {
     var datareceived1=response.data[0]
     
     this.setState({
     NomEtudiant:datareceived1.nom
        
     })
     console.log(response.data);
   })  
};

componentWillR(newProps) {
      
             axios.get("http://127.0.0.1:3001/etudiant/getInformationsEtudiant?id="+newProps.numEtu)
            .then(response => {
              var datareceived1=response.data[0]

              this.setState({

                NomEtudiant:datareceived1.nom,
        
                          })
              console.log(response.data);

            })  
  
 }  
  render() {
    return (
      <section className="login-page">
      <form >

      <div className="box">
        <div className="form-head">

            <div className="form-body">
              <label htmlFor="Etudiant">Etudiant :</label>
              <label htmlFor ="NomEtudiant">Nom:</label>
              <input
                placeholder="Nom"
                type="text"
                name="NomEtudiant"
                value={this.state.NomEtudiant}
              />
            </div>
            <div className="form-body">
              <label htmlFor ="PrénomEtudiant">Prénom:</label>
              <input
                placeholder="Prénom"
                type="text"
                name="PrenomEtudiant"
                value={this.state.PrenomEtudiant}
              />
            </div>
            <div className="form-body">
              <label htmlFor ="TelEtudiant">Tel:</label>
              <input
                placeholder="Tel"
                type="text"
                name="TelEtudiant"
                value={this.state.TelEtudiant}
                onChange={this.handleTelEtudiantChange}
              />
            </div>
            
            <div className="form-body">
              <label htmlFor="Tuteur">Tuteur :</label>
              <label htmlFor ="NomTuteur">Nom:</label>
              <input
                placeholder="Nom"
                type="text"
                name="NomTuteur"
                value={this.state.NomTuteur}
                onChange={this.handleNomTuteurChange}
              />
            </div>
            <div className="form-body">
              <label htmlFor ="PrénomTuteur">Prénom:</label>
              <input
                placeholder="Prénom"
                type="text"
                name="PrénomTuteur"
                value={this.state.PrénomTuteur}
                onChange={this.handlePrénomTuteurChange}
              />
            </div>
            <div className="form-body">
              <label htmlFor ="TelTuteur">Tel:</label>
              <input
                placeholder="Tel"
                type="text"
                name="TelTuteur"
                value={this.state.TelTuteur}
                onChange={this.handleTelTuteurChange}
              />
            </div>
            
              <div className="form-body">
              <label htmlFor="Date">Date d'entrée en DES :</label>
       
              <input
                placeholder="jj/mm/aaaa"
                type="text"
                name="Date"
                value={this.state.Date}
              />
          </div>

            
        </div>
      </div>
       
      </form>
            </section>  
             
    );}
              }
              export default Etudiant
