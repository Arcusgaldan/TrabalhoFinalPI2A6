document.getElementById("btnCadastroLinhaSelect").addEventListener('click', cadastraSelect, false);
document.getElementById("btnCadastroLinhaNome").addEventListener('click', cadastraNome, false);

function buscaData(cb){
	var http = require('http');
	var utils = require('./../../utils.js');
	var opcoesHTTP = utils.opcoesHTTP("");
	opcoesHTTP.headers.Objeto = "DataAtual";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;
		});
		res.on('end', function(){
			cb(msg);
		});
	});

	req.end();
}

function buscaGrupo(sigla, cb){
	var utils = require('./../../utils.js');
	var http = require('http');
	var objeto = {
		campo: "sigla",
		valor: sigla
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a resposta!");
		res.setEncoding('utf8');

		if(res.statusCode == 200){
			res.on('data', function(chunk){
				var grupo = JSON.parse(chunk).resultado[0];
				cb(grupo.id);
			});
		}else{
			cb(0);
		}
	});

	req.write(texto);
	req.end();
}

function cadastraSelect(){
	var linha;
	if(document.getElementById("quartoGrauCadastrar").value != ""){
		linha = document.getElementById("quartoGrauCadastrar").value;
	}else if(document.getElementById("terceiroGrauCadastrar").value != ""){
		linha = document.getElementById("terceiroGrauCadastrar").value;
	}else if(document.getElementById("segundoGrauCadastrar").value != ""){
		linha = document.getElementById("segundoGrauCadastrar").value;
	}else if(document.getElementById("primeiroGrauCadastrar").value != ""){
		linha = document.getElementById("primeiroGrauCadastrar").value;
	}else{
		console.log("Falha ao cadastrar.");
		$("erroModal").modal("show");
		return;
	}

	var http = require('http');
	var utils = require('./../../utils.js');
	var grupoLinha = require('./../../modelo/mVinculoGrupoLinha').novo();

	grupoLinha.id = 0;
	var url = window.location.pathname;	
	buscaGrupo(url.split("/")[2], function(idGrupo){
		if(idGrupo == 0){
			return;
		}

		grupoLinha.codGrupo = idGrupo;
		grupoLinha.codLinha = linha;
		buscaData(function(data){
			grupoLinha.dataInicio = data;
			var texto = JSON.stringify(grupoLinha);
			var opcoesHTTP = utils.opcoesHTTP(texto);
			opcoesHTTP.headers.Objeto = "VinculoGrupoLinha";
			opcoesHTTP.headers.Operacao = "INSERIR";

			var req = http.request(opcoesHTTP, (res) => {
				console.log("Resposta recebida!");
				if(res.statusCode == 200){
					$('#sucessoModal').modal('show');
					$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
				}else{
					$('#erroModal').modal('show');
				}
			});

			req.write(texto);
			req.end();
		});		
	});
}

function nomeLinhaToCodLinha(nomeLinha, cb){
	var http = require('http');
	var utils = require('./../../utils.js');

	var objeto = {
		campo: "nome",
		valor: nomeLinha
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				cb(JSON.parse(msg).resultado[0].id);
			});
		}else{
			cb(0);
		}
	});
	req.write(texto);
	req.end();
}

function cadastraNome(){
	var http = require('http');
	var utils = require('./../../utils.js');
	var grupoLinha = require('./../../modelo/mVinculoGrupoLinha').novo();

	nomeLinhaToCodLinha(document.getElementById("nomeLinhaCadastrar").value, function(idLinha){
		console.log("entrou em CadastraNome");
		if(idLinha == 0){
			return;
		}

		grupoLinha.id = 0;
		grupoLinha.codLinha = idLinha;
		var url = window.location.pathname;	
		buscaGrupo(url.split("/")[2], function(idGrupo){
			if(idGrupo == 0){
				return;
			}
			grupoLinha.codGrupo = idGrupo;
			buscaData(function(data){
				grupoLinha.dataInicio = data;
				var texto = JSON.stringify(grupoLinha);
				var opcoesHTTP = utils.opcoesHTTP(texto);
				opcoesHTTP.headers.Objeto = "VinculoGrupoLinha";
				opcoesHTTP.headers.Operacao = "INSERIR";

				var req = http.request(opcoesHTTP, (res) => {
					console.log("Resposta recebida!");
					if(res.statusCode == 200){
						$('#sucessoModal').modal('show');
						$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
					}else{
						$('#erroModal').modal('show');
					}
				});

				req.write(texto);
				req.end();
			});		
		});
	});

		
}