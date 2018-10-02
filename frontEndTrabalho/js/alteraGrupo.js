document.getElementById('btnAlterarGrupo').addEventListener("click", alterar, false);

function alterar(){
	var http = require('http');
	var utils = require('./../../utils.js');
	var modelo = require('./../../modelo/mGrupo.js');

	var grupo = modelo.novo();

	grupo.id = document.getElementById('idGrupoAlterar').value;
	grupo.nome = document.getElementById('nomeGrupoAlterar').value;
	grupo.sigla = document.getElementById('siglaGrupoAlterar').value;
	grupo.status = document.getElementById('statusGrupoAlterar').value;
	grupo.codUsuario = document.getElementById('liderGrupoAlterar').value;

	var texto = JSON.stringify(grupo);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "ALTERAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");

		if(res.statusCode == 200){
			console.log("Alterado com sucesso!"); //Fazer o modal			
		}else{
			console.log("Não foi possível alterar grupo"); //Fazer o modal
		}
	});
	req.write(texto);
	req.end();
}