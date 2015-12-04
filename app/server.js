//Cargando modulos de node
var http = require('http'),
	config = require('../config/config'),
	ip = config.IP,
	port = config.PORT;

//Exportar la funcio que inicia el server
exports.startServer = function(appRouter){
	//Creando el server
	var appServer = 
		http.createServer(function(req, res){
			//extraigo la url de la
			//peticion
			var url = req.url;
			//Intento el ruteo
			//de la url con alguna accion
			appRouter.route(url, req, res);
		});
		appServer.listen(port, ip, function(){
			console.log("> Server listen at " + 
				"http://%s:%s", ip, port);
		});
};