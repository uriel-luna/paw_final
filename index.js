//Cargando router
var router =
	require('./app/router'),
	server = 
	require("./app/server");
//Iniciando el server
//Y pasandole como parametro
//el router
server.startServer(router);
