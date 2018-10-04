document.getElementById("btnVerificaEmail").addEventListener("click", verificaEmail);
console.log("carregou esquece senha.js");


function verificaEmail(){
	var email = document.getElementById("emailGerarLink").value;
	var http = require('http');
	var utils = require('./../../utils.js');

	var campos = {
		campo: "email",
		valor: email
	};

	var texto = JSON.stringify(campos);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";
	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a reposta!");
		if(res.statusCode == 200){
			console.log("Ok, vou enviar email!");
			res.on('data', function (chunk) {
				console.log("A resposta em esqueceuSenha::verificaEmail foi: " + chunk);
		    	if(chunk != null){
		    		console.log("Entrando em geraLink com codUsuario = " + JSON.parse(chunk).resultado[0].id + "!");
				    geraLink(JSON.parse(chunk).resultado[0].id, JSON.parse(chunk).resultado[0].email);
				}
		    });
		}else{
			console.log("Este email não está cadastrado no sistema");
  			var ModalSemEmail = document.getElementById('semEmailModal');

			if(ModalSemEmail == null){
			$("#page-top").append('\
			    <!-- Logout Modal-->\
			    <div class="modal fade" id="semEmailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
			    <div class="modal-dialog" role="document">\
			      <div class="modal-content">\
			        <div class="modal-header">\
			          <h5 class="modal-title" id="exampleModalLabel">Email não cadastrado</h5>\
			          <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
			            <span aria-hidden="true">×</span>\
			          </button>\
			        </div>\
			        <div class="modal-body">O e-mail infomado nao consta no nosso sistema</div>\
			        <div class="modal-footer">\
			        </div>\
			      </div>\
			    </div>\
			    </div>\
			    ');
  				$('#semEmailModal').modal('show');
		}
		}
	});

	try{
		req.write(texto);
		req.end();
	}catch(err){
		console.log("Erro fatal: " + err);
	}
}

function geraLink(codUsuario, email){
	console.log("Entrei em geraLink!");
	var http = require('http');
	var modelo = require('./../../modelo/mLinkResetSenha.js');
	var utils = require('./../../utils.js');

	var linkResetSenha = modelo.novo();
	linkResetSenha.codUsuario = codUsuario;

	var texto = JSON.stringify(linkResetSenha);

	console.log("Texto em esqueceuSenha::geraLink = " + texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinkResetSenha";
	opcoesHTTP.headers.Operacao = "INSERIR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		if(res.statusCode == 200){
			console.log("Email enviado!");

			var modalSucessoEmail = document.getElementById('sucessoEmailModal');

			if(modalSucessoEmail == null){
		
			$("#page-top").append('\
			    <!-- Logout Modal-->\
			    <div class="modal fade" id="sucessoEmailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
			    <div class="modal-dialog" role="document">\
			      <div class="modal-content">\
			        <div class="modal-header">\
			          <h5 class="modal-title" id="exampleModalLabel">Sucesso</h5>\
			          <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
			            <span aria-hidden="true">×</span>\
			          </button>\
			        </div>\
			        <div class="modal-body">Operação Relizada com sucesso</div>\
			        <div class="modal-footer">\
			        </div>\
			      </div>\
			    </div>\
			    </div>\
			    ');
  				$('#sucessoEmailModal').modal('show');
			}

		}else if(res.statusCode == 400){
			console.log("Erro fatal ao tentar recuperar senha");
			var modalFalhaEmail = document.getElementById('falhaEmailModal');
			if(modalFalhaEmail == null){
		
			$("#page-top").append('\
			    <!-- Logout Modal-->\
			    <div class="modal fade" id="falhaEmailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
			    <div class="modal-dialog" role="document">\
			      <div class="modal-content">\
			        <div class="modal-header">\
			          <h5 class="modal-title" id="exampleModalLabel">Falha</h5>\
			          <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
			            <span aria-hidden="true">×</span>\
			          </button>\
			        </div>\
			        <div class="modal-body">Falha ao realizar a operação</div>\
			        <div class="modal-footer">\
			        </div>\
			      </div>\
			    </div>\
			    </div>\
			    ');
  				$('#falhaEmailModal').modal('show');
			}
		}else{
			console.log("Falha ao enviar email. Contate o suporte.");
			var modalFalhaEmail = document.getElementById('falhaEmailModal');
			if(modalFalhaEmail == null){
		
			$("#page-top").append('\
			    <!-- Logout Modal-->\
			    <div class="modal fade" id="falhaEmailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
			    <div class="modal-dialog" role="document">\
			      <div class="modal-content">\
			        <div class="modal-header">\
			          <h5 class="modal-title" id="exampleModalLabel">Falha</h5>\
			          <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
			            <span aria-hidden="true">×</span>\
			          </button>\
			        </div>\
			        <div class="modal-body">Falha ao realizar a operação</div>\
			        <div class="modal-footer">\
			        </div>\
			      </div>\
			    </div>\
			    </div>\
			    ');
  				$('#falhaEmailModal').modal('show');
			}
		}
	});

	req.write(texto);
	req.end();
}



