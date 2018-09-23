function criaElementos(listaUsuario){
	for(var i=0;i<listaUsuario.length;i++){
		$("#tabelaUsuario").append('<tr>\
		    <th id="nomeUsuarioLista'+ i +'"></th>\
		    <td>\
		      <button class="btn btn-info" scope="row" data-toggle="collapse" href="#collapseUsuarioLista'+ i +'" role="button" aria-expanded="false" aria-controls="collapseExample"> Mostra Dados <span class="fas fa-plus"></span></button>\
			  <button id="alterarUsuarioLista'+ i +'" class="btn btn-warning" data-toggle="modal" data-target="#alteraModal" >Alterar Usuário</button>\
		      <button id="excluirUsuarioLista'+ i +'" class="btn btn-danger" data-toggle="modal" data-target="#excluirModal">Excluir Usuário</button>\
		    </td>\
		    <div id="collapseUsuarioLista'+ i +'" class="collapse" > \
		      <div class="card card-body">\
		        <p><strong>Nome: </strong><span id="nomeUsuarioDados'+i+'"></span></p>\
		        <p><strong>Prontuário: </strong> <span id="prontuariUsuarioDados'+i+'"></span></p>\
		        <p><strong>E-Mail: </strong> <span id="emailUsuarioDados'+i+'"></span></p>\
		        <p><strong>Link do Lattes: </strong> <span id="lattesUsuarioDados'+i+'"></span></p>\
		        <p><strong>Tipo de Usuário: </strong> <span id="tipoUsuarioDados'+i+'"></span></p>\
		      </div>\
		    </div>\
		  </tr>\
		');

		document.getElementById("alterarUsuarioLista"+ i).addEventListener("click", function(){preencheModalAlterar(listaUsuario[i])});

		document.getElementById("excluirUsuarioLista"+ i).addEventListener("click", function(){preencheModalExcluir(listaUsuario[i])});

	}

	function preencheModalAlterar(usuario){
		document.getElementById("nomeAlterar").value = usuario.nome;
		document.getElementById("prontuarioAlterar").value = usuario.prontuario;
		document.getElementById("emailAlterar").value = usuario.email;
		document.getElementById("linkLattesAlterar").value = usuario.lattes;
		document.getElementById("fotoAlterar").value = usuario.foto;
	}

	function preencheModalExcluir(usuario){
		document.getElementById("nomeExcluir").value = usuario.nome;
	}


}

var utils = require('./../../utils.js');
var http = require('http');
var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "Usuario";
opcoesHTTP.headers.Operacao = "LISTAR";
var req = http.request(opcoesHTTP, (res) => {
	console.log("Resposta recebida!");
	res.on('data', function(chunk){
		console.log("Chunk: " + chunk);
		let vetor = JSON.parse(chunk);
		
		document.getElementById('nomeUsuaroioLista0').innerHTML = vetor[0].nome;
	});
});
req.end();

