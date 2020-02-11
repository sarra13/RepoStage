import ListGroup from 'react-bootstrap/ListGroup';
import {MDBTableHead,MDBTableBody,MDBTable} from 'mdbreact';
import Table from 'react-bootstrap/Table'
import React, { Component } from "react";
import Formulaire from './Formulaire';
import Tab1 from './Tab1';






class Tab  extends Component {
  constructor( props ){
    super( props )
    this.state = { show : false ,
  
  choixdes:0,
    };
    
    this.toggleDiv1 = this.toggleDiv1.bind(this)



}

toggleDiv1 = (choixdes) => {
  const {show} =this.state
    this.setState( { choixdes : choixdes , show: true} )
}




render(){
  
    return (
      <React.Fragment>
        <Table striped bordered hover bordered >
        
          <tr>
            <th  style={{textAlign: "center" , verticalAlign: "middle",cursor:"pointer" }} onClick={ ()=>this.toggleDiv1(1) }>DES 1</th>
          
            <th  style={{textAlign: "center" , verticalAlign: "middle",cursor:"pointer"}} onClick={()=> this.toggleDiv1(2) }> DES 2</th>
          
            <th style={{textAlign: "center" , verticalAlign: "middle" ,cursor:"pointer"}} onClick={ ()=>this.toggleDiv1(3) }>DES 3</th>     
          
          </tr>
      </Table>  

      {  this.state.show ?
          <Tab1  choixdes={this.state.choixdes} numEtu={this.props.numEtu} isTuteur={this.props.isTuteur}/>
          :
          null
      }
 </React.Fragment>

 
            
);}
}





export default Tab;