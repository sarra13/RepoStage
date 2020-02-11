import React , {Component} from 'react';
import { scaleDown as Menu } from 'react-burger-menu'
import Select from 'react-select';

import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import {MDBNavbar,MDBNavbarNav} from 'mdbreact';
import axios from 'axios';
import  './ElementNavbar.css';
import TableCompetences from './TableCompetences';
import Formulaire from './Formulaire';
import RadarVisualisation from './RadarVisualisation'
import Aide from './Aide'
import Etudiant from './Etudiant'
import AdminPanel from './AdminPanel'
import Tab from './Tab'
import { BrowserRouter as Router , Switch, Route,  Link,Redirect,withRouter} from 'react-router-dom';
 import  {Flex} from 'rebass';
class ElementNavbar  extends Component {

        constructor(props){
          super(props)
          this.state ={
            loggedOut : "false",
            numEtu : 0 ,
            dataRetreived : [],
            compentenceIndex : 0,
              selectedOption : '' ,   
              numEtuSelection : ''  ,
              options :[]          
            }

          this.handleCompetanceChange = this.handleCompetanceChange.bind(this);
          this.handlenumEtuChange = this.handlenumEtuChange.bind(this);
          }


    handleCompetanceChange = (event) => {
                console.log("num etu comp change" + this.state.numEtu)

            this.setState({
              compentenceIndex : event.target.value
            })  
      }

      handlenumEtuChange = selectedOption => {
          console.log("num etu change " + this.state.numEtu)

            this.setState({
              numEtu : selectedOption.value ,
              numEtuSelection : selectedOption 
            })  

            if(localStorage.isEtudiant =="false" && Number.isInteger(parseInt(selectedOption.value,10))  ){
              axios.get("/isTuteurPourEtudiant?etudiant="+selectedOption.value+"&tuteur="+localStorage.userId)
               .then(response => {
                 this.setState({
                   isTuteur : response.data.isTuteur,
                   isVerrouille : response.data.isVerrouille
                 })
                 console.log(response.data)
               })               
            }
      }

  
      componentDidMount(){
               this.setState({
                 isEtudiant : this.props.isEtudiant,
                 userId : this.props.userId
               })
               if(this.props.isEtudiant == "true"){
                    this.setState({
                     numEtu :this.props.userId
                   })

               }
               else if(localStorage.isAdmin=="true"){
                    axios.get("/getEtudiantsPourEnseignant?admin=admin")
                         .then(response => {
                           this.setState({
                             options:response.data
                           })
                         })
                    }else
                      {
                        axios.get("/getEtudiantsPourEnseignant?enseignant="+localStorage.userId)
                             .then(response => {
                               this.setState({
                                 options:response.data
                               })
                             })  
                      }                  

                  
      }

      logout(){
        this.setState({loggedOut : "true"});
        localStorage.clear();
          window.location.href = '/';
      }

      verrouiller(){
             axios.get("/VerrouillerCompetencecsEtudiant?etat=1&id="+this.state.numEtu);
             this.setState({isVerrouille : "true"});
      }

      deverrouiller(){
             axios.get("/VerrouillerCompetencecsEtudiant?etat=0&id="+this.state.numEtu)
             this.setState({isVerrouille : "false"}); 
      }



  render()
      {  return (
            <Router>

      <Menu>

         <Link  className="menu-item" to="/">Acceuil</Link>

         <Link className="menu-item" to="/competences">Compétences</Link>

         <Link className="menu-item" to="/synthese">Synthèse</Link>

         <Link className="menu-item" to="/stages">Stages</Link> 

         <Link className="menu-item" to="/etudiant">Informations Etudiant</Link> 

         {this.props.isAdmin == "true"  ? 
           <Link className="menu-item" to="/admin">Panneau d'Administration</Link> 
           :
           null
         }
     

          { this.props.isEtudiant=="false" ?

          <React.Fragment>

             
               <Select
                  placeholder="Choisir Etudiant"
                  value={this.state.numEtuSelection}
                  onChange={this.handlenumEtuChange}
                  options={this.state.options}
                />
             



          </React.Fragment>
          :
          null 
         }
      </Menu>
            <MDBNavbar  color="info-color"  expand="md">
             

<MDBNavbarNav right>


                     <Button onClick={this.logout.bind(this)} >logout</Button>
              </MDBNavbarNav>                 
              </MDBNavbar>


                     <Route exact path="/">

                        <Aide /> 
                     </Route>

                      <Route  path="/competences">
                        <div style={{margin:"10px",width:"50%"}}>
                            <select value={this.state.compentenceIndex} onChange={this.handleCompetanceChange}   className="browser-default custom-select">
                              <option value="0" disabled>Choisir Competance</option>
                              <option value="1">Premiers recours Urgences</option>
                              <option value="2">Communication Centrée Patient</option>
                              <option value="3">Approche Globale Complexité</option>
                              <option value="4">Continuité suivi Coordination</option>
                              <option value="5">Education Prévention</option>
                              <option value="6">Professionalisme</option>
                            </select>
                          </div>
                        <TableCompetences compentenceIndex={this.state.compentenceIndex} numEtu={this.state.numEtu} />
                      </Route>

                      <Route  path="/admin">
                          <AdminPanel/>
                      </Route>

                      <Route path="/synthese">
                          <RadarVisualisation numEtu={this.state.numEtu} /> 
                      </Route>

         <Route path="/stages">
                        <Tab numEtu={this.state.numEtu} isTuteur={this.state.isTuteur}></Tab>
                      </Route>

                     <Route path="/etudiant">
                      <Etudiant numEtu={this.state.numEtu}/>
                        </Route>
     

             

            </Router>
        )
  }

}

export default ElementNavbar;