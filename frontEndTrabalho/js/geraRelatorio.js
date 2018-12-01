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

function copiaTexto(texto){
	console.log("Entrei em copiaTexto com texto = " + texto + "!");
	const el = document.createElement('textarea');
	el.value = texto;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
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
				for (let i = 0;i<relatorio.length;i++) {
				$('#mostraRelatorio').append("\
					<div class='card card-body body-pesquisas'>\
	                  <p><strong>Nome da linha de pesquisa:</strong> <span id='mostraNomeLinha"+i+"'></span></p>\
	                  <p><strong>Data de inicio da linha:</strong> <span id='mostraDataInicioLinha"+i+"'></span></p>\
	                  <p><strong>Data de fim da linha:</strong> <span id='mostraDataFimLinha"+i+"'></span></p>\
	                </div>\
					");


					document.getElementById("mostraNomeLinha"+i).innerHTML = relatorio[i].linhaNome;
					document.getElementById("mostraDataInicioLinha"+i).innerHTML = require("./../../utils.js").formataData(relatorio[i].dataInicio);
					document.getElementById("mostraDataFimLinha"+i).innerHTML = require("./../../utils.js").formataData(relatorio[i].dataFim);

					(function(){
						document.getElementById('mostraNomeLinha' + i).addEventListener('click', function(){
							copiaTexto(relatorio[i].linhaNome);
						}, false);

						document.getElementById('mostraDataInicioLinha' + i).addEventListener('click', function(){
							copiaTexto(require("./../../utils.js").formataData(relatorio[i].dataInicio));
						}, false);

						document.getElementById('mostraDataFimLinha' + i).addEventListener('click', function(){
							copiaTexto(require("./../../utils.js").formataData(relatorio[i].dataFim));
						}, false);						
					}());
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

function relatorioDocente(ano, idGrupo){
	//select * from tbdocente d JOIN tbgrupo g ON d.codGrupo = g.id WHERE d.codGrupo = 2;
	var argumentos = {};
	argumentos.where = "d.codGrupo = " + idGrupo + " AND year(d.dataEntrada) <= " + ano + " AND (d.dataSaida = '1001-01-01' OR year(d.dataSaida) >= " + ano + ")";
	argumentos.aliasTabela = "d";
	argumentos.selectCampos = ["d.nome", "d.dataEntrada", "d.dataSaida"];
	argumentos.joins = [{tabela: "TBGrupo g", on: "d.codGrupo = g.id"}];

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

function relatorioDocenteLinha(ano, idGrupo){
	//SELECT d.nome, l.nome linhaNome, vdl.dataInicio vinculoDataInicio, vdl.dataFim vinculoDataFim FROM TBDocente d 
	//JOIN TBGrupo g ON d.codGrupo = g.id 
	//JOIN TBVinculoDocenteLinha vdl ON vdl.codDocente = d.id 
	//JOIN TBLinhaPesquisa l ON vdl.codLinha = l.id 
	//WHERE d.codGrupo = ->IDGRUPO<- AND year(d.dataEntrada) <= ->ANO<- AND (d.dataSaida = '1001-01-01' OR year(d.dataSaida) >= ->ANO<-) 
	//ORDER BY d.id ASC;

	var argumentos = {};
	argumentos.where = "d.codGrupo = " + idGrupo + " AND year(d.dataEntrada) <= " + ano + " AND (d.dataSaida = '1001-01-01' OR year(d.dataSaida) >= " + ano + ")";
	argumentos.aliasTabela = "d";
	argumentos.selectCampos = ["d.nome", "l.nome linhaNome", "vdl.dataInicio vinculoDataInicio", "vdl.dataFim vinculoDataFim"];
	argumentos.joins = [{tabela: "TBGrupo g", on: "d.codGrupo = g.id"}, {tabela: "TBVinculoDocenteLinha vdl", on: "vdl.codDocente = d.id"}, {tabela: "TBLinhaPesquisa l", on: "vdl.codLinha = l.id"}];

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

function relatorioDiscente(ano, idGrupo){
	
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

			case '3':
				relatorioDocente(ano, idGrupo);
				break;

			case '4':
				relatorioDocenteLinha(ano, idGrupo);
				break;
			default:
				document.getElementById('msgErroModal').innerHTML = "Tipo de relatório ainda não implementado.";
				$("#erroModal").modal('show');
				return;
		}
	});
}