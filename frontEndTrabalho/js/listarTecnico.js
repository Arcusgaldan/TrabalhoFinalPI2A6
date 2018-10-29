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

function criaElementos(listaTecnico){
	console.log(" vetor s " + listaTecnico);

	console.log("Tamanho vetor s " + listaTecnico.length);
	for(var i=0;i<listaTecnico.length;i++){
		$("#tabelaTecnico").append("\
		<tr>\
              <th id='nomeTecnicoLista"+ i +"'>Técnico 001</th>\
              <td>\
              <button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseUsuarioLista"+ i +"' role='button' aria-expanded='false' aria-controls='collapse'> Mostra Dados <span class='fas fa-plus'></span></button>  \
                <button id='alterarTecnicoLista"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Técnico</button>\
                <button id='excluirTecnicoLista"+i+"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Técnico</button>\
                <div id='collapseUsuarioLista"+ i +"' class='collapse mostraLista' >\
                  <div class='card card-body'>\
                    <img id='fotoTecnicoDados"+ i +"' src='images/favicon.png' style='width:200px;'>\
                    <p><strong>Nome: </strong><span id='nomeTecnicoDados"+ i +"'></span></p>\
                    <p><strong>Atividade que realiza: </strong> <span id='atividadeTecnicoDados"+ i +"'></span></p>\
                    <p><strong>Fomação academica:</strong> <span id='formacaoTecnicoDados"+ i +"'></span></p>\
                    <p><strong>Ano de conclusão:</strong> <span id='anoConclusaoTecnicoDados"+ i +"'></span></p>\
                    <p><strong>Nome do curso:</strong> <span id='nomeCursoTecnicoDados"+ i +"'></span></p>\
                    <p><strong>Link do Lattes: </strong> <span id='lattesTecnicoDados"+ i +"'></span></p>\
                  </div>\
                </div>\
              </td>\
            </tr>\
		");
		console.log("fez o append");
		//Puxa o nome que refenrencia o usuário na row
		document.getElementById("nomeTecnicoLista" + i).innerHTML = listaTecnico[i].nome;

		//Puxa os dados para o collapse de exibição deusuário
		document.getElementById("nomeTecnicoDados" + i).innerHTML = listaTecnico[i].nome;
		document.getElementById("atividadeTecnicoDados" + i).innerHTML = listaTecnico[i].atividade;
		document.getElementById("formacaoTecnicoDados" + i).innerHTML = listaTecnico[i].formacao;
		document.getElementById("anoConclusaoTecnicoDados" + i).innerHTML = listaTecnico[i].anoConclusao;
		document.getElementById("nomeCursoTecnicoDados" + i).innerHTML = listaTecnico[i].nomeCurso;
		document.getElementById("lattesTecnicoDados" + i).innerHTML = listaTecnico[i].linkLattes;
		document.getElementById("fotoTecnicoDados" + i).src = "/../upload/uploads/fotosTecnico/" + listaTecnico[i].id + ".jpg";
		
		(function(){
			console.log("Tecnico na closure: " + JSON.stringify(listaTecnico[i]));
			var tecnico = listaTecnico[i];		
			console.log("tecnico na closure: " + JSON.stringify(tecnico));	
			document.getElementById("alterarTecnicoLista"+ i).addEventListener("click", function(){
				preencheModalAlterar(tecnico);
			}, false);
			document.getElementById("excluirTecnicoLista"+ i).addEventListener("click", function(){
				preencheModalExcluir(tecnico);
			}, false);
		}());
	}
}



function preencheModalAlterar(tecnico){
	console.log("tecnico em listarTecnico::preencheModalAlterar: " + JSON.stringify(tecnico));
	
	document.getElementById("nomeTecnicoAlterar").value = tecnico.nome;
	document.getElementById("atividadeTecnicoAlterar").value = tecnico.atividade;
	document.getElementById("formacaoTecnicoAlterar").value = stringToFormacao(tecnico.formacao);
	if (stringToFormacao(tecnico.formacao) >= 3) {
		$("#divNomeCursoAlterar").css("display", "block");
		document.getElementById("nomeCursoTecnicoAlterar").value = tecnico.nomeCurso;
	}else{
		document.getElementById("nomeCursoTecnicoAlterar").value = "";
	}
	document.getElementById("anoConclusaoTecnicoAlterar").value = tecnico.anoConclusao;
	document.getElementById("lattesTecnicoAlterar").value = tecnico.linkLattes;
	document.getElementById("fotoTecnicoAlterar").value = tecnico.foto;
	console.log("data padrao correto " + tecnico.dataEntrada.substring(0,10));
	document.getElementById("dataEntradaTecnicoAlterar").value = tecnico.dataEntrada.substring(0,10);

	document.getElementById("idTecnicoAlterar").value = tecnico.id;
	
}

function preencheModalExcluir(tecnico){
	console.log("entrei no modal Excluir com Tecnico = " + JSON.stringify(tecnico.nome));
	document.getElementById("nomeTecnicoExcluir").innerHTML = tecnico.nome;
	document.getElementById("idTecnicoExcluir").value = tecnico.id;
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
	opcoesHTTP.headers.Objeto = "Tecnico";
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
	

