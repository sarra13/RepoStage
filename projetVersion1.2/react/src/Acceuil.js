import React , { Component } from 'react';
import Portfolio from './Portfolio';
import './bootstrap.min.css'
import './agency.min.css'
import './Potfolio.css'
import s from './img/stages.png';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import S from './img/Synthèse.png';

import c from './img/compétence.png';
import f from './img/fiche.png';


import {MDBTableHead,MDBTableBody,MDBTable,MDBBtn ,MDBBtnGroup} from 'mdbreact';

import { BrowserRouter as Router , Switch, Route,  Link,Redirect,withRouter} from 'react-router-dom';

class Acceuil extends Component{

        constructor(props){
          super(props)
          this.state ={
            }
          }
          logout(){
            this.setState({loggedOut : "true"});
            localStorage.clear();
              window.location.href = '/';
          }
    
 render(){
  
  return (
    <div className="Acceuil">
     
  
  <header className="masthead">
    <div className="container">
      <div className="intro-text">
        <div className="intro-lead-in">Bienvenu dans votre évaluation !</div>
        <div className="intro-heading text-uppercase"></div>

        <a  href="#services"><MDBBtn size="lg"  gradient="cloudy-knoxville" style={{width:200}} onClick={this.onClick}>Besoin d'aide!</MDBBtn></a>

      </div>
    </div>
  </header>

  
  
  <section className="page-section" id="services">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Services</h2>
          <h3 className="section-subheading text-muted"></h3>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary" ></i>
            <li><a href="#team">  <i  className="fa fa-fw fa-heartbeat fa-stack-1x fa-inverse" ></i></a></li>
          </span>
          <br></br>
          <h4 className="service-heading" >Argumentaire</h4>
          <p className="text-muted"></p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <li><a href="#about"> <i className="fa fa-fw fa-cogs fa-stack-1x fa-inverse"></i></a></li>
          </span>
          <br></br>

          <h4  className="service-heading">Plan du site</h4>
          <p className="text-muted"></p>
        </div>
        <div className="col-md-4">
          <span className="fa-stack fa-4x">
            <i className="fa fa-circle fa-stack-2x text-primary"></i>
            <li><a href="/Aide">  <i  className="fa fa-fw fa-laptop fa-stack-1x fa-inverse" ></i></a></li>
            
        </span>
          <br></br>

          <h4 className="service-heading">Guide d'utilisation</h4>
          <p className="text-muted"></p>
        </div>
      </div>
    </div>
  </section>
  <Portfolio></Portfolio>

  <section className="bg-light page-section" id="team">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Argumentaire</h2>
          <h3 className="section-subheading text-muted" style={{ textAlign:'justify'}}> Nous proposons d’utiliser un nouvel outil d’évaluation normative permettant :<br></br>
-De suivre  la progression du niveau d’acquisition des compétences de l’interne au cours du DES.<br></br>
-L’ auto évaluation de l’interne.<br></br>
-La réalisation d’une évaluation en vue d’une certification finale.<br></br>
L’outil pourra être utilisé tout au long des stages aussi bien hospitaliers, qu’ambulatoires,
 mais  les bilans de compétence seront réalisés de  préférence lors des deux derniers mois du stage. Chaque bilan  ne sera finalisé et validé qu’au moment de la rencontre avec le tuteur.
 Cette  validation  se fera entre le 15/08 et le 15/09 de chaque année de DES lors d’une rencontre présentielle entre tuteur et tutoré et est obligatoire pour que l’interne  passe dans l’année supérieure.
</h3>
        </div>
      </div>
      </div>
</section>
  
  <section className="page-section" id="about">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Plan du site</h2>
          <h3 className="section-subheading text-muted">Feuille de route  pour utilisation de l’outil d’évaluation du DES de médecine générale</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <ul className="timeline">
            <li>
              <div className="timeline-image">
                <i  className=" fa fa-fw fa-user"  alt=""/>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>1</h4>
                  <h4 className="subheading">Informations Etudiant</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted" style={{ textAlign:'justify'}}>Quand vous cliquez sur cette icone dans la barre de navigation vous aurez une fiche contenant toutes les informations qui concernent l'étudiant ainsi que son tuteur .</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <i className="  fa fa-fw   fa-check" style={{ fontSize: '1.75em' }} />
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>2</h4>
                  <h4 className="subheading">Compétences Etudiant</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted" style={{ textAlign:'justify'}}> Quand vous cliquez sur cette icone dans la barre de navigation vous aurez une fiche d'auto-évaluation qui correspond  aux six grandes compétences génériques de la médecine générale.<br></br>
                  Pour chaque compétence, il faut renseigner  toutes les capacités communes qui se déroulent au fur et à mesure de l’utilisation donc quand  l’indicateur est   acquis il faut mettre : « Acquis »  s’il n’est pas acquis, il faut mettre : « Non Acquis » sinon s'il est en cours d'acquisition , il faut mettre : « En cours d'acquisition ».<br></br>
                  Les « Acquis » se retrouvent automatiquement dans les bilans suivants  la capacité étant considérée comme validée.
La somme  se calcule  automatiquement, ainsi que la note qui est recalculée sur 10 pour plus de visibilité.
 </p>
                </div>
              </div>
            </li>
            <li>
              <div className="timeline-image">
                <i  className=" fa fa-fw fa-globe" style={{ fontSize: '1.75em' }}/>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>3</h4>
                  <h4 className="subheading">Synthèse</h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted" style={{ textAlign:'justify'}}>Les notes de synthèse et l’implantation dans le graphique radar apparaissent automatiquement en %.Le graphique est en bleu pour le premier bilan, les différentes couleurs apparaissant au fur et à mesure des bilans.Vous aurez également le niveau attendu pour chaque bilan .

</p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
            <  i className="fa fa-medkit" style={{ fontSize: '1.75em' }}/>              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>4</h4>
                  <h4 className="subheading">Cursus Interne </h4>
                </div>
                <div className="timeline-body">
                  <p className="text-muted" style={{ textAlign:'justify'}} >Quand vous cliquez sur cette icone dans la barre de navigation vous aurez une formulaire à remplir pour chaque semestre des trois DES . </p>
                </div>
              </div>
            </li>
            <li className="timeline-inverted">
              <div className="timeline-image">
                <h4>Allez 
                  <br/>commencer !
                  <br/></h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  
  

  <div className="container">
       
     </div>
  <footer className="footer">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <span className="copyright">Copyright &copy; Your Website 2019</span>
        </div>
        <div className="col-md-4">
         
        </div>
        <div className="col-md-4">
          <ul className="list-inline quicklinks">
            <li className="list-inline-item">
              <a href="#something">Privacy Policy</a>
            </li>
            <li className="list-inline-item">
              <a href="#something">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
    </div>
  );
}
}
     

export default Acceuil;

