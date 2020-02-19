import React, { Component } from "react";
import axios from 'axios';
import {MDBAlert} from 'mdbreact';
import {MDBBtnGroup} from 'mdbreact';

import"./Formulaire.css";
import DatePicker from "react-datepicker";
 import Select from 'react-select';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
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
      TuteursOptions:"",
      error:false,
      Responsable: "",
      MaitreDeStage:"",
      MaitreDe:"",
      maxDate:"",
      minDate:"",
      startDate: new Date(),
      startDateValueToDB: "",
      endDate:new Date(),
      endDateValueToDB:"",
      numResponsable : "" ,
      numEncadrant2:"",
      numEncadrant1:"",
      numEncadrant2Selection:"",
      numEncadrant1Selection:"",
      numResponsableSelection : "" ,
      isLieu:0,
      show : false ,
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
      Terrains:[
        
          {idterrain:'1',nom:"Urgences SMUR , CH BRIVE"},
          {idterrain:'2',nom:"Urgences SMUR , CH d'USSEL"},

        
      ] ,    
       datareceived:"",
      modal: false,
       numLieuStage:0,
       numIDStage:0,
      isLieu:"",
      
     }
      this.handleSubmit  = this.handleSubmit .bind(this);
      this.switchIsLieu = this.switchIsLieu.bind(this)

  }
 
toggleModalSuccesEnvoi = () => {
  this.setState({
    modal: !this.state.modal
  });
}


    handleStagesChange = (event , index) => {
      var data = this.state.stages ;
          this.setState({
            stages : data,
            numIDStage :event.target.value
      })
      
      }  

      handleTerrainChange = (e , index) => {
        var data1 = this.state.Terrains ;
      
       this.state. numLieuStage= e.target.value ;
        this.setState({
              Terrains : data1
        })
        
        }  

    handleResponsableChange = selectedOption => {

            this.setState({
              numResponsable : selectedOption.value ,
              numResponsableSelection : selectedOption 
            }) 
            console.log(selectedOption) 
      }
      handleMaitreDeStageChange = selectedOption => {

        this.setState({
          numEncadrant1 : selectedOption.value ,
          numEncadrant1Selection : selectedOption 
        }) 
        console.log(selectedOption) 
  }
  handleMaitreDeChange = selectedOption => {

    this.setState({
      numEncadrant2: selectedOption.value ,
      numEncadrant2Selection : selectedOption 
    }) 
    console.log(selectedOption) 
}

  handleDateDebutChange = date => {
    this.setState({
      startDate: date,
      startDateValueToDB : (date.getYear()+1900)+"-"+ (date.getMonth() +1)+"-"+date.getDate()
    });
  };

    handleDateFinChange = date => {
    this.setState({
      endDate: date,
      endDateValueToDB : (date.getYear()+1900)+"-"+ (date.getMonth() +1)+"-"+date.getDate()
    });
  };
 
  validate=() =>{
      let ResponsableError="";
      let DateDebutError="";
      let  DateFinError="";

   if(!this.state. startDateValueToDB){
     DateDebutError="case non remplie";
   }
  
   if(!this.state.endDateValueToDB){
    DateFinError="case non remplie";
  }
  

    if(!this.state.numResponsable ){
      ResponsableError='case non remplie';
    }



  if(ResponsableError || DateDebutError || DateFinError){
    this.setState({ResponsableError,DateDebutError,DateFinError});
    return false;
  }
  return true;
};
switchIsLieu = (isLieu) => {
    this.setState( {
     isLieu : isLieu
          } )
}

  
  handleSubmit = e => {
  e.preventDefault();
    const isValid = this.validate();
    
    if(isValid){
   this.setState(initialState)

       alert("/stages/updateStagePourEtudiant?numetu="+this.props.numEtu+"&DES="+this.props.choixdes+"&Semestre="+this.props.choixsem+"&numIDStage="+this.state.numIDStage+"&isLieu="+this.state.isLieu+"&encadrant1="+this.state.numEncadrant1+"&encadrant2="+this.state.numEncadrant2+"&lieu="+this.state.numLieuStage+ "&nomResponsable="+this.state.numResponsable +"&datedebut="+this.state.startDateValueToDB+ "&datefin="+this.state.endDateValueToDB)
   axios.get("/stages/updateStagePourEtudiant?numetu="+this.props.numEtu+"&DES="+this.props.choixdes+"&Semestre="+this.props.choixsem+"&numIDStage="+this.state.numIDStage+"&isLieu="+this.state.isLieu+"&encadrant1="+this.state.numEncadrant1+"&encadrant2="+this.state.numEncadrant2+"&lieu="+this.state.numLieuStage+ "&nomResponsable="+this.state.numResponsable +"&datedebut="+this.state.startDateValueToDB+ "&datefin="+this.state.endDateValueToDB)

    this.toggleModalSuccesEnvoi();

  }};

  
  componentDidMount() {

   

  if ( Number.isInteger(parseInt(this.props.numEtu,10))&& Number.isInteger(parseInt(this.props.choixsem,10)) &&  Number.isInteger(parseInt(this.props.choixdes,10))  ){
   
      axios.get("/stages/getDataSurStageEtudiant?Semestre="+this.props.choixsem+"&numetu="+this.props.numEtu+"&DES="+this.props.choixdes)
     .then(response => {
      if (response.data.error){
        this.setState({
          error:response.data.error })
        }
        else {

   
       console.log(response.data);
       this.setState({
          numIDStage:response.data.numIDStage,
          numLieuStage:response.data.lieu=='' ? 1 : response.data.lieu ,
          numResponsable:response.data.nomResponsable,
          numEncadrant1:response.data.encadrant1,
          numEncadrant2:response.data.encadrant2,
          numResponsableSelection:"",
          numEncadrant2Selection:"",
          numEncadrant1Selection:"",
          isLieu:response.data.isLieu=='' ? 1 : response.data.isLieu  ,
          startDate:new Date(response.data.datedebut),
          endDate:new Date(response.data.datefin),
          startDateValueToDB:(new Date(response.data.datedebut).getYear()+1900)+"-"+ (new Date(response.data.datedebut).getMonth() +1)+"-"+new Date(response.data.datedebut).getDate(),
          endDateValueToDB:(new Date(response.data.datefin).getYear()+1900)+"-"+ (new Date(response.data.datefin).getMonth() +1)+"-"+new Date(response.data.datefin).getDate(),
       })



        axios.get("/getAllTuteurs")
             .then(response1 => {

                   this.setState({
                     TuteursOptions:response1.data,
                   })
                 
              
                var foundRespo = false;
                var foudEncadrant1 = false;
                var foudEncadrant2 = false;
                response1.data.forEach(element =>{

                  if(parseInt(response.data.nomResponsable,10)==parseInt(element.value,10)){
                    foundRespo = true;
                     this.setState({
                        numResponsableSelection: element
                     })                  
                  }
                  if(parseInt(response.data.encadrant1,10)==parseInt(element.value,10)){
                    foudEncadrant1 = true;
                     this.setState({
                        numEncadrant1Selection: element
                     })                  
                  }
                  if(parseInt(response.data.encadrant2,10)==parseInt(element.value,10)){
                    foudEncadrant2 = true;
                     this.setState({
                        numEncadrant2Selection: element
                     })                  
                  }

                })

                  if (!foundRespo){ 
                    this.setState({
                        numResponsableSelection: "Choisir",
                        numResponsable: "0"
                    })  
                  }
                  if (!foudEncadrant1){ 
                      this.setState({
                        numEncadrant1Selection: "Choisir1",
                        numEncadrant1: "0"
                            })  
                   }
                  if (!foudEncadrant2){ 
                    this.setState({
                      numEncadrant2Selection: "Choisir2",
                      numEncadrant2: "0"
                   })  
                  }
             })

      }
     })  
 }
};


componentWillReceiveProps(newProps) {

  if (  (this.props.numEtu !==  newProps.numEtu &&  Number.isInteger(parseInt(newProps.numEtu,10)) ) || ( this.props.choixsem !==  newProps.choixsem &&  Number.isInteger(parseInt(newProps.choixsem,10)) ) || (this.props.choixdes !==  newProps.choixdes &&  Number.isInteger(parseInt(newProps.choixdes,10)))  ){

             axios.get("http://127.0.0.1:3001/stages/getDataSurStageEtudiant?Semestre="+newProps.choixsem+"&numetu="+newProps.numEtu+"&DES="+newProps.choixdes)
            .then(response => {
            
if(response.data.error){
  this.setState({
    error : response.data.error
  })
}
            else{
                  this.setState({
                    numIDStage:response.data.numIDStage,
                    numLieuStage:response.data.lieu,
                    numResponsable:response.data.nomResponsable,
                    numEncadrant1:response.data.encadrant1,
                    numEncadrant2:response.data.encadrant2,
                    numResponsableSelection:"",
                    numEncadrant2Selection:"",
                    numEncadrant1Selection:"",
                    isLieu:response.data.isLieu,
                    startDate:new Date(response.data.datedebut),
                    endDate:new Date(response.data.datefin),
                    startDateValueToDB:(new Date(response.data.datedebut).getYear()+1900)+"-"+ (new Date(response.data.datedebut).getMonth() +1)+"-"+new Date(response.data.datedebut).getDate(),
                    endDateValueToDB:(new Date(response.data.datefin).getYear()+1900)+"-"+ (new Date(response.data.datefin).getMonth() +1)+"-"+new Date(response.data.datefin).getDate(),
                })
              

                 axios.get("/getAllTuteurs")
                 .then(response1 => {

                       this.setState({
                         TuteursOptions:response1.data,
                       })
                     
                  
                    var foundRespo = false;
                    var foudEncadrant1 = false;
                    var foudEncadrant2 = false;
                    response1.data.forEach(element =>{

                      if(parseInt(response.data.nomResponsable,10)==parseInt(element.value,10)){
                        foundRespo = true;
                         this.setState({
                            numResponsableSelection: element
                         })                  
                      }
                      if(parseInt(response.data.encadrant1,10)==parseInt(element.value,10)){
                        foudEncadrant1 = true;
                         this.setState({
                            numEncadrant1Selection: element
                         })                  
                      }
                      if(parseInt(response.data.encadrant2,10)==parseInt(element.value,10)){
                        foudEncadrant2 = true;
                         this.setState({
                            numEncadrant2Selection: element
                         })                  
                      }

                    })

                      if (!foundRespo){ 
                        this.setState({
                            numResponsableSelection: "Choisir",
                            numResponsable: "0"
                        })  
                      }
                      if (!foudEncadrant1){ 
                          this.setState({
                            numEncadrant1Selection: "Choisir1",
                            numEncadrant1: "0"
                                })  
                       }
                      if (!foudEncadrant2){ 
                        this.setState({
                          numEncadrant2Selection: "Choisir2",
                          numEncadrant2: "0"
                       })  
                      }
                 })
            }

            })  


            
  
 }  }
 


  render() {
if (this.props.numEtu=='' || this.state.error){
  return (
  <MDBContainer>
      <MDBAlert color="warning" dismiss>
        <strong>ERREUR !</strong> Merci de Choisir un etudiant.
      </MDBAlert>
    </MDBContainer>);
}
else
    return (
      <div>
      <form onSubmit={this.handleSubmit}>

      <div className="wrapper">
        <div className="form-wrapper">

          <h1> Remplir la formulaire de DES {this.props.choixdes} , Semestre {this.props.choixsem}:</h1>
    
            <div className="Sujet">
              <label htmlFor="Sujet">Sujet:</label>
                <select className="browser-default custom-select" value={this.state.numIDStage} onChange={this.handleStagesChange} >
                {this.state.stages.map((stage,index) =>(
                    this.props.choixdes ==stage.DES ?
                  <option key={stage.id} value={stage.id}>{stage.sujet}</option>
                  :
                  null
                  ))
                }
              
                onChange={this.handleStagesChange}
                
          
                </select>
            </div>
            <div className="Responsable">
              <label htmlFor="Responsable">Responsable pédagogique:</label>

                <Select 
                  placeholder="Choisir Responsable"
                  value={this.state.numResponsableSelection}
                  onChange={this.handleResponsableChange}
                  options={this.state.TuteursOptions}
                />

              <div style={{ fontSize: 10,color:"red"}}>{this.state.ResponsableError}</div>
            </div>
            
            <React.Fragment>
<div style={{textAlign: "center"}}> 

      <MDBBtnGroup >
        <MDBBtn color="grey lighten-5"
             outline={this.state.isLieu == "0" ? true  : false}
             onClick={ () => this.switchIsLieu("0") }
             >Maitres De Stage</MDBBtn>
        <MDBBtn 
              color="grey lighten-5"    
              outline={this.state.isLieu == "1" ? true  : false}  
              onClick={ () => this.switchIsLieu("1") } 
              >Terrain De Stage</MDBBtn>
       
      </MDBBtnGroup>
</div> 
      {   this.state.isLieu =="1" ?
 
      
          <div className="Terrain">
              <label htmlFor="Terrain">Terrain de stage hospitalier:</label>

              <select className="browser-default custom-select" numLieuStage={this.state.numLieuStage} onChange={this.handleTerrainChange} >
                {this.state.Terrains.map((terrain,index) =>(
                    
                  <option key={terrain.idterrain} value={terrain.idterrain}>{terrain.nom}</option>
                
                  
                  ))
                }
              
                onChange={this.handleTerrainChange}
                
          
                </select>
                </div>
          :
          <React.Fragment>
            <div className="M1">
              <label htmlFor="M1">Maitre de stage universitaire 1:</label>

                <Select 
                  placeholder="Choisir Maitre de stage universitaire 1"
                  value={this.state.numEncadrant1Selection}
                  onChange={this.handleMaitreDeStageChange}
                  options={this.state.TuteursOptions}
                />

              <div style={{ fontSize: 10,color:"red"}}>{this.state.ResponsableError}</div>
            </div>
            <div className="M2">
              <label htmlFor="M2">Maitre de stage universitaire 2:</label>

                <Select 
                  placeholder="Choisir Maitre de stage universitaire 2"
                  value={this.state.numEncadrant2Selection}
                  onChange={this.handleMaitreDeChange}
                  options={this.state.TuteursOptions}
                />

              <div style={{ fontSize: 10,color:"red"}}>{this.state.ResponsableError}</div>
            </div>
          
            </React.Fragment>
      }
 </React.Fragment>

              <div className="DateDebut">
              <label htmlFor="DateDebut">Date Début:</label>
                 
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleDateDebutChange}
                  dateFormat="d/MM/yyyy"

                  />
                  
          
                <div style={{ fontSize: 10,color:"red"}}>{this.state.DateDebutError}</div>


          </div>
            <div className="DateFin">
              <label htmlFor="DateFin">Date Fin:</label>
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleDateFinChange}
                  dateFormat="d/MM/yyyy"
                  minDate={this.state.startDate}
                />
                        
   

                 <div style={{ fontSize: 10,color:"red"}}>{this.state.DateFinError}</div>

            </div>
<div>
              <MDBBtn type="submit" color="grey lighten-2"  className="ok">Envoyer</MDBBtn>
              </div>
        </div>
      </div>
      <div>
     <MDBContainer>
      <MDBModal isOpen={this.state.modal} toggle={this.toggleModalSuccesEnvoi}>
        <MDBModalHeader toggle={this.toggleModalSuccesEnvoi}></MDBModalHeader>
        <MDBModalBody>
          Formulaire Envoyée avec succès
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={this.toggleModalSuccesEnvoi} >Fermer</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    </div>
      </form>
      </div>      
             
    );}
}


export default Formulaire;
