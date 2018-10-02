document.getElementById('btnAlterarUsuario').addEventListener("click", alterar, false);

function alterar(){
	console.log("Entrei no alterarUsuario::alterar");
	var http = require('http');
	var utils = require('./../../utils.js');
	var modelo = require('./../../modelo/mUsuario.js');

	var usuario = modelo.novo();

	usuario.id = document.getElementById('idUsuarioAlterar').value;
	usuario.nome = document.getElementById('nomeUsuarioAlterar').value;
	usuario.prontuario = document.getElementById('prontuarioUsuarioAlterar').value;
	usuario.email = document.getElementById('emailUsuarioAlterar').value;
	usuario.curriculoLattes = document.getElementById('linkLattesUsuarioAlterar').value;
	usuario.codTipoUsuario = document.getElementById('codTipoUsuarioAlterar').value;
	usuario.senha = document.getElementById('senhaUsuarioAlterar').value;

	var texto = JSON.stringify(usuario);
	console.log("Texto em alterarUsuario::alterar: " + texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "ALTERAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");

		if(res.statusCode == 200){
			console.log("Alterado com sucesso!"); //Fazer o modal			
		}else{
			console.log("Não foi possível alterar usuario"); //Fazer o modal
		}
	});
	req.write(texto);
	req.end();
}