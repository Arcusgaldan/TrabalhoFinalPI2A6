document.getElementById("btnCadastro").addEventListener("click", cadastra);

function cadastra(){
	console.log("Entrou na função");
	var modelo = require('./../../modelo/mLinhaPesquisa.js');
	var utils = require('./../../utils.js');
	var controller = require('./../../controller/cLinhaPesquisa.js');
	var http = require('http');
	var linhaPesquisa = modelo.novo();

	linhaPesquisa.id = 0;
	linhaPesquisa.codigo = document.getElementById("codigoLinhaCadastrar").value;
	linhaPesquisa.nome = document.getElementById("nomeLinhaCadastrar").value;

	var texto = JSON.stringify(linhaPesquisa);

	if(!controller.validar(linhaPesquisa)){
		console.log("Abrindo modal");
		$('#preencherModal').modal('show');
		return;
	}

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "INSERIR";

	var req = http.require(opcoesHTTP, (res) => {
		if(res.statusCode = 200){
			$('#sucessoModal').modal('show');
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
		}else{
			$('#erroModal').modal('show');
		}
	});

	req.write(texto);
	req.end();
}