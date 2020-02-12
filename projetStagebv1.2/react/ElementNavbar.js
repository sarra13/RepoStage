import React , {Component} from 'react';
import Select from 'react-select';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button'
import Divider from '@material-ui/core/Divider';


import {Navbar,Nav,Form,FormControl} from 'react-bootstrap';
import {MDBNavbar} from 'mdbreact';
import axios from 'axios';
import  './ElementNavbar.css';
import TableCompetences from './TableCompetences';
import RadarVisualisation from './RadarVisualisation'
import Aide from './Aide'
import AdminPanel from './AdminPanel'
import Tab from './Tab'
import { BrowserRouter as Router , Switch, Route,  Link,Redirect,withRouter} from 'react-router-dom';
import Etudiant from './Etudiant';
const Main = styled.main`
    position: relative;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;

class ElementNavbar  extends Component {

        constructor(props){
          super(props)
          this.state ={
            selected:false,
            expanded: false,
            loggedOut : "false",
            numEtu : 0 ,
            dataRetreived : [],
            compentenceIndex : 0,
              selectedOption : '' ,   
              numEtuSelection : ''  ,
              options :[{"value": "1" , "label" : "etu1"}]          
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
            if(localStorage.isAdmin =="true"){
               axios.get("/isVerrouille?etudiant="+selectedOption.value)
                 .then(response => {
                   this.setState({
                     isTuteur : "true",
                     isVerrouille : response.data.isVerrouille
                   })
                   console.log(response.data.isVerrouille )
                 })     
            } else if(localStorage.isEtudiant =="false" && Number.isInteger(parseInt(selectedOption.value,10))  ){
                axios.get("/isTuteurPourEtudiant?etudiant="+selectedOption.value+"&tuteur="+localStorage.userId)
                 .then(response => {
                   this.setState({
                     isTuteur : response.data.isTuteur,
                     isVerrouille : response.data.isVerrouille
                   })
                   console.log(response.data.isVerrouille )
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

      onSelect = (selected) => {
        this.setState({ selected: selected });
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

  render()
      {  
        
        return (
            <Router>
          
            <SideNav className="side" 
                
                expanded={this.state.expanded}
                onToggle={(expanded) => {
                    this.setState({ expanded });
                }}    
              
                onSelect={this.onSelect}
               
                
          
      >
                <SideNav.Toggle />
                <div
                    style={{
                        padding: '15px 20px 0 20px'
                    }}
                ></div>
                <SideNav.Nav >
                             {this.props.isAdmin == "true"  ? 
                            <NavItem eventKey="/">
                            <NavIcon>
    
                                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}
                                 />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }}>
                            <Link className="lien" to="/admin">Panneau d'Administration</Link> 
                            </NavText>
                        </NavItem>
                             
                       :
                       null
                     }
                      { this.props.isEtudiant=="false" ?
                      <React.Fragment>
                          <div hidden={!this.state.expanded}>
                            <Select inline className="mr-sm-2"
                              placeholder="Choisir Etudiant"
                              value={this.state.numEtuSelection}
                              onChange={this.handlenumEtuChange}
                              options={this.state.options}
                            />
                    </div>
                        {this.state.isTuteur == "true"? 
                            this.state.isVerrouille=="true" ? 
                           <NavItem  >
                              <NavIcon>
                                  <i className="fa fa-fw fa-unlock" style={{ fontSize: '1.75em' }}
                                   />
                              </NavIcon>
                              <NavText style={{ paddingRight: 32 }}>
                              <Link onClick={this.deverrouiller.bind(this)} >Deverrouiller </Link>
                              </NavText>
                          </NavItem>
                          :
                          <NavItem >
                            <NavIcon>
                                  <i className="fa fa-fw fa-lock" style={{ fontSize: '1.75em' }}
                                   />
                              </NavIcon>
                              <NavText style={{ paddingRight: 32 }}>
                              <Link onClick={this.verrouiller.bind(this)} >Verrouiller </Link>
                              </NavText>
                          </NavItem>
                                          
                           : 
                            null
                        }
                      </React.Fragment>
                      :
                      null 
                     }
                     { this.props.isEtudiant=="false" ?
                     <React.Fragment>
                     <Divider className="MuiDivider-root"/>
                     <br>
                      
                     </br>
                     <br></br>
                     <br></br>
                     <br></br>
                     </React.Fragment>

                     :
                     null
                    }
                    <NavItem eventKey="/">
                        <NavIcon>

                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }}
                             />
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }}>
                        <Link className="lien" to="/">Acceuil</Link>
                        </NavText>
                    </NavItem>
                    <NavItem  eventKey="/competences">
                        <NavIcon>

                            <i className="  fa fa-fw   fa-check" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }}>
                        <Link className="lien" to="/competences">Compétences</Link> 

                        </NavText>
                    </NavItem>
                    <NavItem  eventKey="/synthese">
                        <NavIcon>

                            <i className=" fa fa-fw fa-globe" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }}>
                        <Link className="lien" to="/synthese">Synthèse</Link>

                        </NavText>
                    </NavItem>
                    <NavItem  eventKey="/stages">
                        <NavIcon>

                            <i className="fa fa-medkit" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }}>
                        <Link className="lien" to="/stages">Stages</Link> 

                        </NavText>
                    </NavItem>

                    <NavItem >
                        <NavIcon>

                            <i className=" fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }}>
                        <Link className="lien" to="/etudiant">Informations Etudiant</Link> 

                        </NavText>
                    </NavItem>
                    <NavItem >
                        <NavIcon>

                            <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText style={{ paddingRight: 32 }}>
                        <Link onClick={this.logout.bind(this)} >Logout</Link>

                        </NavText>
                    </NavItem>
                    

                </SideNav.Nav>
            </SideNav>
                  <Main expanded={this.state.expanded} >
                     <Route exact path="/">

                        <Aide /> 
                     </Route>

                      <Route  path="/competences">
                        <div style={{margin:"10px",width:"100%"}}>
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
            <Route path="/etudiant">
            <Etudiant numEtu={this.state.numEtu}/>
              </Route>
                      <Route  path="/admin">
                          <AdminPanel/>
                      </Route>

                      <Route path="/synthese">
                          <RadarVisualisation numEtu={this.state.numEtu} /> 
                      </Route>

                      <Route 
                      path="/stages"
                      component={props => < Tab numEtu={this.state.numEtu} isTuteur={this.state.isTuteur}/>}
                      >
                      </Route>
                      </Main>

)}
/>

            </Router>

        )

  }

}

export default ElementNavbar;