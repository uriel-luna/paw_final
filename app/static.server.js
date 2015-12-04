var fs = require('fs'),
	mime = require('mime')
//Modulo encargado de
//servir contenido estatico
exports.serve = function(url, res){
	
		//Acompleto la ruta estatica
		var staticPath = './static' + url;
		//Verifico que existe
		fs.exists(staticPath, function(exists){
			if(exists){
				//Si existe esa ruta
				//estatica
				fs.readFile(staticPath, function(err, content){
				if(err){
			//Hubo error en la lectura
			res.writeHead(500,{
				'Content-Type' : "text/html"
			});
			res.end("<h1 style='color: red'>500 FUERA DE SERVICIO :( </h1>");
		}else{
			//Seleccionar mime
			var contentType = mime.lookup(staticPath);
			//No hubo error se sirve archivo
			res.writeHead(200, {
				'Content-Type' : contentType,
				'Server' : 'ITGAM@1.0.0'
			});
			res.end(content, 'utf-8');
		}
	});
			}else{
		//No existe el handler
		res.writeHead(404,{
			"Content-Type" : "text/html"
		});
		res.end("<h1 style='color: red'>404. NOT FOUND</h1>");

			}
		});
		
};