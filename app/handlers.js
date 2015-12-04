//importando libreria para 
//parsear datos de la url
var querystring = require('querystring');
//Importando a mi server estatico
var staticServer = require('./static.server.js');
var uriel = {
	"nombres" : "Uriel Antonio",
	"apellidos" : "Luna Bautista",
	"edad" : 23,
	"sexo" : "Diario awebo!",
	"puesto" : "Estudiante"
};
//Exportando el codulo como un todo
module.exports = {
	"/" : function(req, res){
		if(req.method == "POST"){
			//El metodo de peticion es POST
			//Preparo una variable para
			//guardar la informacion
			//del formulario
			var postData = "";

			//Crear listeners
			req.on('data', function(datachunks){
				postData += datachunks;
				//Seguridad
				if(postData.length > 1e6){
					//Si la informacion excede
					//cierta cantidad la destruyo
					//por seguridad
					req.conection.destroy();
					console.log("> Se cancela la peticion por exceso de carga en la peticion...");
				}
			});

			//Creamos un listener que indique cuando
			//termino la transferencia de informacion
			req.on('end', function(){
				var data = querystring.parse(postData);
				//Servir html semi harcodeado
				res.writeHead(200, {
					"Content-Type" : 'text/html'
				});
				res.write('<ul style="color:blue">');
				for(var key in data){
					if(data.hasOwnProperty(key)){
						res.write('<li style="color: red">' + key.toString().toUpperCase()
						 + ' : ' + data[key] + '</li>')
					}
				}
				res.write('</ul>');
				res.end();
			});
		}else{
			//Asumo que es GET
			staticServer.serve('/index', res);
		}
	},
	"/uriel" : function(req, res){
		//Manejador de ruta /uriel
		res.writeHead(200, {
			"Content-Type" : "application/json"
		});
		//Serializando la respuesta
		var jsonResponse = JSON.stringify(uriel);
		//Contesto el json
		res.end(jsonResponse);
	},
	"/uriel/gustos" : function(req, res){
		//Manejador de ruta /uriel/gustos
		res.writeHead(200, {
			"Content-Type" : "text/plain"
		});
		res.end('Ruta /uriel/gustos en construccion...');
	}
};