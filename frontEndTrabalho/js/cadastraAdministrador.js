document.getElementById("btnCadastro").addEventListener("click", cadastra);

function verificaPrimeiroAcesso(cb){
	var http = require('http');
	var utils = require('./../../utils.js');

	var opcoesHTTP = utils.opcoesHTTP("");
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "LISTAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta em verificaPrimeiroAcesso recebida!");
		if(res.statusCode == 400){
			$("#erroModal").modal("show");
		}else if(res.statusCode != 747){
			console.log("Não é o primeiro acesso ao sistema");
			location.href = "/index";
		}
	});
	req.end();
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
	usuario.primeiroAcesso = 0;
	usuario.codTipoUsuario = 2;

	if(usuario.senha != ""){
		usuario = utils.senhaHash(usuario);
		console.log(JSON.stringify(usuario));
	}

	var texto = JSON.stringify(usuario);
	console.log(JSON.stringify(usuario));

	if(!controller.validar(usuario)){
		console.log("abrindo modal");
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
	    	localStorage.id = 1;
	    	// alert("Cadastro realizado com sucesso!");
	    	var form = document.getElementById("formCadastroUsuario");
	    	form.action = "http://localhost:3000/arquivo/fotoUsuario?fileName=" + 1;
	    	form.submit();	
	    }
	    else{
	    	console.log("FALHA NO CADASTRO");
			$('#erroModal').modal('show');
		}
	}); 	
    req.write(texto);
    req.end();
}
verificaPrimeiroAcesso();