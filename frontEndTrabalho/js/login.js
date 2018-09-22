window.onload = function(){
	document.getElementById("btnLogin").addEventListener("click", login);
}

function login(){
	var utils = require('./../../utils.js');
	var http = require('http');

	var email = document.getElementById('emailLogin').value;
	var senha = document.getElementById('senhaLogin').value;
	senha = utils.stringHash(senha);

	var parametrosBusca = {
		campo: 'email',
		valor: email
	};

	var texto = JSON.stringify(parametrosBusca);
	console.log(texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a resposta!");
		if(res.statusCode == 200){
			console.log("Teve resultado!");
		}else if(res.statusCode == 747){
			console.log("Não teve resultado!");
		}else{
			console.log("Erro fatal.");
		}
    	let jsonRes = JSON.parse(res);
    	for(var k in jsonRes){
    		console.log("Key: " + k + "\nValor: " + jsonRes[k]);
    	}
	}); 

	req.write(texto);
	req.end();
}