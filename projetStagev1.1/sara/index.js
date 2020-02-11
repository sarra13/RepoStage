var express = require('express');
var http = require("http");
var path = require("path");
var mysql = require('mysql');
var cors = require('cors');
var port = 3001 ;

var app = express();

app.use(express.static(__dirname+'/hello-world/build'));

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "testdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

app.get('/login',(req,res)=>{

	requette = "select * from etudiant where nom = '"+req.query.username+"' and motDePasse = '"+req.query.password + "'" ;
	requette2 = "select * from professeurs where nom = '"+req.query.username+"' and motDePasse = '"+req.query.password + "'" ;
	  con.query(requette, function (err, result, fields) {

	    if (!Object.keys(result).length ){ // not found in students
	     	con.query(requette2, function (err, result, fields) { 
	     	if (!Object.keys(result).length ){ // not found in teachers
	    		res.send({login : false});
	     	}else{ // found in teachers
	    		res.send( {login : true ,etudiant : false , id : result[0].id });
	     	}
	     });
	    }else { // found in students
	    	res.send( {login : true ,etudiant : true , id : result[0].id });
	    }
	  });
});


app.get('/getDataSurEtudiant',(req,res)=>{

	  	requette = `SELECT relationEtuItem.id,  relationEtuItem.numItem ,item.niveau as niveau ,
		competence.id as compId ,capaciteCommune.nom as capComNom, item.nom, 
        relationEtuItem.bilan1 as bilan1 , relationEtuItem.bilan2 as bilan2, relationEtuItem.bilan3 as bilan3 

		FROM relationEtuItem , item , capaciteCommune , competence 
	    	WHERE relationEtuItem.numItem= item.id 
	        and competence.id = `+req.query.competence+` 
	        and competence.id = capaciteCommune.competence 
	        and capaciteCommune.id = item.capaciteCommune
	        and relationEtuItem.numEtudiant =`+req.query.numEtu

	        ;
	  
	  con.query(requette, function (err, result, fields) {
	    if (err) {
	    	res.send(err);
	    	console.log("error occured");
	    }
	    res.send(result);
	  });
});

app.get('/getMoyenneEtudiant',(req,res)=>{
	
		requetteModel = `SELECT capaciteCommune.id , 100 * sum(dataEtudiantModel.bilan1) / sum(2) as Bilan1,100 *  sum(dataEtudiantModel.bilan2) / sum(2) as Bilan2,100 *  sum(dataEtudiantModel.bilan3) / sum(2) as Bilan3 
		FROM dataEtudiantModel , item , capaciteCommune , competence 
		WHERE dataEtudiantModel.numItem = item.id 
				and competence.id = capaciteCommune.competence 
				and capaciteCommune.id = item.capaciteCommune 
					group by capaciteCommune.id `;
		requette = `SELECT capaciteCommune.id , 100 * sum(relationEtuItem.bilan1) / sum(2) as Bilan1,100 *  sum(relationEtuItem.bilan2) / sum(2) as Bilan2,100 *  sum(relationEtuItem.bilan3) / sum(2) as Bilan3 
		FROM relationEtuItem , item , capaciteCommune , competence 
		WHERE relationEtuItem.numItem = item.id 
				and competence.id = capaciteCommune.competence 
				and capaciteCommune.id = item.capaciteCommune 
				and relationEtuItem.numEtudiant = `+req.query.numEtu+` 
					group by capaciteCommune.id `;



		con.query(requette, function (err, result, fields) {
			if (err) {
				res.send(err);
				console.log("error occured");
			}
			let newObj = {Bilan1: [] ,Bilan2 : [], Bilan3 : []};

			for ( i in result){
				newObj.Bilan1.push(result[i].Bilan1);
				newObj.Bilan2.push(result[i].Bilan2);
				newObj.Bilan3.push(result[i].Bilan3);
			}
				//res.send(newObj);
			

			con.query(requetteModel, function (err, result, fields) {
					if (err) {
						res.send(err);
						console.log("error occured");
					}
					let newObjModel = {Bilan1: [] ,Bilan2 : [], Bilan3 : []};

					for ( i in result){
						newObjModel.Bilan1.push(result[i].Bilan1);
						newObjModel.Bilan2.push(result[i].Bilan2);
						newObjModel.Bilan3.push(result[i].Bilan3);
					}
					final = {etudiant : newObj , model : newObjModel }
					res.send(final); 

				});

			
		});


});


app.get('/getCapaciteCommune',(req,res)=>{

	requette = `SELECT nom FROM capaciteCommune `;

	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured");
	}
	newObj=[]
	for ( i in result){
		newObj.push(result[i].nom);
	}
	res.send(newObj);
	});

});

app.get('/isTuteurPourEtudiant',(req,res)=>{

	requette = `SELECT * FROM etudiant where id =`+req.query.etudiant+`  and idTuteur =`+req.query.tuteur;

	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured");
	}
	if (!Object.keys(result).length ){
		res.send({isTuteur : false});
	}else {
		res.send({isTuteur : true});
	}

	});

});
app.get('/updateItemEtu',(req,res)=>{

	requette = ` UPDATE relationEtuItem SET bilan1 = '`+req.query.bilan1+`' , bilan2 = '`+req.query.bilan2+`' , bilan3 = '`+req.query.bilan3+`' WHERE relationEtuItem.id = `+req.query.id+`;  `;
	console.log(requette);
	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured");
	}

	requette2 = ` select * from relationEtuItem where relationEtuItem.id = `+req.query.id+`;  `;
	con.query(requette2, function (err2, result2, fields2) {
		res.send(result2);
	});

	});

	

});


app.get('/stages/getDataSurStageEtudiant',(req,res)=>{
	requette = `SELECT relationetudiantstages.id,  relationetudiantstages.numIDStage , relationetudiantstages.DES ,
  stages.sujet,
  relationetudiantstages.datedebut  , relationetudiantstages.datefin , relationetudiantstages.nomResponsable, 
relationetudiantstages.Semestre,relationetudiantstages.numetu
  FROM relationetudiantstages , stages
	  WHERE relationetudiantstages.numIDStage= stages.id
	  and relationetudiantstages.Semestre = `+req.query.Semestre+`
	  and relationetudiantstages.DES = `+req.query.DES+`

	  and relationetudiantstages.numetu =`+req.query.numetu

	  ;

	  
	  console.log(requette);
	  

con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured");
	}
  res.send(result);
});


});


app.get('/stages/updateStagePourEtudiant',(req,res)=>{

	requette = ` UPDATE relationetudiantstages SET numIDStage= `+req.query.numIDStage+`,nomResponsable = '`+req.query.nomResponsable+`' ,datedebut = '`+req.query.datedebut+`' , datefin = '`+req.query.datefin+`' 
	WHERE relationetudiantstages.Semestre = `+req.query.Semestre+`
	and relationetudiantstages.DES = `+req.query.DES+`
	  and relationetudiantstages.numetu =`+req.query.numetu

	  ;
;
	console.log(requette);
	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured");
	}

	requette2 = ` select * from relationetudiantstages where relationetudiantstages.Semestre = `+req.query.Semestre+`
	and relationetudiantstages.DES = `+req.query.DES+`
	  and relationetudiantstages.numetu =`+req.query.numetu

	   ;
	con.query(requette2, function (err2, result2, fields2) {
		res.send(result2);
	});

	});

	

});

var server = http.createServer(app);

server.listen(port , () =>{
	console.log("server starting at port :"+port);
}
);