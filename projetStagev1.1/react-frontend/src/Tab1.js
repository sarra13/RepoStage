
import Formulaire from './Formulaire';

import {MDBTableHead,MDBTableBody,MDBTable} from 'mdbreact';
import Table from 'react-bootstrap/Table'
import React, { Component } from "react";


class Tab1 extends Component{
    constructor( props ){
        super( props )
        this.state = { show : false ,
          choixsem:0,
           
        };
        this.toggleDiv1 = this.toggleDiv1.bind(this)


        
    
    
    }
  
    toggleDiv1 = (choixsem) => {
      const{show}=this.state
     
        this.setState( { choixsem : choixsem , show: true} )
    }
    
   
    render(){
        return(
           <React.Fragment>
          <Table striped bordered hover bordered >
            <tbody>
            <tr>
              <td style={{textAlign: "center" , verticalAlign: "middle",cursor:"pointer" }} onClick={ () =>this.toggleDiv1(1)}>Semestre 1</td>
              <td style={{textAlign: "center" , verticalAlign: "middle",cursor:"pointer" }} onClick={ () =>this.toggleDiv1(2) } >Semestre 2</td>
      </tr>
</tbody>
  </Table>  
  {  this.props.choixdes !=0 && this.state.show ?
   <Formulaire 
        choixsem={this.state.choixsem}
        choixdes={this.props.choixdes} 
        numEtu={this.props.numEtu} 
        /> 
        :
        null
  }
 </React.Fragment>
    
   ) }
  }
  export default Tab1;