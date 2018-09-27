function criaElementos(listaGrupo){
	console.log("Tamanho vetor" + listaGrupo.length);
	for(var i=0;i<listaGrupo.length;i++){
		$("#tabelaGrupo").append("\
		<tr>\
		    <th id='nomeGrupoLista"+ i +"'></th>\
		    <td>\
				<button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseGrupoLista"+ i +"' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
				<button id='alterarGrupoLista"+ i +"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Usuário</button>\
				<button id='excluirGrupoLista"+ i +"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Usuário</button>\
				<div id='collapseGrupoLista"+ i +"' class='collapse mostraLista' >\
				  <div class='card card-body'>\
				    <p><strong>Nome: </strong><span id='nomeGrupoDados"+i+"'></span></p>\
				    <p><strong>Prontuário: </strong> <span id='prontuarioGrupoDados"+i+"'></span></p>\
				    <p><strong>E-Mail: </strong> <span id='emailGrupoDados"+i+"'></span></p>\
				    <p><strong>Link do Lattes: </strong> <span id='lattesGrupoDados"+i+"'></span></p>\
				    <p><strong>Tipo de Usuário: </strong> <span id='tipoGrupoDados"+i+"'></span></p>\
				  </div>\
				</div>\
		    </td>\
		  </tr>\
		");
		//Puxa o nome que refenrencia o usuário na row
		document.getElementById("nomeGrupoLista" + i).innerHTML = listaGrupo[i].nome;

		//Puxa os dados para o collapse de exibição deusuário
		document.getElementById("nomeGrupoDados" + i).innerHTML = listaGrupo[i].nome;
		document.getElementById("prontuarioGrupoDados" + i).innerHTML = listaGrupo[i].prontuario;
		document.getElementById("emailGrupoDados" + i).innerHTML = listaGrupo[i].email;
		document.getElementById("lattesGrupoDados" + i).innerHTML = listaGrupo[i].curriculoLattes;
		if(listaGrupo[i].codTipoGrupo  == 1){	
			document.getElementById("tipoGrupoDados" + i).innerHTML = "Lider";

		}else{
			document.getElementById("tipoGrupoDados" + i).innerHTML = "Administrador";
		}

		var funcaoPreencheAlterar = preencheModalAlterar(listaGrupo[i]);
		var funcaoPreencheModalExcluir = preencheModalExcluir(listaGrupo[i]);

		document.getElementById("alterarGrupoLista"+ i).addEventListener("click", funcaoPreencheAlterar);

		document.getElementById("excluirGrupoLista"+ i).addEventListener("click", funcaoPreencheModalExcluir);

	}
}

function preencheModalAlterar(grupo){
	//console.log("entrei no modal Alterar com grupo = " + JSON.stringify(grupo));
	// document.getElementById("alteraModal").id = alteraModal;
	document.getElementById("nomeAlterar").value = grupo.nome;
	document.getElementById("prontuarioAlterar").value = grupo.prontuario;
	document.getElementById("emailAlterar").value = grupo.email;
	document.getElementById("linkLattesAlterar").value = grupo.curriculoLattes;
	// document.getElementById("fotoAlterar").value = grupo.foto;
}

function preencheModalExcluir(grupo){
	console.log("entrei no modal Excluir com grupo = " + JSON.stringify(grupo.nome));
	document.getElementById("nomeExcluir").innerHTML = grupo.nome;
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
			//criaElementos(vetor);
		});
	}else{
		console.log("Não foi possível listar Grupos");
	}
});
req.end();

