document.getElementById("btnCadastrar").addEventListener("click", cadastra);

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
	var pontosCod = linhaPesquisa.codigo.split(".");
	if(pontosCod[1] == "00"){
		linhaPesquisa.grau = 1;
	}else if(pontosCod[2] == "00"){
		linhaPesquisa.grau = 2;
	}else if(pontosCod[3][0] == "0" && pontosCod[3][1] == "0"){
		linhaPesquisa.grau = 3;
	}else{
		linhaPesquisa.grau = 4;
	}
	linhaPesquisa.personalizada = 1;

	var texto = JSON.stringify(linhaPesquisa);

	if(!controller.validar(linhaPesquisa)){
		console.log("Abrindo modal");
		$('#preencherModal').modal('show');
		return;
	}

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "INSERIR";

	var req = http.request(opcoesHTTP, (res) => {
		if(res.statusCode = 200){
			$('#sucessoModal').modal('show');
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
	    	setTimeout(function(){location.reload();} , 2000);
		}else{
			$('#erroModal').modal('show');
		}
	});

	req.write(texto);
	req.end();
}