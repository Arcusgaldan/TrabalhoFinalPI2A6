function populaVetorLinhasGerais(cb){
	var http = require('http');
	var utils = require('./../../utils.js');

	var opcoesHTTP = utils.opcoesHTTP("");
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "LISTAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta para listar todas as linhas gerais recebida!");
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorOrganizado = [];
				var vetor = JSON.parse(msg);
				for(var i = 0; i < vetor.length; i++){
					vetorOrganizado[vetor[i].id] = vetor[i];
				}
				cb(vetorOrganizado);
			});
		}else{
			cb(null);
		}
	});

	req.end();
}

function populaVetorLinhasGrupo(cb){
	var http = require('http');
	var utils = require('./../../utils.js');
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		var objeto = {
			campo: "codGrupo",
			valor: idGrupo
		};

		var texto = JSON.stringify(objeto);

		var opcoesHTTP = utils.opcoesHTTP(texto);
		opcoesHTTP.headers.Objeto = "VinculoGrupoLinha";
		opcoesHTTP.headers.Operacao = "BUSCAR";

		var req = http.request(opcoesHTTP, (res) => {
			console.log("Resposta recebida em buscarLinhasGrupo!");
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					let vetor = JSON.parse(msg).resultado;
					cb(vetor)
				});
			}else{
				console.log("Não foi possível buscar linhas grupo");
				cb(null);
			}				
		});
		req.write(texto);
		req.end();
	});
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

function preencheSelect(select, listaLinha){
	$("#" + select + " > option").remove();
	for(var i = 0; i < listaLinha.length; i++){
		$("#" + select).append("<option value='" + listaLinha[i].id + "'> " + listaLinha[i].codigo + " - " + listaLinha[i].nome + "</option>");
	}
}

var vetorLinhasGerais;
var vetorLinhasGrupo;

populaVetorLinhasGerais(function(vetor){
	if(vetor){
		vetorLinhasGerais = vetor;
		populaVetorLinhasGrupo(function(vetor){
			if(vetor){
				vetorLinhasGrupo = vetor;
				var vetorFinal = [];
				for(let i = 0; i < vetorLinhasGrupo.length; i++){
					vetorFinal.push(vetorLinhasGerais[vetorLinhasGrupo[i].codLinha]);
				}
				preencheSelect("linhaDocenteCadastrar", vetorFinal);
			}else{
				console.log("Erro ao listar linhas grupo");
			}
		});
	}else{
		console.log("Erro ao listar linhas gerais");
	}
});