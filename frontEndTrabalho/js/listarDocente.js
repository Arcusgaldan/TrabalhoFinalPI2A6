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

function stringToFormacao(formacao) {
	var vetor = ["Ensino Fundamental", "Ensino Médio", "Superior", "Especialização", "Mestrado", "Doutorado"];
	return vetor.indexOf(formacao)+1;
}


function criaElementos(listaDocente){
	console.log(" vetor s " + listaDocente);

	console.log("Tamanho vetor s " + listaDocente.length);
	var utils = require('./../../utils.js');
	for(var i=0;i<listaDocente.length;i++){
		$("#tabelaDocente").append("\
		<tr>\
          <th id='nomeDocenteLista"+i+"'></th>\
          <td class='tdDocente'>\
          <button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseDocenteLista"+i+"' role='button' aria-expanded='false' aria-controls='collapse'> Mostra Dados <span class='fas fa-plus'></span></button>  \
            <button id='alterarDocenteLista"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Docente</button>\
            <button id='adicionarLinhaPesquisa"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraLinhaModal' >Adicionar linha de Pesquisa</button>\
            <button id='excluirDocenteLista"+i+"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Docente</button>\
            <div id='collapseDocenteLista"+i+"' class='collapse mostraLista' >\
              <div class='card card-body'>\
                <img id='fotoDocenteDados"+i+"' src='/images/favicon.png' style='width:200px;'>\
                <p><strong>Nome: </strong><span id='nomeDocenteDados"+i+"'></span><a href='/'>Ver Perfil</a></p>\
                <p><strong>Link do Lattes: </strong> <span id='linkLattesDocenteDados"+i+"'></span></p>\
                <p><strong>Formação: </strong> <span id='formacaoDocenteDados"+i+"'></span></p>\
                <p><strong>Data de entrada no grupo: </strong> <span id='dataEntradaDocenteDados"+i+"'></span></p>\
                <p><strong>Linhas de pesquisa: </strong> <span id='linhaPesquisaDocenteDados'"+i+"></span></p>\
              </div>\
            </div>\
          </td>\
        </tr>\
		");
	 

		console.log("fez o append");
		//Puxa o nome que refenrencia o usuário na row
		document.getElementById("nomeDocenteLista" + i).innerHTML = listaDocente[i].nome;

		// PREEENCHE INFORMAÇÕES
		document.getElementById("nomeDocenteDados" + i).innerHTML = listaDocente[i].nome;
		document.getElementById("linkLattesDocenteDados" + i).innerHTML = listaDocente[i].linkLattes;
		document.getElementById("formacaoDocenteDados" + i).innerHTML = listaDocente[i].formacao;
		document.getElementById("dataEntradaDocenteDados" + i).innerHTML = utils.formataData(listaDocente[i].dataEntrada);

		document.getElementById("fotoDocenteDados" + i).src = "/../upload/uploads/fotosDocente/" + listaDocente[i].id + ".jpg";

		var utils = require('./../../utils.js');

		//SELECT l.nome linhaNome, vdl.dataInicio dataInicioVinculo, vdl.dataFim dataFimVinculo FROM TBVinculoDocenteLinha vdl 
		//JOIN TBLinhaPesquisa l ON l.id = vdl.codLinha 
		//JOIN TBDocente d ON d.id = vdl.codDocente 
		//WHERE d.codGrupo = 1 AND vdl.dataFim = '1001-01-01' 
		//ORDER BY vdl.id ASC;

		var argumentos = {};
		argumentos.selectCampos = ["l.nome linhaNome", "vdl.dataInicio dataInicioVinculo", "vdl.dataFim dataFimVinculo"];
		argumentos.aliasTabela = "vdl";
		argumentos.joins = [{tabela: "TBLinhaPesquisa l", on: "l.id = vdl.codLinha"}, {tabela: "TBDocente d", on: "d.id = vdl.codDocente"}];

		var url = window.location.pathname;
		buscaGrupo(url.split("/")[2], function(idGrupo){
			if(idGrupo != 0){
				argumentos.where = "d.codGrupo = " + idGrupo + " AND vdl.dataFim = '1001-01-01'";
				utils.enviaRequisicao("VinculoDocenteLinha", "BUSCARCOMPLETO", argumentos, function(res){
					if(res.statusCode == 200){
						var linhasDocente = "";
						var msg = "";
						res.on('data', function(chunk){
							msg += chunk;
						});
						res.on('end', function(){
							var vetorLinhasDocente = JSON.parse(msg);
							for(var i = 0; i < vetorLinhasDocente.length; i++){
								linhasDocente += "</br>Linha: " + vetorLinhasDocente[i].linhaNome + "</br>Data de Início do Vínculo: " + utils.formataData(vetorLinhasDocente[i].dataInicioVinculo) + "</br>Data de Fim do Vínculo: " + utils.formataData(vetorLinhasDocente[i].dataFimVinculo) + "</br>";
							}
							document.getElementById('linhaPesquisaDocenteDados').innerHTML = linhasDocente;
						});
					}
				});		
			}else{
				document.getElementById('linhaPesquisaDocenteDados').innerHTML = "<i class='fas fa-plus'></i>";
			}
		});
		
		(function(){
			console.log("Docente na closure: " + JSON.stringify(listaDocente[i]));
			var docente = listaDocente[i];		
			console.log("Docente na closure: " + JSON.stringify(docente));	
			document.getElementById("alterarDocenteLista"+ i).addEventListener("click", function(){
				preencheModalAlterar(docente);
			}, false);
			document.getElementById("excluirDocenteLista"+ i).addEventListener("click", function(){
				preencheModalExcluir(docente);
			}, false);
			document.getElementById("adicionarLinhaPesquisa"+i).addEventListener("click", function(){
				preencheModalLinha(docente);
			}, false);
		}());
	}
}



function preencheModalAlterar(docente){
	console.log("Docente em listarDocente::preencheModalAlterar: " + JSON.stringify(docente));

	document.getElementById("idDocenteAlterar").value = docente.id;
	document.getElementById("nomeDocenteAlterar").value = docente.nome;
	document.getElementById("formacaoDocenteAlterar").value = stringToFormacao(docente.formacao);
	if (stringToFormacao(docente.formacao) >= 3) {
		$("#divNomeCursoAlterar").css("display", "block");
		document.getElementById("nomeCursoDocenteAlterar").value = docente.nomeCurso;
	}else{
		document.getElementById("nomeCursoDocenteAlterar").value = "";
	}
	document.getElementById("lattesDocenteAlterar").value = docente.linkLattes;
	document.getElementById("anoConclusaoDocenteAlterar").value = docente.anoConclusao;
	document.getElementById("fotoDocenteAlterar").value = docente.foto;
	console.log("data padrao correto " + docente.dataEntrada.substring(0,10));
	document.getElementById("dataEntradaDocenteAlterar").value = docente.dataEntrada.substring(0,10);

}

function preencheModalExcluir(docente){
	console.log("entrei no modal Excluir com Docente = " + JSON.stringify(docente.nome));
	document.getElementById("nomeDocenteExcluir").innerHTML = docente.nome;
	document.getElementById("idDocenteExcluir").value = docente.id;
}

function preencheModalLinha(docente){
	document.getElementById("idDocenteCadLinha").value = docente.id;
}

var url = window.location.pathname;
buscaGrupo(url.split("/")[2], function(idGrupo){
	if(idGrupo == 0){
		console.log("Não achou o grupo");
		return;
	}
	var utils = require('./../../utils.js');
	var http = require('http');

	var objeto = {
		campo: "codGrupo",
		valor: idGrupo
	}

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP("");
	opcoesHTTP.headers.Objeto = "Docente";
	opcoesHTTP.headers.Operacao = "BUSCAR";


	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		res.on('data', function(chunk){
			console.log("Chunk: " + chunk);
			let vetor = JSON.parse(chunk).resultado;
			criaElementos(vetor);
		});
	});
	req.write(texto);
	req.end();
});
	

