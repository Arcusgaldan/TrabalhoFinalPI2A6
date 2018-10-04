function criaElementos(listaGrupo){
	console.log("Tamanho vetor" + listaGrupo.length);
	for(var i=0;i<listaGrupo.length;i++){
		$("#tabelaGrupo").append("\
		<tr>\
		    <th id='nomeGrupoLista"+ i +"'></th>\
		    <td>\
				<button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseGrupoLista"+ i +"' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
				<button id='alterarGrupoLista"+ i +"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Grupo</button>\
				<button id='excluirGrupoLista"+ i +"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Grupo</button>\
				<div id='collapseGrupoLista"+ i +"' class='collapse mostraLista' >\
				  <div class='card card-body'>\
				    <p><strong>Nome do Grupo: </strong><span id='nomeGrupoDados"+i+"'></span></p>\
				    <p><strong>Descrição do Grupo: </strong> <span id='descricaoGrupoDados"+i+"'></span></p>\
				    <p><strong>Nome Lider Atual do Grupo: </strong> <span id='nomeLiderGrupoDados"+i+"'></span></p>\
				    <p><strong>Data de Fundação do Grupo: </strong> <span id='fundGrupoDados"+i+"'></span></p>\
				    <p><strong>E-mail do grupo: </strong> <span id='emailGrupoDados"+i+"'></span></p>\
				  </div>\
				</div>\
		    </td>\
		  </tr>\
		");
		//Puxa o nome que refenrencia o usuário na row
		document.getElementById("nomeGrupoLista" + i).innerHTML = listaGrupo[i].nome;

		//Puxa os dados para o collapse de exibição deusuário
		document.getElementById("nomeGrupoDados" + i).innerHTML = listaGrupo[i].nome;
		document.getElementById("descricaoGrupoDados" + i).innerHTML = listaGrupo[i].descricao;
		document.getElementById("nomeLiderGrupoDados" + i).innerHTML = listaGrupo[i].codUsuario;
		document.getElementById("fundGrupoDados" + i).innerHTML = listaGrupo[i].dataFundacao;
		document.getElementById("emailGrupoDados" + i).innerHTML = listaGrupo[i].email;
		

		var funcaoPreencheAlterar = preencheModalAlterar(listaGrupo[i]);
		var funcaoPreencheModalExcluir = preencheModalExcluir(listaGrupo[i]);

		(function(){
			console.log("Grupo na closure: " + JSON.stringify(listaGrupo[i]));
			var grupo = listaGrupo[i];		
			console.log("Grupo na closure: " + JSON.stringify(grupo));	
			document.getElementById("alterarGrupoLista"+ i).addEventListener("click", function(){
				preencheModalAlterar(grupo);
			}, false);
			document.getElementById("excluirGrupoLista"+ i).addEventListener("click", function(){
				preencheModalExcluir(grupo);
			}, false);
		}());

	}
}

function preencheModalAlterar(grupo){
	//console.log("entrei no modal Alterar com grupo = " + JSON.stringify(grupo));
	// document.getElementById("alteraModal").id = alteraModal;
	document.getElementById("nomeGrupoAlterar").value = grupo.nome;
	document.getElementById("siglaGrupoAlterar").value = grupo.sigla;
	document.getElementById("idGrupoAlterar").value = grupo.id;
	document.getElementById("statusGrupoAlterar").value = grupo.status;
	document.getElementById("liderGrupoAlterar").value = grupo.codUsuario;
	
	// document.getElementById("fotoAlterar").value = grupo.foto;
}

function preencheModalExcluir(grupo){
	console.log("entrei no modal Excluir com grupo = " + JSON.stringify(grupo.nome));
	document.getElementById("nomeGrupoExcluir").innerHTML = grupo.nome;
	document.getElementById("idGrupoExcluir").value = grupo.id;
}

var utils = require('./../../utils.js');
var http = require('http');
var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "Grupo";
opcoesHTTP.headers.Operacao = "LISTAR";
var req = http.request(opcoesHTTP, (res) => {
	console.log("Resposta recebida!");
	if(res.statusCode == 200){
		res.on('data', function(chunk){
			console.log("Chunk: " + chunk);
			let vetor = JSON.parse(chunk);
			criaElementos(vetor);
		});
	}else{
		console.log("Não foi possível listar Grupos");
	}
});
req.end();

