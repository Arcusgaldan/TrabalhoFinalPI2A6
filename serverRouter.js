var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
	var url = req.url;
	switch(url){
		case "/":
			console.log("Foi teste");
			fs.readFile('frontEndTrabalho/index.html', function(err, data) {
				if(err){throw err;}
			    res.writeHead(200, {'Content-Type': 'text/html'});
			    res.write(data);
			    res.end();
		 	});
			break;
		default:
			//Testar exceções para erro
			console.log("Foi outra coisa: " + req.url);
			var tipo;
			if(url.match("^.*\.js.*$")){
				tipo = "text/javascript";
			}else if(url.match("^.*\.css.*$")){
				tipo = "text/css";
			}else{
				tipo = "text/plain";
			}
			fs.readFile('frontEndTrabalho' + url, function(err, data) {
				if(err){
					console.log("Erro: " + err);
				}
			    res.writeHead(200, {'Content-Type': tipo});
			    res.write(data);
			    res.end();
		 	});
			break;
	}
}).listen(80);