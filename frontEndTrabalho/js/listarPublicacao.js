document.getElementById('docentePublicacaoCadastrar').addEventListener('change', puxaLinhasDocenteCadastrar, false);
document.getElementById('docentePublicacaoCadastrar').addEventListener('change', puxaPesquisasDocenteCadastrar, false);
document.getElementById('docentePublicacaoAlterar').addEventListener('change', puxaLinhasDocenteAlterar, false);
document.getElementById('docentePublicacaoAlterar').addEventListener('change', puxaPesquisasDocenteAlterar, false);

var vetorLinhas = [];

document.getElementById('pesquisaPublicacaoCadastrar').addEventListener('change', function(){
	var utils = require('./../../utils.js');
	if(document.getElementById('pesquisaPublicacaoCadastrar').value == "0"){
		utils.enviaRequisicao("VinculoDocenteLinha", "BUSCAR", {campo: "codDocente", valor: document.getElementById('docentePublicacaoCadastrar').value}, function(res){
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var vetorLinhasDocente = JSON.parse(msg).resultado;
					$("#linhaPublicacaoCadastrar > option").remove();
					for(let i = 0; i < vetorLinhasDocente.length; i++){
						$("#linhaPublicacaoCadastrar").append("<option value='"+vetorLinhasDocente[i].codLinha+"'>"+vetorLinhas[vetorLinhasDocente[i].codLinha].nome+"</option>");
					}
				});
			}else{
				document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas de pesquisa do grupo";
				$("#erroModal").modal('show');
			}
		});
	}else{
		utils.enviaRequisicao("Pesquisa", "BUSCAR", {campo: "id", valor: document.getElementById('pesquisaPublicacaoCadastrar').value}, function(res){
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var idLinha = JSON.parse(msg).resultado[0].codLinha;
					utils.enviaRequisicao("LinhaPesquisa", "BUSCAR", {campo: "id", valor: idLinha}, function(res){
						if(res.statusCode == 200){
							var msg = "";
							res.on('data', function(chunk){
								msg += chunk;
							});
							res.on('end', function(chunk){
								var linha = JSON.parse(msg).resultado[0];
								$("#linhaPublicacaoCadastrar > option").remove();
								$("#linhaPublicacaoCadastrar").append("<option value='"+linha.id+"'>"+linha.nome+"</option>");
							});
						}else{
							document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linha de pesquisa da pesquisa";
							$("#erroModal").modal('show');
						}
					});
				});
			}else{
				document.getElementById('msgErroModal').innerHTML = "Não foi possível encontrar a pesquisa selecionada";
				$("#erroModal").modal('show');
			}
		});
	}
}, false);

document.getElementById('pesquisaPublicacaoAlterar').addEventListener('change', function(){
	var utils = require('./../../utils.js');
	if(document.getElementById('pesquisaPublicacaoAlterar').value == "0"){
		utils.enviaRequisicao("VinculoDocenteLinha", "BUSCAR", {campo: "codDocente", valor: document.getElementById('docentePublicacaoAlterar').value}, function(res){
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var vetorLinhasDocente = JSON.parse(msg).resultado;
					$("#linhaPublicacaoAlterar > option").remove();
					for(let i = 0; i < vetorLinhasDocente.length; i++){
						$("#linhaPublicacaoAlterar").append("<option value='"+vetorLinhasDocente[i].codLinha+"'>"+vetorLinhas[vetorLinhasDocente[i].codLinha].nome+"</option>");
					}
				});
			}else{
				document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas de pesquisa do grupo";
				$("#erroModal").modal('show');
			}
		});
	}else{
		utils.enviaRequisicao("Pesquisa", "BUSCAR", {campo: "id", valor: document.getElementById('pesquisaPublicacaoAlterar').value}, function(res){
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var idLinha = JSON.parse(msg).resultado[0].codLinha;
					utils.enviaRequisicao("LinhaPesquisa", "BUSCAR", {campo: "id", valor: idLinha}, function(res){
						if(res.statusCode == 200){
							var msg = "";
							res.on('data', function(chunk){
								msg += chunk;
							});
							res.on('end', function(chunk){
								var linha = JSON.parse(msg).resultado[0];
								$("#linhaPublicacaoAlterar > option").remove();
								$("#linhaPublicacaoAlterar").append("<option value='"+linha.id+"'>"+linha.nome+"</option>");
							});
						}else{
							document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linha de pesquisa da pesquisa";
							$("#erroModal").modal('show');
						}
					});
				});
			}else{
				document.getElementById('msgErroModal').innerHTML = "Não foi possível encontrar a pesquisa selecionada";
				$("#erroModal").modal('show');
			}
		});
	}
}, false);

function listaLinhas(cb){
	var utils = require('./../../utils.js')
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
				cb(200);
			});
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas de pesquisa";
			$("#erroModal").modal('show');
			cb(400);
		}
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

function preencheTabela(listaPublicacao, idGrupo){
	//console.log("ENTREI EM PREENCHETABELA COM listaPublicacao = " + JSON.stringify(listaPublicacao));
	var utils = require('./../../utils.js');
	utils.enviaRequisicao("Pesquisa", "BUSCARGRUPO", {idGrupo: idGrupo}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetRes = JSON.parse(msg);
				var vetorPesquisa = [];
				for(let i = 0; i < vetRes.length; i++){
					vetorPesquisa[vetRes[i].id] = vetRes[i];
				}
				//console.log("VOU ENTRAR NO FOR QUE FAZ APPEND COM listaPublicacao.length = " + listaPublicacao.length);
				for(let i = 0; i < listaPublicacao.length; i++){
					$("#tabelaPublicacao").append("<tr>\
			                      <th id='tituloPublicacaoLista"+i+"'></th>\
			                      <td>\
			                        <button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapsePublicacaoLista"+i+"' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
			                        <button id='alterarPublicacaoLista"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Publicação</button>\
			                        <button id='excluirPublicacaoLista"+i+"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Publicação</button>\
			                        <div id='collapsePublicacaoLista"+i+"' class='collapse mostraLista' >\
			                          <div class='card card-body'><p><strong>Projeto (opcional): </strong> <span id='pesquisaPublicacaoDados"+i+"'></span></p>\
			                            <p><strong>Tipo da Publicação: </strong> \
			                            <span id='tipoPublicacaoDados"+i+"'></span></p>\
			                            <p><strong>Docente responsável pela publicação: </strong> <span id='docentePublicacaoDados"+i+"'></span></p>\
			                            <p><strong>Linha de pesquisa: </strong> <span id='linhaPublicacaoDados"+i+"'></span></p>\
			                            <p><strong>Referência ABNT: </strong> <span id='referenciaPublicacaoDados"+i+"'></span></p>\
			                            <p><strong>Data de publicação: </strong> <span id='dataPublicacaoDados"+i+"'></span></p>\
			                          </div>\
			                      </td>\
			                    </tr>");

					document.getElementById('tituloPublicacaoLista'+i).innerHTML = listaPublicacao[i].titulo;

					if(listaPublicacao[i].codPesquisa){
						document.getElementById('pesquisaPublicacaoDados'+i).innerHTML = vetorPesquisa[listaPublicacao[i].codPesquisa].titulo;
					}else{
						document.getElementById('pesquisaPublicacaoDados'+i).innerHTML = '-';
					}
					document.getElementById('tipoPublicacaoDados'+i).innerHTML = listaPublicacao[i].tipo;
					document.getElementById('linhaPublicacaoDados'+i).innerHTML = listaPublicacao[i].linhaNome;
					document.getElementById('docentePublicacaoDados'+i).innerHTML = listaPublicacao[i].docenteNome;
					document.getElementById('referenciaPublicacaoDados'+i).innerHTML = listaPublicacao[i].referencia;
					document.getElementById('dataPublicacaoDados'+i).innerHTML = utils.formataData(listaPublicacao[i].data);

					(function(){
						var publicacao = listaPublicacao[i];
						var pesquisa = vetorPesquisa[publicacao.codPesquisa];		
						document.getElementById("alterarPublicacaoLista"+ i).addEventListener("click", function(){
							preencheModalAlterar(publicacao);
						}, false);
						document.getElementById("excluirPublicacaoLista"+ i).addEventListener("click", function(){
							preencheModalExcluir(publicacao);
						}, false);
					}());
				}
			});
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar pesquisas do grupo";
			$("#erroModal").modal('show');
		}
	});
}

function preencheModalAlterar(publicacao){
	document.getElementById('idPublicacaoAlterar').value = publicacao.id;
	document.getElementById('tituloPublicacaoAlterar').value = publicacao.titulo;
	document.getElementById('tipoPublicacaoAlterar').value = publicacao.tipo;
	document.getElementById('docentePublicacaoAlterar').value = publicacao.docenteId;
	if(!publicacao.codPesquisa){
		document.getElementById('pesquisaPublicacaoAlterar').value = "0";
	}else{
		document.getElementById('pesquisaPublicacaoAlterar').value = publicacao.codPesquisa;
	}
	document.getElementById('linhaPublicacaoAlterar').value = publicacao.linhaId;
	document.getElementById('referenciaPublicacaoAlterar').value = publicacao.referencia;
	document.getElementById('dataPublicacaoAlterar').value = publicacao.data.substring(0, 10);
}

function preencheModalExcluir(publicacao){
	document.getElementById('idPublicacaoExcluir').value = publicacao.id;
	document.getElementById('tituloPublicacaoExcluir').innerHTML = publicacao.titulo;
}

function preencheDocentes(idGrupo){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao("Docente", "BUSCAR", {campo: "codGrupo", valor: idGrupo}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorDocente = JSON.parse(msg).resultado;
				$("#docentePublicacaoCadastrar > option").remove();
				// $("#docentePublicacaoCadastrar").append("<option value='0'>Docente</option>");
				for(let i = 0; i < vetorDocente.length; i++){
					$("#docentePublicacaoCadastrar").append("<option value='"+vetorDocente[i].id+"'>"+vetorDocente[i].nome+"</option>");
					$("#docentePublicacaoAlterar").append("<option value='"+vetorDocente[i].id+"'>"+vetorDocente[i].nome+"</option>");
					if(i == 0){
						document.getElementById('docentePublicacaoCadastrar').value = vetorDocente[i].id;
						document.getElementById('docentePublicacaoAlterar').value = vetorDocente[i].id;
					}
				}
				puxaLinhasDocenteCadastrar();
				puxaLinhasDocenteAlterar();
				puxaPesquisasDocenteCadastrar();
				puxaPesquisasDocenteAlterar();
			});
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar docentes do grupo";
			$("#erroModal").modal('show');
		}
	});
}

function puxaLinhasDocenteCadastrar(){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao('VinculoDocenteLinha', 'BUSCAR', {campo: 'codDocente', valor: document.getElementById('docentePublicacaoCadastrar').value}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorVinculo = JSON.parse(msg).resultado;
				$("#linhaPublicacaoCadastrar > option").remove();
				for(let i = 0; i < vetorVinculo.length; i++){
					$("#linhaPublicacaoCadastrar").append("<option value='" + vetorVinculo[i].codLinha + "'>" + vetorLinhas[vetorVinculo[i].codLinha].nome + "</option>");
				}
			});				
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas do docente";
			$("#erroModal").modal('show');
		}
	});
}

function puxaLinhasDocenteAlterar(){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao('VinculoDocenteLinha', 'BUSCAR', {campo: 'codDocente', valor: document.getElementById('docentePublicacaoAlterar').value}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorVinculo = JSON.parse(msg).resultado;
				$("#linhaPublicacaoAlterar > option").remove();
				for(let i = 0; i < vetorVinculo.length; i++){
					$("#linhaPublicacaoAlterar").append("<option value='" + vetorVinculo[i].codLinha + "'>" + vetorLinhas[vetorVinculo[i].codLinha].nome + "</option>");
				}
			});				
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar linhas do docente";
			$("#erroModal").modal('show');
		}
	});
}

function puxaPesquisasDocenteCadastrar(){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao('Pesquisa', 'BUSCAR', {campo: 'codDocente', valor: document.getElementById('docentePublicacaoCadastrar').value}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorPesquisa = JSON.parse(msg).resultado;
				$("#pesquisaPublicacaoCadastrar > option").remove();
				$("#pesquisaPublicacaoCadastrar").append("<option value='0'>Publicação sem pesquisa</option>");
				for(let i = 0; i < vetorPesquisa.length; i++){
					$("#pesquisaPublicacaoCadastrar").append("<option value='" + vetorPesquisa[i].id + "'>" + vetorPesquisa[i].titulo + "</option>");
				}
			});				
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar pesquisas do docente";
			$("#erroModal").modal('show');
		}
	});
}

function puxaPesquisasDocenteAlterar(){
	var utils = require('./../../utils.js');
	utils.enviaRequisicao('Pesquisa', 'BUSCAR', {campo: 'codDocente', valor: document.getElementById('docentePublicacaoAlterar').value}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var vetorPesquisa = JSON.parse(msg).resultado;
				$("#pesquisaPublicacaoAlterar > option").remove();
				$("#pesquisaPublicacaoAlterar").append("<option value='0'>Publicação sem pesquisa</option>");
				for(let i = 0; i < vetorPesquisa.length; i++){
					$("#pesquisaPublicacaoAlterar").append("<option value='" + vetorPesquisa[i].id + "'>" + vetorPesquisa[i].titulo + "</option>");
				}
			});				
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar pesquisas do docente";
			$("#erroModal").modal('show');
		}
	});
}

listaLinhas(function(){
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		preencheDocentes(idGrupo);
		var utils = require('./../../utils.js');
		utils.enviaRequisicao("Publicacao", "BUSCARGRUPO", {idGrupo: idGrupo}, function(res){
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var vetor = JSON.parse(msg);
					//console.log("Publicações deste grupo: " + msg);
					preencheTabela(vetor, idGrupo);
				});
			}else if(res.statusCode != 747){
				document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar publicações do grupo";
				$("#erroModal").modal('show');
			}
		});
	});
});