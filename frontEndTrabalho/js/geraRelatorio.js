document.getElementById('btnRelatorio').addEventListener('click', gerar, false);

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

function relatorioLinhaGrupo(ano, idGrupo){
	var argumentos = {};

	argumentos.where = "v.codGrupo = " + idGrupo + " AND year(v.dataInicio) <= " + ano + " AND (v.dataFim = '1001-01-01' OR year(v.dataFim) >= " + ano + ")";
	argumentos.aliasTabela = "v";
	argumentos.selectCampos = ["v.*", "l.nome linhaNome"];
	argumentos.joins = [{tabela: "TBLinhaPesquisa l", on: "v.codLinha = l.id"}, {tabela: "TBGrupo g", on: "g.id = v.codGrupo"}];

	require('./../../utils.js').enviaRequisicao("VinculoGrupoLinha", "BUSCARCOMPLETO", argumentos, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});

			res.on('end', function(){
				var relatorio = JSON.parse(msg);
				console.log("Relatorio: " + msg);//Trocar pelos appends
			});
		}else if(res.statusCode == 747){
			document.getElementById('msgErroModal').innerHTML = "Não existem registros para o ano informado.";
			$("#erroModal").modal('show');
			return;
		}else{
			document.getElementById('msgErroModal').innerHTML = "Erro ao buscar relatório, contate o suporte.";
			$("#erroModal").modal('show');
			return;
		}
	});
}

function gerar(){
	console.log("Entrou na função gerar");
	var regex = /[1-2][0-9][0-9][0-9]/;
	if(!document.getElementById('anoRelatorio').value.match(regex)){
		document.getElementById('msgErroModal').innerHTML = "Por favor, insira um ano válido";
		$("#erroModal").modal('show');
		return;
	}

	if(document.getElementById('tipoRelatorio').value == '0'){		
		document.getElementById('msgErroModal').innerHTML = "Por favor, selecione um relatório";
		$("#erroModal").modal('show');
		return;	
	}

	var ano = parseInt(document.getElementById('anoRelatorio').value);
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		if(idGrupo == 0){
			document.getElementById('msgErroModal').innerHTML = "Não foi possível encontrar o grupo";
			$("#erroModal").modal('show');
			return;	
		}
		switch(document.getElementById('tipoRelatorio').value){
			case '1':
				//console.log("Vou gerar relatorio de linhas de pesquisa do grupo " + idGrupo + " no ano " + ano);
				relatorioLinhaGrupo(ano, idGrupo);
				break;
			default:
				document.getElementById('msgErroModal').innerHTML = "Tipo de relatório ainda não implementado.";
				$("#erroModal").modal('show');
				return;
		}
	});
}