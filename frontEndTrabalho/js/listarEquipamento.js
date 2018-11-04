function criaElementos(listaEquipamentos){
	for(let i = 0; i < listaEquipamentos.length; i++){
		$("#tabelaEquipamentos").append("<tr>\
	                      <th id='nomeEquipamentoLista"+i+"'></th>\
	                      <td>\
	                        <button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseEquipamentosLista"+i+"' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
	                        <button id='alterarEquipamentoLista"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Equipamentos</button>\
	                        <button id='excluirEquipamentoLista"+i+"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Equipamentos</button>\
	                        <div id='collapseEquipamentosLista"+i+"' class='collapse mostraLista' >\
	                          <div class='card card-body'>\
	                            <p><strong>Nome do Equipamento: </strong><span id='nomeEquipamentoDados"+i+"'></span></p>\
	                            <p><strong>Descrição do Equipamento: </strong> <span id='descricaoEquipamentoDados"+i+"'></span></p>\
	                            <p><strong>Data de Entrada: </strong> <span id='dataEntradaEquipamentoDados"+i+"'></span></p>\
	                            <p><strong>Data de Descarte: </strong> <span id='dataDescarteEquipamentoDados"+i+"'></span></p>\
	                          </div>\
	                        </div>\
	                      </td>\
	                    </tr>");

		document.getElementById('nomeEquipamentoLista' + i).innerHTML = listaEquipamentos[i].nome;
		document.getElementById('nomeEquipamentoDados' + i).innerHTML = listaEquipamentos[i].nome;
		document.getElementById('descricaoEquipamentoDados' + i).innerHTML = listaEquipamentos[i].descricao;
		document.getElementById('dataEntradaEquipamentoDados' + i).innerHTML = listaEquipamentos[i].dataEntrada.substring(0, 10);
		document.getElementById('dataDescarteEquipamentoDados' + i).innerHTML = listaEquipamentos[i].dataDescarte.substring(0, 10);

		(function(){
			var equipamento = listaEquipamentos[i];		
			document.getElementById("alterarEquipamentoLista"+ i).addEventListener("click", function(){
				preencheModalAlterar(equipamento);
			}, false);
			document.getElementById("excluirEquipamentoLista"+ i).addEventListener("click", function(){
				preencheModalExcluir(equipamento);
			}, false);
		}());
	}
}

function preencheModalAlterar(equipamento){
	console.log("Equipamento em listarEquipamento::preencheModalAlterar: " + JSON.stringify(equipamento));

	document.getElementById("nomeEquipamentoAlterar").value = equipamento.nome;
	document.getElementById("descricaoEquipamentoAlterar").value = equipamento.descricao;
	document.getElementById("dataEntradaEquipamentoAlterar").value = equipamento.dataEntrada.substring(0, 10);
	document.getElementById("dataDescarteEquipamentoAlterar").value = equipamento.dataDescarte.substring(0, 10);
	document.getElementById("idEquipamentoAlterar").value = equipamento.id;
	document.getElementById("grupoEquipamentoAlterar").value = equipamento.codGrupo;
}

function preencheModalExcluir(equipamento){
	document.getElementById("nomeEquipamentoExcluir").innerHTML = equipamento.nome;
	document.getElementById("idEquipamentoExcluir").value = equipamento.id;
}

function buscaGrupo(sigla, cb){
	var utils = require('./../../utils.js');
	
	var objeto = {
		campo: "sigla",
		valor: sigla
	};

	utils.enviaRequisicao("Grupo", "BUSCAR", objeto, function(res){
		console.log("Chegou a resposta!");
		res.setEncoding('utf8');

		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){				
				var grupo = JSON.parse(msg).resultado[0];
				cb(grupo.id);
			});
		}else{
			cb(0);
		}

	});
}

var utils = require('./../../utils.js');

var url = window.location.pathname;
buscaGrupo(url.split("/")[2], function(idGrupo){
	if(idGrupo == 0){
		console.log("Não foi possível buscar grupo");
		document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar grupo";
		$("#erroModal").modal("show");
	}else{
		var objeto = {
			campo: "codGrupo",
			valor: idGrupo
		};

		utils.enviaRequisicao("Equipamento", "BUSCAR", objeto, function(res){
			console.log("Resposta de listar equipamentos recebida!");
			if(res.statusCode == 200){
				var msg = "";
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var vetor = JSON.parse(msg).resultado;
					criaElementos(vetor);
				});
			}
		});
	}
});

		