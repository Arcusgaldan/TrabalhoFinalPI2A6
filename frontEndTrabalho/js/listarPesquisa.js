var utils = require('./../../utils.js');
var vetorLinhas = [];
utils.enviaRequisicao('LinhaPesquisa', 'LISTAR', '', function(res){
	if(res.statusCode == 200){
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;
		});
		res.on('end', function(){
			var vetor = JSON.parse(msg);
			for(let i = 0; i < vetor.length; i++){
				vetorLinhas[vetor[i].id] = vetor[i];
			}
		});
	}else{
		document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas de pesquisa";
		$("#erroModal").modal('show');
	}
});

document.getElementById('docentePesquisaCadastrar').addEventListener('change', function(){
	utils.enviaRequisicao('VinculoDocenteLinha', 'BUSCAR', {campo: 'codDocente', valor: document.getElementById('docentePesquisaCadastrar').value}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorVinculo = JSON.parse(msg).resultado;
				$("#linhaPesquisaCadastrar > option").remove();
				for(let i = 0; i < vetorVinculo.length; i++){
					$("#linhaPesquisaCadastrar").append("<option value='" + vetorVinculo[i].codLinha + "'>" + vetorLinhas[vetorVinculo[i].codLinha].nome + "</option>");
				}
			});				
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas do docente";
			$("#erroModal").modal('show');
		}
	});
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

function preencheDocentes(idGrupo){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao('Docente', "BUSCAR", {campo: "codGrupo", valor: idGrupo}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});	
			res.on('end', function(){
				var vetor = JSON.parse(msg).resultado;
				for(let i = 0; i < vetor.length; i++){
					$("#docentePesquisaCadastrar").append("<option value='" + vetor[i].id + "'>" + vetor[i].nome + "</option>");
				}
			});
		}
	});
}


function preencheTabela(listaPesquisa){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao('Aluno', "BUSCAR", {campo: "atual", valor: 1}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});	
			res.on('end', function(){
				var vetorAlunos = [];
				var vetRes = JSON.parse(msg).resultado;
				for(let j = 0; j < vetRes.length; j++){
					vetorAlunos[vetRes[j].codPesquisa] = vetRes[j];
				}

				for(var i=0;i<listaPesquisa.length;i++){
					$("#tabelaPesquisa").append("<tr>\
			                        <th id='tituloPesquisaLista" + i + "'></th>\
			                        <td>\
			                          <button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapsePesquisaLista" + i + "' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
			                          <button id='alterarPesquisaLista" + i + "' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Projeto</button>\
			                          <button id='excluirPesquisaLista" + i + "' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Projeto</button>\
			                          <div id='collapsePesquisaLista" + i + "' class='collapse mostraLista'>\
			                            <div class='card card-body'>\
			                              <p><strong>Docente responsável: </strong> <span id='docentePesquisaDados" + i + "'></span></p>\
			                              <p><strong>Linha de pesquisa: </strong> <span id='linhaPesquisaDados" + i + "'></span></p>\
			                              <p>\
			                                <strong>Aluno: </strong> <span id='nomeAlunoDados" + i + "'>\
			                                  <button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseAlunoLista" + i + "' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
			                                </span>\
			                              </p>\
			                              <div id='collapseAlunoLista' class='collapse mostraAluno'>\
			                               <p><strong>Curso: </strong> <span id='cursoAlunoDados" + i + "'></span></p>\
			                               <p><strong>Currículo Lattes: </strong> <span id='linkLattesAlunoDados" + i + "'></span></p>\
			                              <p><strong>Tipo de bolsa: </strong> <span id='tipoAlunoDados" + i + "'></span></p>\
			                               <p><strong>Data de Início da Orientação: </strong> <span id='dataInicioAlunoDados" + i + "'></span></p>\
			                               <p><strong>Data de Término da Orientação: </strong> <span id='dataFimAlunoDados" + i + "'></span></p>\
			                             </div>\
			                             <p><strong>Data de Inicio: </strong> <span id='dataInicioPesquisaDados" + i + "'></span></p>\
			                             <p><strong>Data de Término: </strong> <span id='dataFimPesquisaDados" + i + "'></span></p>\
			                           </div>\
			                         </td>\
			                       </tr>");
				 

					//Puxa o nome que refenrencia o usuário na row
					document.getElementById("tituloPesquisaLista" + i).innerHTML = listaPesquisa[i].nome;

					// PREEENCHE INFORMAÇÕES
					document.getElementById("docentePesquisaDados" + i).innerHTML = listaPesquisa[i].docenteNome;
					document.getElementById("linhaPesquisaDados" + i).innerHTML = listaPesquisa[i].linhaNome;
					document.getElementById("dataInicioPesquisaDados" + i).innerHTML = listaPesquisa[i].dataInicio;
					document.getElementById("dataFimPesquisaDados" + i).innerHTML = listaPesquisa[i].dataFim;

					document.getElementById("nomeAlunoDados").innerHTML = vetorAlunos[listaPesquisa[i].id].nome;
					document.getElementById("cursoAlunoDados").innerHTML = vetorAlunos[listaPesquisa[i].id].curso;
					document.getElementById("linkLattesAlunoDados").innerHTML = vetorAlunos[listaPesquisa[i].id].linkLattes;
					document.getElementById("dataInicioAlunoDados").innerHTML = vetorAlunos[listaPesquisa[i].id].dataInicio;
					document.getElementById("dataFimAlunoDados").innerHTML = vetorAlunos[listaPesquisa[i].id].dataFim;


					
					(function(){
						var pesquisa = listaPesquisa[i];		
						var aluno = vetorAlunos[pesquisa.id];
						document.getElementById("alterarPesquisaLista"+ i).addEventListener("click", function(){
							preencheModalAlterar(pesquisa, aluno);
						}, false);
						document.getElementById("excluirPesquisaLista"+ i).addEventListener("click", function(){
							preencheModalExcluir(pesquisa);
						}, false);
					}());
				}
			});						
		}else if(res.statusCode != 747){
				document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar alunos";
				$("#erroModal").modal('show');
		}			
	});
}

function preencheModalAlterar(pesquisa, aluno){

}	

function preencheModalExcluir(aluno){

}


var url = window.location.pathname;
buscaGrupo(url.split("/")[2], function(idGrupo){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao("Pesquisa", "BUSCARGRUPO", {idGrupo: idGrupo}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){				
				preencheTabela(JSON.parse(msg));
				preencheDocentes(idGrupo);
			});
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar pesquisas";
			$("#erroModal").modal('show');
		}
	});	
});
