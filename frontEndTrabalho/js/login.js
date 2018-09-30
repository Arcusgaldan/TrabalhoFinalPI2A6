document.getElementById("btnLogin").addEventListener("click", login);

function login(){
	console.log("Etrando em login");
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
			res.setEncoding('utf8');
		    res.on('data', function (chunk) {
		    	if(chunk != null){
				    if(JSON.parse(chunk).resultado[0].senha == senha){
				    	console.log("Login com sucesso!");
				    	localStorage.id = JSON.parse(chunk).resultado[0].id;
				    }else{
				    	console.log("Falha no login");
				    }
				}
		    });
	    	//let jsonRes = JSON.parse(res);
	    	// for(var k in jsonRes){
	    	// 	console.log("Key: " + k + "\nValor: " + jsonRes[k]);
	    	// }
		}else if(res.statusCode == 747){
			console.log("Não teve resultado!");
		}else{
			console.log("Erro fatal.");
		}
	}); 

	req.write(texto);
	req.end();
}