function criaElementos(listaUsuario){
	console.log("Tamanho vetor" + listaUsuario.length);
	for(var i=0;i<listaUsuario.length;i++){
		$("#tabelaUsuario").append("\
		<tr>\
		    <th id='nomeUsuarioLista"+ i +"'></th>\
		    <td>\
				<button class='btn btn-info' scope='row' data-toggle='collapse' href='#collapseUsuarioLista"+ i +"' role='button' aria-expanded='false' aria-controls='collapseExample'> Mostra Dados <span class='fas fa-plus'></span></button>\
				<button id='alterarUsuarioLista"+ i +"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Usuário</button>\
				<button id='excluirUsuarioLista"+ i +"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Usuário</button>\
				<div id='collapseUsuarioLista"+ i +"' class='collapse mostraLista' >\
				  <div class='card card-body'>\
				    <p><strong>Nome: </strong><span id='nomeUsuarioDados"+i+"'></span></p>\
				    <p><strong>Prontuário: </strong> <span id='prontuarioUsuarioDados"+i+"'></span></p>\
				    <p><strong>E-Mail: </strong> <span id='emailUsuarioDados"+i+"'></span></p>\
				    <p><strong>Link do Lattes: </strong> <span id='lattesUsuarioDados"+i+"'></span></p>\
				    <p><strong>Tipo de Usuário: </strong> <span id='tipoUsuarioDados"+i+"'></span></p>\
				  </div>\
				</div>\
		    </td>\
		  </tr>\
		");
		//Puxa o nome que refenrencia o usuário na row
		document.getElementById("nomeUsuarioLista" + i).innerHTML = listaUsuario[i].nome;

		//Puxa os dados para o collapse de exibição deusuário
		document.getElementById("nomeUsuarioDados" + i).innerHTML = listaUsuario[i].nome;
		document.getElementById("prontuarioUsuarioDados" + i).innerHTML = listaUsuario[i].prontuario;
		document.getElementById("emailUsuarioDados" + i).innerHTML = listaUsuario[i].email;
		document.getElementById("lattesUsuarioDados" + i).innerHTML = listaUsuario[i].curriculoLattes;
		if(listaUsuario[i].codTipoUsuario  == 1){	
			document.getElementById("tipoUsuarioDados" + i).innerHTML = "Lider";

		}else{
			document.getElementById("tipoUsuarioDados" + i).innerHTML = "Administrador";
		}

		(function(){
			console.log("Usuario na closure: " + JSON.stringify(listaUsuario[i]));
			var usuario = listaUsuario[i];		
			console.log("Usuario na closure: " + JSON.stringify(usuario));	
			document.getElementById("alterarUsuarioLista"+ i).addEventListener("click", function(){
				preencheModalAlterar(usuario);
			}, false);
			document.getElementById("excluirUsuarioLista"+ i).addEventListener("click", function(){
				preencheModalExcluir(usuario);
			}, false);
		}());
	}
}

function preencheModalAlterar(usuario){
	console.log("Usuario em listarUsuario::preencheModalAlterar: " + JSON.stringify(usuario));
	//console.log("entrei no modal Alterar com usuario = " + JSON.stringify(usuario));
	// document.getElementById("alteraModal").id = alteraModal;
	document.getElementById("nomeUsuarioAlterar").value = usuario.nome;
	document.getElementById("prontuarioUsuarioAlterar").value = usuario.prontuario;
	document.getElementById("emailUsuarioAlterar").value = usuario.email;
	document.getElementById("linkLattesUsuarioAlterar").value = usuario.curriculoLattes;
	document.getElementById("idUsuarioAlterar").value = usuario.id;
	document.getElementById("codTipoUsuarioAlterar").value = usuario.codTipoUsuario;	
	document.getElementById("senhaUsuarioAlterar").value = usuario.senha;
	// document.getElementById("fotoAlterar").value = usuario.foto;
}

function preencheModalExcluir(usuario){
	console.log("entrei no modal Excluir com usuario = " + JSON.stringify(usuario.nome));
	document.getElementById("nomeExcluir").innerHTML = usuario.nome;
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
		criaElementos(vetor);
	});
});
req.end();

