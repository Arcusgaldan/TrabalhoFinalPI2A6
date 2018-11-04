document.getElementById('btnAlterarGrupoEspecifico').addEventListener("click", alterar, false);

function alterar(){
	var http = require('http');
	var utils = require('./../../utils.js');
	var modelo = require('./../../modelo/mGrupo.js');

	var grupo = modelo.novo();

	grupo.id = document.getElementById('idGrupoAlterar').value;
	grupo.nome = document.getElementById('nomeGrupoAlterar').value;
	grupo.sigla = document.getElementById('siglaGrupoAlterar').value;
	grupo.email = document.getElementById('emailGrupoAlterar').value;
	grupo.dataFundacao = document.getElementById('dataGrupoAlterar').value;
	grupo.descricao = document.getElementById('descricaoGrupoAlterar').value;

	
	grupo.status = document.getElementById('statusGrupoAlterar').value;
	grupo.codUsuario = document.getElementById('idLiderGrupoAlterar').value;

	var texto = JSON.stringify(grupo);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "ALTERAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");

		if(res.statusCode == 200){
			console.log("Alterado com sucesso!"); 
			var form = document.getElementById('formAlteraGrupo');
	    	form.action = "http://localhost:3000/arquivo/logoGrupo?fileName=" + grupo.id;
	    	form.submit();	
		}else{
			console.log("Não foi possível alterar grupo");
			  $('#erroModal').modal('show');
		}
	});
	req.write(texto);
	req.end();
}