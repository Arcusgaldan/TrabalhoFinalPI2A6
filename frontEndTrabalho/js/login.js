document.getElementById("btnLogin").addEventListener("click", login);

function login(){
	console.log("Etrando em login");
	var utils = require('./../../utils.js');
	var http = require('http');

	var email = document.getElementById('emailLogin').value;
	var senha = document.getElementById('senhaLogin').value;
	
	if (email == "" || senha == ""){
		console.log("email vazio");
		var modalLoginVazio = document.getElementById('loginVazioModal');

		if (email == "" && senha == ""){
			var faltaPreencher = "E-mail e Senha";
		}else if (senha == ""){
			var faltaPreencher = "Senha";
		}else if (email == ""){
			var faltaPreencher = "E-mail";
		}
		

		if(modalLoginVazio == null){
			$("#page-top").append('\
				<!-- Logout Modal-->\
				<div class="modal fade" id="loginVazioModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
					<div class="modal-dialog" role="document">\
						<div class="modal-content">\
							<div class="modal-header">\
							<h5 class="modal-title" id="exampleModalLabel">Campos Vazios</h5>\
							<button class="close" type="button" data-dismiss="modal" aria-label="Close">\
							<span aria-hidden="true">×</span>\
							</button>\
							</div>\
							<div id="msgFaltaPreencher" class="modal-body"></div>\
							<div class="modal-footer">\
							</div>\
						</div>\
					</div>\
				</div>\
				');
		}
		
		document.getElementById("msgFaltaPreencher").innerHTML = "Por favor preencha os campos de " + faltaPreencher +".";

		$('#loginVazioModal').modal('show');
		return;
	}

	senha = utils.stringHash(senha);

	var parametrosBusca = {
		campo: 'email',
		valor: email
	};

	var texto = JSON.stringify(parametrosBusca);
	console.log(texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a resposta!");
		if(res.statusCode == 200){
			console.log("Teve resultado!");
			res.setEncoding('utf8');
		    res.on('data', function (chunk) {
		    	if(chunk != null){
				    if(JSON.parse(chunk).resultado[0].senha == senha){
				    	console.log("Login com sucesso!");
				    	localStorage.id = JSON.parse(chunk).resultado[0].id;
				    	var modalSucessoLogin = document.getElementById('sucessoLoginModal');

						if(modalSucessoLogin == null){
							$("#page-top").append('\
								<!-- Logout Modal-->\
								<div class="modal fade" id="sucessoLoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
									<div class="modal-dialog" role="document">\
										<div class="modal-content">\
											<div class="modal-header">\
											<h5 class="modal-title" id="exampleModalLabel">Sucesso</h5>\
											<button class="close" type="button" data-dismiss="modal" aria-label="Close">\
											<span aria-hidden="true">×</span>\
											</button>\
											</div>\
											<div class="modal-body">Login efetuado com sucesso</div>\
											<div class="modal-footer">\
											</div>\
										</div>\
									</div>\
								</div>\
								');
						}
		 
						$('#sucessoLoginModal').modal('show');
						if(JSON.parse(chunk).resultado[0].primeiroAcesso == 0)
		    				$('#sucessoLoginModal').on('hide.bs.modal', function(e){console.log("Não é o primeiro acesso, recarregando pagina..."); location.reload();});
		    			else
		    				$('#sucessoLoginModal').on('hide.bs.modal', function(e){console.log("É o primeiro acesso, redirecionando..."); window.location = "/primeiroAcessoUsuario";});
				    }else{
				    	console.log("Falha no login");
				    	var modalFalhaLogin = document.getElementById('falhaLoginModal');

						if(modalSucessoLogin == null){
							$("#page-top").append('\
								<!-- Logout Modal-->\
								<div class="modal fade" id="falhaLoginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
									<div class="modal-dialog" role="document">\
										<div class="modal-content">\
											<div class="modal-header">\
											<h5 class="modal-title" id="exampleModalLabel">Sucesso</h5>\
											<button class="close" type="button" data-dismiss="modal" aria-label="Close">\
											<span aria-hidden="true">×</span>\
											</button>\
											</div>\
											<div class="modal-body">Falha ao realizar o login <br><br> Tente Novamente.</div>\
											<div class="modal-footer">\
											</div>\
										</div>\
									</div>\
								</div>\
								');
						}
						$('#sucessoLoginModal').modal('show');

				    }
				}
		    });
	    	//let jsonRes = JSON.parse(res);
	    	// for(var k in jsonRes){
	    	// 	console.log("Key: " + k + "\nValor: " + jsonRes[k]);
	    	// }
		}else if(res.statusCode == 747){
			console.log("Não teve resultado!");
		}else{
			console.log("Erro fatal.");
		}
	}); 

	req.write(texto);
	req.end();
}