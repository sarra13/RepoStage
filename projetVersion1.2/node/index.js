var express = require('express');
var http = require("http");
var path = require("path");
var mysql = require('mysql');
var cors = require('cors');
var jwt = require('jsonwebtoken');
const fs = require('fs')
var port = 3001 ;

var app = express();

app.use(express.static(__dirname+'/hello-world/build'));

app.use(cors());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testdb"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

app.get('/login',(req,res)=>{
	requette = "select * from etudiant where nom = "+mysql.escape(req.query.username)+" and motDePasse = "+mysql.escape(req.query.password)  ;
requette2 = "select * from professeurs where nom = "+mysql.escape(req.query.username)+" and motDePasse = "+mysql.escape(req.query.password) ;
	requette3 = "select * from admins where nom = "+mysql.escape(req.query.username)+" and motDePasse = "+mysql.escape(req.query.password);
	  con.query(requette, function (err, result, fields) {
	    if (!Object.keys(result).length ){ // not found in students
	     	con.query(requette2, function (err, result, fields) { 
	     	if (!Object.keys(result).length ){ // not found in teachers
			     	con.query(requette3, function (err, result, fields) { 
			     	if (!Object.keys(result).length ){ // not found in admins
			    		res.send({login : false});
			     	}else{ // found in admins
			     		var privateKey = fs.readFileSync('rsa.private');
			    		var jwtToken = jwt.sign({login : true ,etudiant : false , isAdmin : true , id : result[0].id }, privateKey, { algorithm: 'RS256'});
			    		res.send( {login : true ,etudiant : false , isAdmin : true , id : result[0].id , token : jwtToken});
			     	}
			     });
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
		competence.id as compId ,capaciteCommune.nom as capComNom,capaciteCommune.id as capComId, item.nom, 
        relationEtuItem.bilan1 as bilan1 , relationEtuItem.bilan2 as bilan2, relationEtuItem.bilan3 as bilan3 
		FROM relationEtuItem , item , capaciteCommune , competence 
	    	WHERE relationEtuItem.numItem= item.id 
	        and competence.id = `+req.query.competence+` 
	        and competence.id = capaciteCommune.competence 
	        and capaciteCommune.id = item.capaciteCommune
	        and relationEtuItem.numEtudiant =`+req.query.numEtu;
	  
	  con.query(requette, function (err, result, fields) {
	    if (err) {
	    	res.send(err);
	    	console.log("error occured in /getDataSurEtudiant");
	    }
	    else
	    	res.send(result);
	  });
});

app.get('/getTimeOfLastChange',(req,res)=>{

	  	requette = `SELECT DATE_FORMAT(relationEtuItem.dateModifBilan`+req.query.bilan+`,"%d/%m/%Y à %T") as time
		FROM relationEtuItem where id=`+req.query.id;
	  console.log(requette)
	  con.query(requette, function (err, result, fields) {
	    if (err) {
	    	res.send(err);
	    	console.log("error occured in /getTimeOfLastChange");
	    }
	    else
	    	res.send(result[0]);
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
				console.log("error occured in getMoyenneEtudiant (1)");
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
						console.log("error occured getMoyenneEtudiant (2)");
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
		console.log("error occured in getCapaciteCommune");
	}
	newObj=[]
	for ( i in result){
		newObj.push(result[i].nom);
	}
	res.send(newObj);
	});

});

app.get('/verifyAdminPrivelege',(req,res)=>{

		var admin = false ;
		var cert = fs.readFileSync('rsa.public');
		jwt.verify(req.headers.authorization, cert, function(err, decoded) {
			if(!err){
					  		if(decoded.isAdmin)
					  		 {
					  		 	admin=true;
					  		}
					 }else {
					 	console.log("error in verifyAdminPrivelege");
					 }

			});	
			res.send({isAdmin : admin});
	
});
app.get('/getEtudiantsPourEnseignant',(req,res)=>{

	
	
	if(req.query.admin=="admin" )
		{
			requette = `SELECT  id as value ,nom as label FROM etudiant where 1`;
		}	
	else
		{
			requette = `SELECT  id as value ,nom as label FROM etudiant where idTuteur=`+req.query.enseignant+` or idMaitreDeStage=`+req.query.enseignant;
		}
	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error in getEtudiantsPourEnseignant");
	}else{
		res.send(result);
	}
	});

});


app.get('/ajoutEtudiant',(req,res)=>{

		var auth = false ;
		var cert = fs.readFileSync('rsa.public');
		jwt.verify(req.headers.authorization, cert, function(err, decoded) {
			if(!err){
			  		if(decoded.isAdmin)
			  		{
			  		 	auth=true;
			  		}
			 }
		});	
		if (auth){
		requette = "INSERT INTO `etudiant`(`id`, `nom`, `motDePasse`, `idTuteur`, `verrouillage`) VALUES (NULL,'"+req.query.username+"','"+req.query.password+"',"+req.query.numTuteur+",0)";
			con.query(requette, function (err, result, fields) {
			if (err) {
				res.send({msg:"error"});
				console.log(err);
				console.log("error in ajoutEtudiant");
			}else{
				res.send({msg : "etudiant ajouté"});
			}
			});
		}else {
			 res.status(403).send({msg : "403 Forbidden"})
		}
	}
);

app.get('/ajoutEnseignant',(req,res)=>{

		var auth = false ;
		var cert = fs.readFileSync('rsa.public');
		jwt.verify(req.headers.authorization, cert, function(err, decoded) {
			if(!err){
			  		if(decoded.isAdmin)
			  		{
			  		 	auth=true;
			  		}
			 }
		});	
		if (auth){
		requette = "INSERT INTO `professeurs`(`id`, `nom`, `motDePasse`) VALUES (NULL,'"+req.query.usernameTuteur+"','"+req.query.passwordTuteur+"')";
			con.query(requette, function (err, result, fields) {
			if (err) {
				res.send({msg:"error"});
				console.log(err);
				console.log("error in ajoutEnseignant");
			}else{
				res.send({msg : "Enseignant ajouté"});
			}
			});
		}else {
			 res.status(403).send({msg : "403 Forbidden"})
		}
	}
);
app.get('/getAllTuteurs',(req,res)=>{

	

				requette = `SELECT  id as value ,nom as label FROM professeurs where 1`;
				con.query(requette, function (err, result, fields) {
				if (err) {
					res.send(err);
					console.log("error in getAllTuteurs");
				}else{
					res.send(result);
				}
				});
	
});
app.get('/isTuteurPourEtudiant',(req,res)=>{

	requette = `SELECT * FROM etudiant where id =`+req.query.etudiant+`  and idTuteur =`+req.query.tuteur;

	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured in isTuteurPourEtudiant");
	}
	if (!Object.keys(result).length ){
		res.send({isTuteur : "false"});
	}else {
		const verrouillage=result[0].verrouillage;

		res.send({isVerrouille : verrouillage=="1" ? "true" : "false" ,isTuteur : "true"});
	}

	});

});

app.get('/isVerrouille',(req,res)=>{

	requette = `SELECT * FROM etudiant where id =`+req.query.etudiant;

	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured in /isVerrouille");
	
	}
	else if (!Object.keys(result).length ){
		res.send({error : "true"});
	}else {		
		const verrouillage=result[0].verrouillage;
		res.send({isVerrouille : verrouillage=="1" ? "true" : "false"});
	}

	});

});

app.get('/VerrouillerCompetencecsEtudiant',(req,res)=>{

	requette = ` UPDATE etudiant SET verrouillage =`+req.query.etat+` where  id = `+req.query.id+`;  `;
	con.query(requette, function (err, result, fields) {
		if (err) {
			res.send(err);
			console.log("error occured in VerrouillerCompetencecsEtudiant");
		}

	});
});


app.get('/updateItemEtu',(req,res)=>{

	requette2 = ` select * from relationEtuItem where relationEtuItem.id = `+req.query.id+`;  `;
	con.query(requette2, function (err2, result2, fields2) {
		if(req.query.bilan1 != result2[0].bilan1){
			con.query("UPDATE `relationEtuItem` SET `dateModifBilan1`= NOW() WHERE id="+req.query.id+";")
		}
		if(req.query.bilan2 != result2[0].bilan2){
			con.query("UPDATE `relationEtuItem` SET `dateModifBilan2`= NOW() WHERE id="+req.query.id+";")
		}
		if(req.query.bilan3 != result2[0].bilan3){
			con.query("UPDATE `relationEtuItem` SET `dateModifBilan3`= NOW() WHERE id="+req.query.id+";")
		}
	});
	requette = ` UPDATE relationEtuItem SET bilan1 = '`+req.query.bilan1+`' , bilan2 = '`+req.query.bilan2+`' , bilan3 = '`+req.query.bilan3+`' WHERE relationEtuItem.id = `+req.query.id+`;  `;
	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured in updateItemEtu");
	}



	});

	

});


app.get('/stages/getDataSurStageEtudiant',(req,res)=>{
	requette = `SELECT * FROM relationetudiantstages
	  WHERE  relationetudiantstages.Semestre = `+req.query.Semestre+`
	  and relationetudiantstages.DES = `+req.query.DES+`
	  and relationetudiantstages.numetu =`+req.query.numetu;

	  
	  

con.query(requette, function (err, result, fields) {
	if (err) {
		res.send({error : "database error"});
		console.log("error occured in getDataSurStageEtudiant");
	}
	else if (!Object.keys(result).length ){
		res.send({error : "student not found"});
	}else {
		var resultatOBJ = result[0] ;
	if(resultatOBJ.isLieu==0){
		lieuTab = resultatOBJ.lieu.split(" ");
		resultatOBJ.encadrant1 = lieuTab[0];
		resultatOBJ.encadrant2 = lieuTab[1] ? lieuTab[1] : "";
	}		
	  res.send(resultatOBJ);
	}
});


});


app.get('/stages/updateStagePourEtudiant',(req,res)=>{

if(req.query.isLieu=="1"){
	requette = `UPDATE relationetudiantstages SET numIDStage= `+req.query.numIDStage+`,nomResponsable = '`+req.query.nomResponsable+`',isLieu = '`+req.query.isLieu+`',lieu = '`+req.query.lieu+`' ,datedebut = '`+req.query.datedebut+`' , datefin = '`+req.query.datefin+`' 
	WHERE relationetudiantstages.Semestre = `+req.query.Semestre+`
	and relationetudiantstages.DES = `+req.query.DES+`
	  and relationetudiantstages.numetu =`+req.query.numetu  ;	
}else {
	requette = `UPDATE relationetudiantstages SET numIDStage= `+req.query.numIDStage+`,nomResponsable = '`+req.query.nomResponsable+`',isLieu = '`+req.query.isLieu+`',lieu = '`+req.query.encadrant1+" "+req.query.encadrant2+`' ,datedebut = '`+req.query.datedebut+`' , datefin = '`+req.query.datefin+`' 
	WHERE relationetudiantstages.Semestre = `+req.query.Semestre+`
	and relationetudiantstages.DES = `+req.query.DES+`
	  and relationetudiantstages.numetu =`+req.query.numetu  ;		
}

	con.query(requette, function (err, result, fields) {
	if (err) {
		res.send(err);
		console.log("error occured in /stages/updateStagePourEtudiant");
	}else {
		res.send("ok");	
	}



	});
});

app.get('/etudiant/getInformationsEtudiant',(req,res)=>{
	requette = `SELECT etudiant.nom 
  FROM etudiant
	  WHERE etudiant.id=`+req.query.id;
	  
	  

	con.query(requette, function (err, result, fields) {
		if (err) {
			res.send(err);
			console.log("error occured in /etudiant/getInformationsEtudiant");
		}
	  res.send(result);
	});


});

var server = http.createServer(app);

server.listen(port , () =>{
	console.log("server starting at port :"+port);
}
);