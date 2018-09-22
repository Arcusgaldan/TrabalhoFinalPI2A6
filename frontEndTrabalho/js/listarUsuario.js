var utils = require('./../../utils.js');
var http = require('http');
var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "Usuario";
opcoesHTTP.headers.Operacao = "LISTAR";
var req = http.request(opcoesHTTP, (res) => {
	console.log("Resposta recebida!");
	res.on('data', function(chunk){
		console.log("Chunk: " + chunk);
		let vetor = JSON.parse(chunk);
		for(var i = 0; i < vetor.length; i++){
			console.log("Usuario #" + i + "\n Nome: " + vetor[i].nome);
		}
	});
});
req.end();