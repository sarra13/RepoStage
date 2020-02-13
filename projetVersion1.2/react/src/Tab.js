import ListGroup from 'react-bootstrap/ListGroup';
import {MDBTableHead,MDBTableBody,MDBTable,MDBBtn ,MDBBtnGroup} from 'mdbreact';
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
<div style={{textAlign: "center"}}> 

      <MDBBtnGroup >
        <MDBBtn color="grey lighten-5" style={{width: 300}} outline={this.state.choixdes == 1 ? true  : false}  onClick={ ()=>this.toggleDiv1(1) } >DES 1</MDBBtn>
        <MDBBtn color="grey lighten-5"  style={{width: 300}} outline={this.state.choixdes == 2 ? true  : false}  onClick={ ()=>this.toggleDiv1(2) } >DES 2</MDBBtn>
        <MDBBtn color="grey lighten-5" style={{width: 300}} outline={this.state.choixdes == 3 ? true  : false}  onClick={ ()=>this.toggleDiv1(3) } >DES 3</MDBBtn>
      </MDBBtnGroup>
</div> 
      {  this.state.show ?
      <div>
          <Tab1  choixdes={this.state.choixdes} numEtu={this.props.numEtu} isTuteur={this.props.isTuteur}/>
          </div>
          :
          null
      }
 </React.Fragment>

 
            
);}
}





export default Tab;