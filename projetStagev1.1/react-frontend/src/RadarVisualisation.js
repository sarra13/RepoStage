import React , { Component } from 'react';
import logo from './logo.svg';

import { Radar,Bar} from 'react-chartjs-2';

import { BrowserRouter as Router } from 'react-router-dom';

import axios from 'axios';

class RadarVisualisation extends Component{

constructor(props){
  super(props)
  this.state ={
          numEtu : '',
          data : {},
          options : {
            scale: {
              ticks: {
                    beginAtZero: true,
                    max: 100,
                    min: 0,
                    stepSize: 10
                }
            }
          },


    }
  }

  componentDidMount(){
    axios.get("/getCapaciteCommune")
      .then(response => {       
        this.setState({
              labels : response.data
          })
      } 
     )

  if (Number.isInteger(parseInt(this.props.numEtu,10)) )
        this.getInformation(this.props.numEtu);
  }


componentWillReceiveProps(newProps) {
 if (this.props.numEtu !==  newProps.numEtu &&  Number.isInteger(parseInt(newProps.numEtu,10)) ){
     this.getInformation(newProps.numEtu);

 }
}

getInformation = (numEtu) => {
          axios.get("/getMoyenneEtudiant?numEtu="+numEtu)
            .then(response => {
              console.log(response);
                let dataCopy = {
                labels: this.state.labels
                 ,datasets: [
                  {
                    label: 'Bilan1',
                    backgroundColor: 'rgba(179,181,198,0.5)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: response.data.etudiant.Bilan1
                  }, {
                    label: 'Niveau Attendu 1',
                    backgroundColor: 'rgba(140,140,140,0.2)',
                    borderColor: 'rgba(140,140,140,0.2)',
                    pointBackgroundColor: 'rgba(140,140,140,0.2)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(140,140,140,0.2)',
                    data: response.data.model.Bilan1,
                    hidden : true
                  },
                  {
                    label: 'Bilan2',
                    backgroundColor: 'rgba(255,99,132,0.3)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: response.data.etudiant.Bilan2,
                    hidden : true
                  },  {
                    label: 'Niveau Attendu 2',
                    backgroundColor: 'rgba(140,140,140,0.2)',
                    borderColor: 'rgba(140,140,140,0.2)',
                    pointBackgroundColor: 'rgba(140,140,140,0.2)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(140,140,140,0.2)',
                    data: response.data.model.Bilan2,
                    hidden : true
                  }
                  ,
                  {
                    label: 'Bilan3',
                    backgroundColor: 'rgba(140,191,28,0.2)',
                    borderColor: 'rgba(140,191,28,1)',
                    pointBackgroundColor: 'rgba(140,191,28,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(140,191,28,1)',
                    data: response.data.etudiant.Bilan3,
                    hidden : true
                  }
                  , {
                    label: 'Niveau Attendu 3',
                    backgroundColor: 'rgba(140,140,140,0.2)',
                    borderColor: 'rgba(140,140,140,0.2)',
                    pointBackgroundColor: 'rgba(140,140,140,0.2)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(140,140,140,0.2)',
                    data: response.data.model.Bilan3,
                    hidden : true
                  }
                ]
              }
     

        this.setState({
          data : dataCopy
        })
  
      })
}

  

 render(){
  return (
     <Radar height={120} data={this.state.data} options={this.state.options} />
  );
  }
}
     

export default RadarVisualisation;