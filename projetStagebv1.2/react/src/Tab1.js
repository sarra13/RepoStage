
import Formulaire from './Formulaire';

import {MDBTableHead,MDBTableBody,MDBTable,MDBBtnGroup,MDBBtn} from 'mdbreact';
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
            <div style={{textAlign: "center"}}>  
                  <MDBBtnGroup>
                    <MDBBtn color="grey lighten-5"  outline={this.state.choixsem == 1 ? true  : false}  onClick={ ()=>this.toggleDiv1(1) } >Semestre 1</MDBBtn>
                    <MDBBtn color="grey lighten-5"  outline={this.state.choixsem == 2 ? true  : false}  onClick={ ()=>this.toggleDiv1(2) } >Semestre 2</MDBBtn>
                  </MDBBtnGroup>
            </div>
  {  this.props.choixdes !=0 && this.state.show ?
  <div>
   <Formulaire 
        choixsem={this.state.choixsem}
        choixdes={this.props.choixdes} 
        numEtu={this.props.numEtu} 
        /> 
        </div>
        :
        
        null
  }
 </React.Fragment>
    
   ) }
  }
  export default Tab1;