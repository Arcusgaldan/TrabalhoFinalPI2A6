document.getElementById("primeiroGrauCadastrar").addEventListener('change', function(){
	$("#segundoGrauCadastrar > option").remove();
	$("#terceiroGrauCadastrar > option").remove();
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("primeiroGrauCadastrar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		res.on('data', function(chunk){
			var filhos = JSON.parse(chunk);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 2)
					$("#segundoGrauCadastrar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
		});
	});

	req.write(texto);
	req.end();
}, false);

document.getElementById("segundoGrauCadastrar").addEventListener('change', function(){
	$("#terceiroGrauCadastrar > option").remove();
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("segundoGrauCadastrar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		res.on('data', function(chunk){
			var filhos = JSON.parse(chunk);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 3)
					$("#terceiroGrauCadastrar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
		});
	});	

	req.write(texto);
	req.end();
}, false);

document.getElementById("terceiroGrauCadastrar").addEventListener('change', function(){
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("terceiroGrauCadastrar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		res.on('data', function(chunk){
			var filhos = JSON.parse(chunk);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 4)
					$("#quartoGrauCadastrar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
		});
	});	

	req.write(texto);
	req.end();
}, false);

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

function buscarPrimeiroGrau(){
	var http = require('http');
	var utils = require('./../../utils.js');
	var objeto = {
		campo: "grau",
		valor: 1
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		res.on('data', function(chunk){
			let vetor = JSON.parse(chunk).resultado;
			preencheSelect("primeiroGrauCadastrar", vetor);
		});
	});
	req.write(texto);
	req.end();
}

function buscarLinhasGrupo(){
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
			console.log("Resposta recebida!");
			res.on('data', function(chunk){
				let vetor = JSON.parse(chunk).resultado;
				preencheSelect("primeiroGrauCadastrar", vetor);
			});
		});
		req.write(texto);
		req.end();
	});
}

function preencheTabela(listaLinha){
	for(var i = 0; i < listaLinha.length; i++){
		$("#tabelaLinhasGrupo").append("<tr>\
                      <th id='nomeLinhaLista"+i+"'></th>\
                      <td><strong id='codigoLinhaLista"+i+"'></strong></td>\
                      <td>\
                      <button id='' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Linhas de pesquisa</button>\
                        <div id='collapse' class='collapse mostraLista'>\
                          <div class='card card-body'>\
                            <p><strong>Nome: </strong><span id=''></span></p>\
                            <p><strong>Data cadastro: </strong> <span id=''></span></p>\
                            <p><strong>Descrição: </strong> <span id=''></span></p>\
                          </div>\
                        </div>\
                      </td>\
                    </tr>");
	}
}

function preencheSelect(select, listaLinha){
	$("#" + select + " > option").remove();
	for(var i = 0; i < listaLinha.length; i++){
		$("#" + select).append("<option value='" + listaLinha[i].id + "'> " + listaLinha[i].codigo + " - " + listaLinha[i].nome + "</option>");
	}
}

buscarPrimeiroGrau();