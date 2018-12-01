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
				$('#mostraRelatorio div').remove();
				$('#mostraRelatorio').append("\
					<div class='card card-body body-pesquisas'>\
                      <h1 class='text-center'>Linhas de pesquisa</h1>\
	                </div>\
				");
				for (let i = 0;i<relatorio.length;i++) {
				$('#mostraRelatorio').append("\
					<div class='card card-body body-pesquisas'>\
	                  <p><strong>Nome da linha de pesquisa:</strong> <span id='mostraNomeLinha"+i+"'></span></p>\
	                  <p><strong>Data de inicio da linha:</strong> <span id='mostraDataInicioLinha"+i+"'></span></p>\
	                  <p><strong>Data de fim da linha:</strong> <span id='mostraDataFinalLinha"+i+"'></span></p>\
	                </div>\
					");
					document.getElementById("mostraNomeLinha"+i).innerHTML = relatorio[i].linhaNome;
					document.getElementById("mostraDataInicioLinha"+i).innerHTML = require("./../../utils.js").formataData(relatorio[i].dataInicio);
					document.getElementById("mostraDataFinalLinha"+i).innerHTML = require("./../../utils.js").formataData(relatorio[i].dataFim);
				}
			});
			$('#filtraRelatorio').modal('hide');
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

function relatorioLinhaGrupoDocente(ano, idGrupo){
	var argumentos = {};

	argumentos.where = "vd.codLinha = v.codLinha AND year(vd.dataInicio) <= " + ano + " AND (vd.dataFim = '1001-01-01' OR year(vd.dataFim) >= " + ano + ") AND v.codGrupo = " + idGrupo + " AND year(v.dataInicio) <= " + ano + " AND (v.dataFim = '1001-01-01' OR year(v.dataFim) >= " + ano + ")";
	argumentos.aliasTabela = "v";
	argumentos.selectCampos = ["v.*", "l.nome linhaNome", "d.nome docenteNome"];
	argumentos.joins = [{tabela: "TBLinhaPesquisa l", on: "v.codLinha = l.id"}, {tabela: "TBGrupo g", on: "g.id = v.codGrupo"}, {tabela: "TBDocente d", on: "d.codGrupo = v.codGrupo"}, {tabela: "TBVinculoDocenteLinha vd", on: "d.id = vd.codDocente"}];

	require('./../../utils.js').enviaRequisicao("VinculoGrupoLinha", "BUSCARCOMPLETO", argumentos, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});

			res.on('end', function(){
				var relatorio = JSON.parse(msg);
				console.log("Relatorio: " + msg);//Trocar pelos appends
				$('#mostraRelatorio div').remove();
				$('#mostraRelatorio').append("\
					<div class='card card-body body-pesquisas'>\
                      <h1 class='text-center'>Linha de pesquisa + Docentes Vículados</h1>\
	                </div>\
				");
				for (let i = 0;i<relatorio.length;i++) {
				$('#mostraRelatorio').append("\
					<div class='card card-body body-pesquisas'>\
	                  <p><strong>Nome da linha de pesquisa: </strong> <span id='mostraNomeLinhaGrupoDocente"+i+"'></span></p>\
	                  <p><strong>Docente: </strong> <span id='mostraDocenteLinhaGrupoDocente"+i+"'></span></p>\
	                  <p><strong>Data de inicio do vínculo: </strong> <span id='mostraDataInicioLinhaGrupoDocente"+i+"'></span></p>\
	                  <p><strong>Data de fim do vínculo: </strong> <span id='mostraDataFinalLinhaGrupoDocente"+i+"'></span></p>\
	                </div>\
					");
					document.getElementById("mostraNomeLinhaGrupoDocente"+i).innerHTML = relatorio[i].linhaNome;
					document.getElementById("mostraDataInicioLinhaGrupoDocente"+i).innerHTML = require("./../../utils.js").formataData(relatorio[i].dataInicio);
					document.getElementById("mostraDataFinalLinhaGrupoDocente"+i).innerHTML = require("./../../utils.js").formataData(relatorio[i].dataFim);
					document.getElementById("mostraDocenteLinhaGrupoDocente"+i).innerHTML = relatorio[i].docenteNome;
				}
			});
			$('#filtraRelatorio').modal('hide');
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

function relatorioDocente(ano, idGrupo){
	//elect * from tbdocente d JOIN tbgrupo g ON d.codGrupo = g.id WHERE d.codGrupo = 2;
	var argumentos = {};
	argumentos.where = "d.codGrupo = " + idGrupo + " AND year(d.dataEntrada) <= " + ano + " AND (d.dataSaida = '1001-01-01' OR year(d.dataSaida) >= " + ano;
	argumentos.aliasTabela = "d";
	argumentos.selectCampos = "d.nome, d.dataEntrada, d.dataSaida";
	argumentos.joins = [{Ttabela: "TBGrupo g", on: "d.codGrupo = g.id"}];

	require('./../../utils.js').enviaRequisicao("Docente", "BUSCARCOMPLETO", argumentos, function(res){
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

			case '2':
				relatorioLinhaGrupoDocente(ano, idGrupo);
				break;
			default:
				document.getElementById('msgErroModal').innerHTML = "Tipo de relatório ainda não implementado.";
				$("#erroModal").modal('show');
				return;
		}
	});
}