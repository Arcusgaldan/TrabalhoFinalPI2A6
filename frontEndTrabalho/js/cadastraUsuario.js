window.onload = function(){
	document.getElementById("btnCadastro").addEventListener("click", cadastra);
}

function cadastra(){
	var modelo = require('./../../modelo/mUsuario.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var usuario = modelo.novo();
	usuario.id = 0;
	usuario.nome = document.getElementById("nome").value;
	usuario.prontuario = document.getElementById("prontuario").value;
	usuario.senha = utils.geraSenhaAleatoria();
	usuario.email = document.getElementById("email").value;
	usuario.curriculoLattes = document.getElementById("linkLattes").value;
	usuario.foto = document.getElementById("foto").value;
	usuario.primeiroAcesso = 1;
	usuario.codTipoUsuario = document.getElementById("codTipoUsuario").selectedIndex + 1;

	usuario = utils.senhaHash(usuario);
	var texto = JSON.stringify(usuario);

	console.log("TEXTO: " + texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "INSERT";

	console.log("Opções: " + JSON.stringify(opcoesHTTP));

	var req = http.request(opcoesHTTP, (res) => {
	    console.log("Chegou a resposta!");
	    res.setEncoding('utf8');
	    //console.log(res);        
	    res.on('data', function (chunk) {
	        console.log('Response: ' + chunk);
	    });
	}); 	
    req.write(texto);
    req.end();
}