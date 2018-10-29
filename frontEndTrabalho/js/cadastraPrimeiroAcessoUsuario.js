document.getElementById("btnCadastraUsuario").addEventListener('click', cadastra, false);

var idUsuario = localStorage.id;
var usuarioGlobal;

function buscaUsuario(cb){
	var utils = require('./../../utils.js');
	var http = require('http');

	var objeto = {
		campo: "id",
		valor: idUsuario
	};

	var texto = JSON.stringify(objeto);

	if(!utils){
		console.log("Não há utils em buscaUsuario");
	}else{
		console.log("Há utils em buscaUsuario");
	}

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Mensagem recebida!");
		if(res.statusCode == 200){
			console.log("Usuario recebido em buscaUsuario!");
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var usuario = JSON.parse(msg).resultado[0];
				console.log("Usuario em buscaUsuario = " + msg);
				cb(usuario);
			});
		}else{
			console.log("Falha ao receber usuario em buscaUsuario");
			cb(null);
		}
	});

	req.write(texto);
	req.end();
}

function cadastra(){
	var usuario = require('./../../modelo/mUsuario.js').novo();
	var controller = require('./../../controller/cUsuario.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	if(usuarioGlobal){	
		usuario = usuarioGlobal;
		if(usuario.primeiroAcesso == 0){
			console.log("Não é seu primeiro acesso, redirecionando...");
			location.href = "/index";
		}
		usuario.data = usuario.data.substring(0, 10);
		console.log("Em cadastra, usuario = " + JSON.stringify(usuario));
		if(document.getElementById('senhaUsuario').value.length >= 8 && document.getElementById('senhaUsuario').value == document.getElementById('confSenhaUsuario').value){
			usuario.senha = document.getElementById('senhaUsuario').value;
			usuario.primeiroAcesso = 0;
			usuario = utils.senhaHash(usuario);
			if(!controller.validar(usuario)){
				console.log("Falha ao validar usuario em cadastra");
				return;
			}else{
				var texto = JSON.stringify(usuario);
				console.log("Texto em cadastra = " + texto);

				var opcoesHTTP = require('./../../utils.js').opcoesHTTP(texto);
				opcoesHTTP.headers.Objeto = "Usuario";
				opcoesHTTP.headers.Operacao = "ALTERAR";
				
				var req = http.request(opcoesHTTP, (res) => {
					console.log("Resposta recebida do cadastro!");
					if(res.statusCode == 200){
						// $("#sucessoModal").modal("show");
						// $('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
						// setTimeout(function(){location.reload();} , 2000);

						var form = document.getElementById('formCadastroUsuario');
				    	form.action = "http://localhost:3000/arquivo/fotoUsuario?fileName=" + usuario.id;
				    	form.submit();
					}else{
						$("erroModal").modal("show");
					}
				});

				req.write(texto);
				req.end();
			}

		}else if(document.getElementById('senhaUsuario').value.length < 8){
			console.log("A senha deve ter 8 ou mais caracteres");
			document.getElementById("msgErroModal").innerHTML = "A senha deve ter 8 ou mais caracteres";
			$("#erroModal").modal("show");
		}else{
			console.log("Os campos de senhas devem ser iguais!");
			document.getElementById("msgErroModal").innerHTML = "Os campos de senhas devem ser iguais!";
			$("#erroModal").modal("show");
		}
	}else{
		console.log("Não recebeu usuario em cadastra");
		location.href = "/index";
	}

}


if(!localStorage.id){
	console.log("Não está logado, redirecionando...");
	location.href = "/index";
}
buscaUsuario(function(usuario){	
	if(usuario.primeiroAcesso == 0){
		console.log("Não é seu primeiro acesso");
		location.href = "/index";
	}
	usuarioGlobal = usuario;
});