document.getElementById("btnCadastro").addEventListener("click", cadastra);

function cadastra(){
	var modelo = require('./../../modelo/mUsuario.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cUsuario.js');
	var usuario = modelo.novo();
	usuario.id = 0;
	usuario.nome = document.getElementById("nomeCadastrar").value;
	usuario.prontuario = document.getElementById("prontuarioCadastrar").value;
	usuario.senha = utils.geraSenhaAleatoria();
	usuario.email = document.getElementById("emailCadastrar").value;
	usuario.curriculoLattes = document.getElementById("linkLattesCadastrar").value;
	usuario.foto = document.getElementById("fotoCadastrar").value;
	usuario.primeiroAcesso = 1;
	usuario.codTipoUsuario = 1;

	usuario = utils.senhaHash(usuario);
	var texto = JSON.stringify(usuario);

	if(!controller.validar(usuario)){
		console.log("Deu ruim"); //Adicionar mensagem de falta de campos em modal/alert
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
	    	alert("Cadastro realizado com sucesso!");
	    	document.getElementById("fechaCadastraModal").click();
	    }
	    else
	    	console.log("FALHA NO CADASTRO");
	}); 	
    req.write(texto);
    req.end();
}