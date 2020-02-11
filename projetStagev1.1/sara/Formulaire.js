import React, { Component } from "react";
import axios from 'axios';

import"./Formulaire.css";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

const initialState={
 
        ResponsableError:"",
      
     DateDebutError:"",
     DateFinError:"",

};
const re = /^[0-9\b]+$/;
const re1 = /^[0-9\b]/;

class Formulaire extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      initialState,

      
     

     Responsable: "",
      maxDate:"",
      minDate:"",
      startDate:"",
      endDate:"",
 stages:  [
          { id: '1',DES :"1" , sujet: "Stage d'urgences "},
          { id: '2',DES :"1" , sujet: "Stage chez le praticien de niveau 1" },
          { id: '3',DES :"2" , sujet: "Stage medecine polyvalente"},
          { id: '4',DES :"2" , sujet: "Stage hospitalier de pédiatrie"},
          { id: '5',DES :"2" , sujet: "Stage hospitalier de gynécologie"},
          { id: '6',DES :"3" , sujet: "SASPAS"},
          { id: '7',DES :"3" , sujet: "Stage ambulatoire pédiatrie"},
 
          { id: '8',DES :"3" , sujet: "Stage ambulatoire gynécologie"},
 
 
       ],
       datareceived:"",

       value:0,
      
     }
      
    
    
      this.handleSubmit  = this.handleSubmit .bind(this);
      
  }
 
 
 /* handleStagesChange = e => {

    this.setState({

value: e.target.value   })
    e.preventDefault();}*/


    handleStagesChange = (event , index) => {
      var data = this.state.stages ;
    
     this.state. value= event.target.value ;
      this.setState({
            stages : data
      })
      
      }   

    handleResponsableChange = e => {
      this.setState({
  Responsable: e.target.value 
  .replace(/[0-9+*_()=#$£%!?><:;,&^@}{\b]/, '')
})
      e.preventDefault();}
      
      handleDateDebutChange = e => {

        
        
        this.setState({

    startDate:e.target.value
    .replace(/[a-zA-Z+*_()#=$£%!?><:;,&}{\b]/, '')

    .slice(0, 10)
        })
       }
     /*handleChangeStart = e=> { this.setState({ startDate: e})
     
    }
     handleChangeEnd = e=>{this.setState ({endDate:e})
     
  }*/
  
  handleDateFinChange = e => {
    
   
        this.setState({

    endDate:e.target.value
    .replace(/[a-zA-Z*_()#$\b]/, '')

    .slice(0, 10)
        })
       }
      
  validate=() =>{
    let ResponsableError="";
  
    let DateDebutError="";
   let  DateFinError="";
   
   if(!this.state. startDate){
     DateDebutError="case non remplie";
   }
  
   if(!this.state.endDate){
    DateFinError="case non remplie";
  }
  

    if(!this.state.Responsable ){
      ResponsableError='case non remplie';
    }

  /*  if(re.test(this.state.Responsable)){
      ResponsableError='case invalide';
    }*/
  

  if(ResponsableError || DateDebutError || DateFinError){
    this.setState({ResponsableError,DateDebutError,DateFinError});
    return false;
  }
  return true;
};
  
  handleSubmit = e => {
  e.preventDefault();
    const isValid = this.validate();
    
    if(isValid){
   this.setState(initialState)
alert("Formulaire envoyée")
   
   axios.get("http://127.0.0.1:3001/stages/updateStagePourEtudiant?numetu="+this.props.numEtu+"&DES="+this.props.choixdes+"&Semestre="+this.props.choixsem+"&numIDStage="+this.state.value+ "&nomResponsable="+this.state.Responsable +" &datedebut="+this.state.startDate+ "&datefin="+this.state.endDate)
   .then(response => {
      console.log(response.data);})
    

  }};
  componentDidMount() {
      
    axios.get("http://127.0.0.1:3001/stages/getDataSurStageEtudiant?Semestre="+this.props.choixsem+"&numetu="+this.props.numEtu+"&DES="+this.props.choixdes)
   .then(response => {
     var datareceived=response.data[0]
     
     this.setState({

    
      value:datareceived.numIDStage,

       Responsable:datareceived.nomResponsable,

      startDate:datareceived.datedebut,
      endDate:datareceived.datefin,
        
     })
     console.log(response.data);
   })  
};

componentWillReceiveProps(newProps) {
      
             axios.get("http://127.0.0.1:3001/stages/getDataSurStageEtudiant?Semestre="+newProps.choixsem+"&numetu="+newProps.numEtu+"&DES="+newProps.choixdes)
            .then(response => {
              var datareceived=response.data[0]

              this.setState({

                value:datareceived.numIDStage,
               
               Responsable:datareceived.nomResponsable,
            
               startDate:datareceived.datedebut,
               endDate:datareceived.datefin,
                          })
              console.log(response.data);

            })  
  
 }  
  render() {
   const startDate = new Date().toISOString().slice(0, 10).replace('T', ' ');
  
 /* console.log(startDate)

    const endDate=startDate.setDate+1;*/
 

    return (
      <form onSubmit={this.handleSubmit}>

      <div className="wrapper">
        <div className="form-wrapper">
        { ! this.props.isTuteur ?
          <h1>Remplir la formulaire suivante:</h1>
:
null}
            <div className="Sujet">
              <label htmlFor="Sujet">Sujet</label>

            
              <select value={this.state.value} onChange={this.handleStagesChange} >
              {this.state.stages.map((stage,index) =>(
    this.props.choixdes ==stage.DES ?
                <option key={stage.id} value={stage.id}>{stage.sujet}</option>
                :
                null
                ))}
              />
              onChange={this.handleStagesChange}
              
        
              </select>
              
            
            </div>
           
            <div className="Responsable">
              <label htmlFor="Responsable">Responsable</label>
              <input
              
                placeholder="Nom du responsable"
                type="text"
                name="Responsable"
                value={this.state.Responsable}
                onChange={this.handleResponsableChange}
              />
              <div style={{ fontSize: 10,color:"red"}}>{this.state.ResponsableError}</div>
            </div>
          
              <div className="DateDebut">
              <label htmlFor="DateDebut">Date Début</label>
       
              <input
                placeholder="jj/mm/aaaa"
                type="text"
                name="startDate"
                id="datapicker"
                value={this.state.startDate}

                onChange={this.handleDateDebutChange}

              />
        
          
                <div style={{ fontSize: 10,color:"red"}}>{this.state.DateDebutError}</div>


          </div>
            <div className="DateFin">
              <label htmlFor="DateFin">Date Fin</label>
              <input
                placeholder="jj/mm/aaaa"
                type="text"
                name="endDate"
                id="datapicker"
                value={this.state.endDate}

                onChange={this.handleDateFinChange}

              />
              
   

                 <div style={{ fontSize: 10,color:"red"}}>{this.state.DateFinError}</div>

            </div>
            <div className="Envoyer">
              
            { ! this.props.isTuteur ?
              <button type="submit">Envoyer</button>
              :
              null}
            </div>
        </div>
      </div>
       
      </form>
              
             
    );}
              }


export default Formulaire;
