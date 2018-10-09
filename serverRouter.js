var http = require('http');
var fs = require('fs');

var paginas = {
	"/": "frontEndTrabalho/index.html",
	"/cadastroUsuario": "frontEndTrabalho/cadastroUsuario.html",
	"/cadastroGrupo": "frontEndTrabalho/grupos-adm.html"
};

function mimeType(arquivo){
	if(arquivo.match("^.*\.js.*$")){
		return "text/javascript";
	}else if(arquivo.match("^.*\.css.*$") || arquivo.match("^.*\.scss.*$")){
		return "text/css";
	}else if(arquivo.match("^.*\.html.*$") || arquivo.match("^.*\.htm.*$")){
		return "text/html";
	}else{
		return null;
	}
}

// function buscaRecurso(url){
// 	for(var key in paginas){
// 		if(key == url){
// 			console.log("Achei um match: " + key + " e o valor é " + paginas[key]);
// 			return paginas[key];
// 		}
// 	}
// }

http.createServer(function(req, res){
	var url = req.url;
	var pagina = paginas[url];
	if(pagina){
		console.log("Página requisitada está na lista");
		fs.readFile(pagina, function(err, data) {
			if(err){
				console.log("Erro: " + err);
				res.writeHead(500);	
				res.end();
			}else{
			    res.writeHead(200, {'Content-Type': 'text/html'});
			    res.write(data);
			    res.end();
			}
	 	});
	}else{
		console.log("Página requisitada NÃO está na lista");
		var tipoArquivo = mimeType(url);
		fs.readFile("frontEndTrabalho" + url, function(err, data){
			if(err){
				if(err.code === 'ENOENT'){ //Se erro for página não existente, envia a página 404
					console.log("Erro: " + err);
					fs.readFile("frontEndTrabalho/404.html", function(err, data){
						if(err){
							console.log("Erro ao ler página de 404: " + err);
							res.writeHead(500);
							res.end();
						}else{
							res.writeHead(404, {'Content-Type': 'text/html'});
							res.write(data);
							res.end();
						}
					});
				}else{ //Se erro não for página não encontrada, envia erro 500 padrão
					console.log("Erro: " + err);
					res.writeHead(500);	
					res.end();
				}
			}else{
				res.writeHead(200, {'Content-Type': tipoArquivo});
			    res.write(data);
			    res.end();
			}
		});
	}
	
	// switch(url){
	// 	case "/":
	// 		fs.readFile('frontEndTrabalho/index.html', function(err, data) {
	// 			if(err){throw err;}
	// 		    res.writeHead(200, {'Content-Type': 'text/html'});
	// 		    res.write(data);
	// 		    res.end();
	// 	 	});
	// 		break;
	// 	default:
	// 		//Testar exceções para erro
	// 		console.log("Foi outra coisa: " + req.url);
	// 		var tipo;
	// 		if(url.match("^.*\.js.*$")){
	// 			tipo = "text/javascript";
	// 		}else if(url.match("^.*\.css.*$")){
	// 			tipo = "text/css";
	// 		}else{
	// 			tipo = "text/plain";
	// 		}
	// 		fs.readFile('frontEndTrabalho' + url, function(err, data) {
	// 			if(err){
	// 				console.log("Erro: " + err);
	// 			}
	// 		    res.writeHead(200, {'Content-Type': tipo});
	// 		    res.write(data);
	// 		    res.end();
	// 	 	});
	// 		break;
	// }
}).listen(80);