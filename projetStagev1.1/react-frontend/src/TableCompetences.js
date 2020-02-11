import React , { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead,MDBBtnGroup ,MDBBtn} from 'mdbreact';
import axios from 'axios';

class TableCompetences extends Component {


          constructor(props){
          super(props)
          this.state ={
            dataRetreived : [],
            compentenceIndex : 0,
            }


            this.changeBilan1 = this.changeBilan1.bind(this);
            this.changeBilan2 = this.changeBilan2.bind(this);
            this.changeBilan3 = this.changeBilan3.bind(this);  
          }

  componentDidMount() {
         if (   Number.isInteger(parseInt(this.props.numEtu,10)) && Number.isInteger(parseInt(this.props.compentenceIndex,10)) ){
              axios.get("/getDataSurEtudiant?competence="+this.props.compentenceIndex+"&numEtu="+this.props.numEtu)
                 .then(response => {
                   this.setState({
                     dataRetreived : response.data
                   })
                 })
              axios.get("/isVerrouille?etudiant="+this.props.numEtu)
                 .then(response => {
                   this.setState({
                     isVerrouille :response.data.isVerrouille
                   })
                 })
        }   
  }

  componentWillReceiveProps(newProps) {
   if ( ( this.props.numEtu !==  newProps.numEtu &&  Number.isInteger(parseInt(newProps.numEtu,10)) ) || (this.props.compentenceIndex !==  newProps.compentenceIndex &&  Number.isInteger(parseInt(newProps.compentenceIndex,10)) )){
       
              axios.get("/getDataSurEtudiant?competence="+newProps.compentenceIndex+"&numEtu="+newProps.numEtu)
             .then(response => {
               this.setState({
                 dataRetreived : response.data
               })
             })  
              axios.get("/isVerrouille?etudiant="+newProps.numEtu)
             .then(response => {
               this.setState({
                 isVerrouille :response.data.isVerrouille
               })
             })  
   }
  }    

changeBilan1 = (event , index) => {
  var dataRetreivedCopy = this.state.dataRetreived ;
  dataRetreivedCopy[index].bilan1 = parseInt(event.target.value) ;
  if(parseInt(event.target.value)==2){
      dataRetreivedCopy[index].bilan2 = 2 ;
      dataRetreivedCopy[index].bilan3 = 2 ;
  }

  this.setState({
        dataRetreived : dataRetreivedCopy
  })

    axios.get("/updateItemEtu"+
      "?id=" + dataRetreivedCopy[index].id+
      "&bilan1=" + dataRetreivedCopy[index].bilan1+
      "&bilan2=" + dataRetreivedCopy[index].bilan2+
      "&bilan3=" + dataRetreivedCopy[index].bilan3
    ).then(response => {
             }) 

}
changeBilan2 = (event , index) => {
  var dataRetreivedCopy = this.state.dataRetreived ;

  dataRetreivedCopy[index].bilan2 = parseInt(event.target.value) ;
  if(parseInt(event.target.value)==2){
      dataRetreivedCopy[index].bilan3 = 2 ;
  }

  this.setState({
        dataRetreived : dataRetreivedCopy
  })

    axios.get("/updateItemEtu"+
      "?id=" + dataRetreivedCopy[index].id+
      "&bilan1=" + dataRetreivedCopy[index].bilan1+
      "&bilan2=" + dataRetreivedCopy[index].bilan2+
      "&bilan3=" + dataRetreivedCopy[index].bilan3
    ).then(response => {
             }) 

}
changeBilan3 = (event , index) => {
  var dataRetreivedCopy = this.state.dataRetreived ;
  dataRetreivedCopy[index].bilan3 = event.target.value ;
  this.setState({
        dataRetreived : dataRetreivedCopy
  })

    axios.get("/updateItemEtu"+
      "?id=" + dataRetreivedCopy[index].id+
      "&bilan1=" + dataRetreivedCopy[index].bilan1+
      "&bilan2=" + dataRetreivedCopy[index].bilan2+
      "&bilan3=" + dataRetreivedCopy[index].bilan3
    ).then(response => {
             }) 
}

render()
  {
    let previouscapCom="";

    return (
  
        <MDBTable striped>
          <MDBTableHead>
      <tr  >
        <th  style={{textAlign: "center" , verticalAlign: "middle"}}  
 rowSpan="2" >Capacité Commune</th>
         <th  style={{textAlign: "center" , verticalAlign: "middle"}}  
 rowSpan="2" >#</th>
        <th  style={{textAlign: "center" , verticalAlign: "middle"}}  
 rowSpan="2" >Item</th>
        <th colSpan="3" style={{textAlign: "center" }}  >Niveau</th>
      </tr>
      <tr> 
        <th style={{textAlign: "center" }} >Bilan 1</th>
        <th style={{textAlign: "center" }} >Bilan 2</th>
        <th style={{textAlign: "center" }} >Bilan 3</th>
      </tr>
    </MDBTableHead>
       <MDBTableBody>
  
    {  this.state.dataRetreived.length ?
       this.state.dataRetreived.map( (element,index) =>  


      <tr key={element.id} >


         <td> {previouscapCom==element.capComNom ? "" : previouscapCom=element.capComNom}</td>


        <td>{element.id}</td>
        <td width="70%" style={{color: element.niveau==1 ?"#f00":element.niveau==2 ?"#ff0":"#0f0" }} >

          {element.nom}
        </td>
        <td width="10%"> 
         {this.state.isVerrouille == "true" ? 

          <div style={{textAlign: "center" }} >{element.bilan1==0 ?"non acquis" :element.bilan1==1 ?"en cours"  :"acquis"}</div>

          :
                <select 
                  value={element.bilan1} 
                  style={{backgroundColor:element.bilan1==0 ?"#f00":element.bilan1==1 ?"#ff0":"#0f0"}} 
                  onChange={(e) => this.changeBilan1(e,index)}  
                  className="browser-default custom-select">
                   

                <option value="0">Non Acquis</option>
                <option value="1">En Cours</option>
                <option value="2">Acquis</option>
              </select> 

        }
        </td>
        <td width="10%"> 
         {this.state.isVerrouille == "true"  ? 

          <div style={{textAlign: "center" }} >{element.bilan2==0 ?"non acquis" :element.bilan2==1 ?"en cours"  :"acquis"}</div>

          :

              <select 
                value={element.bilan2} 
                style={{backgroundColor:element.bilan2==0 ?"#f00":element.bilan2==1 ? "#ff0":"#0f0"}} 
                onChange={(e) => this.changeBilan2(e,index)} 
                className="browser-default custom-select">

                <option value="0">Non Acquis</option>
                <option value="1">En Cours</option>
                <option value="2">Acquis</option>
              </select> 
        }
        </td> 
        <td width="10%"> 

        {this.state.isVerrouille == "true"  ? 

          <div style={{textAlign: "center" }} >{element.bilan3==0 ?"non acquis" :element.bilan3==1 ?"en cours"  :"acquis"}</div>

          :

              <select 
                value={element.bilan3} 
                style={{backgroundColor:element.bilan3==0 ?"#f00" :element.bilan3==1 ?"#ff0"  :"#0f0"}} 
                onChange={(e) => this.changeBilan3(e,index)} 
                className="browser-default custom-select">
                <option value="0">Non Acquis</option>
                <option value="1">En Cours</option>
                <option value="2">Acquis</option>
              </select> 
        }
        </td>

      </tr>)
     : null
   }
     </MDBTableBody>
     </MDBTable>
  
    );}
}

export default TableCompetences;

