window.onload = function(){
	document.getElementById("btnCadastro").addEventListener("click", cadastra);
}

function cadastra(){
	console.log("Entrou na função");
	var modelo = require('./../../modelo/mUsuario.js');
	var utils = require('./../../utils.js');
	var controller = require('./../../controller/cUsuario.js');
	var http = require('http');
	console.log("Fez require");
	var usuario = modelo.novo();
	usuario.id = 0;
	usuario.nome = document.getElementById("nome").value;
	usuario.prontuario = document.getElementById("prontuario").value;
	usuario.senha = document.getElementById("senha").value;
	usuario.email = document.getElementById("email").value;
	usuario.curriculoLattes = document.getElementById("linkLattes").value;
	usuario.foto = document.getElementById("foto").value;
	usuario.primeiroAcesso = 0;
	usuario.codTipoUsuario = 2;

	usuario = utils.senhaHash(usuario);
	var texto = JSON.stringify(usuario);

	if(!controller.validar(usuario)){
		$('#preencherModal').modal('show');
		return;
	}

	console.log("TEXTO: " + texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "INSERIR";

	console.log("Opções: " + JSON.stringify(opcoesHTTP));

	var req = http.request(opcoesHTTP, (res) => {
	    console.log("Chegou a resposta!");
	    res.setEncoding('utf8');
	    //console.log(res);        
	    if(res.statusCode == 200){
	    	// alert("Cadastro realizado com sucesso!");
	    	$('#sucessoModal').modal('show');
	    	setTimeout(function(){location.href="index.html"} , 5000);   
	    }
	    else
	    	console.log("FALHA NO CADASTRO");
	}); 	
    req.write(texto);
    req.end();
}