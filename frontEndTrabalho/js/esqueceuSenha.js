window.onload = function(){
	document.getElementById("btnVerificaEmail").addEventListener("click", verificaEmail);
}

function verificaEmail(){
	var email = document.getElementById("emailGerarLink").value;
	var http = require('http');
	var utils = require('./../../utils.js');

	var campos = {
		campo: "email",
		valor: email
	};

	var texto = JSON.stringify(campos);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";
	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a reposta!");
		if(res.statusCode == 200){
			console.log("Ok, vou enviar email!");
			res.on('data', function (chunk) {
				console.log("A resposta em esqueceuSenha::verificaEmail foi: " + chunk);
		    	if(chunk != null){
		    		console.log("Entrando em geraLink com codUsuario = " + JSON.parse(chunk).resultado[0].id + "!");
				    geraLink(JSON.parse(chunk).resultado[0].id, JSON.parse(chunk).resultado[0].email);
				}
		    });
		}else{
			console.log("Este email não está cadastrado no sistema");
		}
	});

	try{
		req.write(texto);
		req.end();
	}catch(err){
		console.log("Erro fatal: " + err);
	}
}

function geraLink(codUsuario, email){
	console.log("Entrei em geraLink!");
	var http = require('http');
	var modelo = require('./../../modelo/mLinkResetSenha.js');
	var utils = require('./../../utils.js');

	var linkResetSenha = modelo.novo();
	linkResetSenha.codUsuario = codUsuario;

	var texto = JSON.stringify(linkResetSenha);

	console.log("Texto em esqueceuSenha::geraLink = " + texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinkResetSenha";
	opcoesHTTP.headers.Operacao = "INSERIR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		if(res.statusCode == 200){
			console.log("Email enviado!");
		}else if(res.statusCode == 400){
			console.log("Erro fatal ao tentar recuperar senha");
		}else{
			console.log("Falha ao enviar email. Contate o suporte.");
		}
	});

	req.write(texto);
	req.end();
}



