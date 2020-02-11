import ListGroup from 'react-bootstrap/ListGroup';
import {MDBTableHead,MDBTableBody,MDBTable} from 'mdbreact';
import Table from 'react-bootstrap/Table'
import React, { Component } from "react";
import Formulaire from './Formulaire';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';






class Tab  extends Component {
  constructor( props ){
    super( props )
    this.state = { show : false ,
  
  choixdes:0,
  numEtu:4,
    };
    
    this.toggleDiv1 = this.toggleDiv1.bind(this)



}

toggleDiv1 = (choixdes) => {
  const {show} =this.state
    this.setState( { choixdes : choixdes , show: !show } )
}




render(){
  
    return (

        <Table striped bordered hover bordered >
        
          <tr>
            <th  style={{textAlign: "center" , verticalAlign: "middle",cursor:"pointer" }} onClick={ ()=>this.toggleDiv1(1) }>DES 1</th>
          
            <th  style={{textAlign: "center" , verticalAlign: "middle",cursor:"pointer"}} onClick={()=> this.toggleDiv1(2) }> DES 2</th>
          
            <th style={{textAlign: "center" , verticalAlign: "middle" ,cursor:"pointer"}} onClick={ ()=>this.toggleDiv1(3) }>DES 3</th>     
          
</tr>

{  this.state.choixdes ==1 && this.state.show ?


<td>{  <Tab1  choixdes={this.state.choixdes} numEtu={this.state.numEtu}/> } </td>

: this.state.choixdes ==2 && this.state.show ?
<tr>
<td></td>
<td>{  <Tab1  choixdes={this.state.choixdes} numEtu={this.state.numEtu}/> } </td>
</tr>
:this.state.choixdes ==3 && this.state.show ?
<tr>
<td></td>
  <td></td>
<td>{  <Tab1  choixdes={this.state.choixdes} numEtu={this.state.numEtu}/> } </td>
</tr>
:
null }







            
            
            
      </Table>  
);}
}





export default Tab;