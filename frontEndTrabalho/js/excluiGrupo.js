document.getElementById('btnExcluir').addEventListener('click', excluir, false);

function excluir(){
	var http = require('http');
	var utils = require('./../../utils.js');

	var objeto = {
		id: document.getElementById('idGrupoExcluir').value
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "EXCLUIR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		if(res.statusCode == 200){
			console.log("Grupo excluído com sucesso!");
		}else{
			console.log("Falha ao excluir grupo");
		}
	});

	req.write(texto);
	req.end();
}