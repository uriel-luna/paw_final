//Importando handlers
var handlers =
	require('./handlers'),
	staticServer = 
		require('./static.server');
	var fs= 
		require('fs');


exports.route = function(url, req, res){
	console.log("> Enrutando la peticion: " +
		"%s", url);
	//Verificando si la ruta que se desea
	//servir es contenido
	//estatico

	//Verificar si existe un manejador
	//para la url que se pide
	if(typeof(handlers[url]) == 'function'){
		
		//Existe el handler
		//Enrutando url con su handler
		handlers[url](req, res)
	}else{
		//Manamos a servir
		//la ruta estatica
		staticServer.serve(url, res);
	}
};