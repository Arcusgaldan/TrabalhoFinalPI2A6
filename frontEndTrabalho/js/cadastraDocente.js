document.getElementById("btnCadastrar").addEventListener("click", cadastra);

function buscaId(docente, cb){
	var http = require('http');
	var utils = require('./../../utils.js');
	
	var objeto = {
		campo: "linkLattes",
		valor: docente.linkLattes
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Docente";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta de buscaId recebida!");
		if(res.statusCode == 200){
			console.log("Achei id de docente!");
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var docente = JSON.parse(msg).resultado[0];
				cb(docente.id);
			});
		}else{
			console.log("Não achei id de docente...");
			cb(null);
		}
	});

	req.write(texto);
	req.end();
}

function formacaoToString(cod){
	var vetor = ["Ensino Fundamental", "Ensino Médio", "Superior", "Especialização", "Mestrado", "Doutorado"];
	cod = parseInt(cod);
	return vetor[cod-1];
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

function verificaCadastro(){
	if(document.getElementById("nomeDocenteCadastrar").value.length == 0){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome no docente";
		$("#erroModal").modal("show");
		return false;
	}else if (document.getElementById("nomeDocenteCadastrar").value.length < 3){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome com mais de três caracteres";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("formacaoDocenteCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir formação do docente";
		document.getElementById("msgErroModal").innerHTML = "<p>Selecione uma formação para o docente a ser cadastrado</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("formacaoDocenteCadastrar").value > 2){
		if (document.getElementById("nomeCursoDocenteCadastrar").value.length == 0){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir nome";
			document.getElementById("msgErroModal").innerHTML = "<p>Favor coloque o nome do curso do docente</p>";
			$("#erroModal").modal("show");	
			return false;
		}else if(document.getElementById("nomeCursoDocenteCadastrar").value.length < 3){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir nome";
			document.getElementById("msgErroModal").innerHTML = "<p>Nome do curso do docente deve ter no mínimo 3 caracteres</p>";
			$("#erroModal").modal("show");	
			return false;
		}

	}
	if(document.getElementById("anoConclusaoDocenteCadastrar").value.length == 0){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor insira um ano de formação para o docente</p>";
		$("#erroModal").modal("show");
		return false;
	}
	var anoAtual = (new Date).getFullYear();
	if(document.getElementById("anoConclusaoDocenteCadastrar").value > anoAtual){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de conclusão maior que data atual</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("anoConclusaoDocenteCadastrar").value.length != 4){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de conclusão deve conter 4 digitos</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("linkLattesDocenteCadastrar").value.length == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir Link Lattes";
		document.getElementById("msgErroModal").innerHTML = "<p>Por favor insira um link lattes</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataEntradaDocenteCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>insira uma data de vínculo do docente com o grupo</p>";
		$("#erroModal").modal("show");
		return false;
	}
	// var verificaDataEntrada = document.getElementById("dataEntradaDocenteCadastrar").value.split("-");
	// var anoEntrada = verificaDataEntrada[0];

	// if(document.getElementById("dataEntradaDocenteCadastrar").value > anoAtual){
	// 	document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
	// 	document.getElementById("msgErroModal").innerHTML = "<p>Ano de vínculo do docente maior que ano atual</p>";
	// 	$("#erroModal").modal("show");
	// 	return false;
	// }
	 return true;
}


function cadastra(){
	if(!verificaCadastro()){
		return;
	}
	var modelo = require('./../../modelo/mDocente.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cDocente.js');
	var docente = modelo.novo();

	docente.id = 0;
	docente.nome = document.getElementById('nomeDocenteCadastrar').value;
	docente.formacao = formacaoToString(document.getElementById('formacaoDocenteCadastrar').value);
	console.log("A formação do rapaz é " + docente.formacao);
	docente.anoConclusao = document.getElementById('anoConclusaoDocenteCadastrar').value;
	docente.nomeCurso = document.getElementById('nomeCursoDocenteCadastrar').value;
	docente.linkLattes = document.getElementById('linkLattesDocenteCadastrar').value;
	docente.dataEntrada = document.getElementById('dataEntradaDocenteCadastrar').value;
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		if(idGrupo == 0){
			console.log("Não foi possível achar o grupo do docente. Favor contatar suporte.");
			alert("Não foi possível achar o grupo do docente. Favor contatar suporte.");
			docente.codGrupo = 0;
			return;
		}else{
			console.log("Grupo do docente é " + idGrupo);
			docente.codGrupo = idGrupo;
			var texto = JSON.stringify(docente);

			var opcoesHTTP = utils.opcoesHTTP(texto);
			opcoesHTTP.headers.Objeto = "Docente";
			opcoesHTTP.headers.Operacao = "INSERIR";

			var req = http.request(opcoesHTTP, (res) => {
				console.log("Chegou a resposta!");
			    res.setEncoding('utf8');
			    //console.log(res);        
			    if(res.statusCode == 200){
			    	buscaId(docente, function(idDocente){
			    		if(!idDocente){
			    			console.log("Não achou id de docente");
			    			document.getElementById("msgErroModal").innerHTML = "Não foi possível cadastrar foto...";
			    			$("erroModal").modal("show");
			    			return;
			    		}
				    	var form = document.getElementById('formCadastroDocente');
				    	form.action = "http://localhost:3000/arquivo/fotoDocente?fileName=" + idDocente;
				    	form.submit();
				    	$('#sucessoModal').modal('show');			    		
			    	});
			    }
			    else{
			    	console.log("FALHA NO CADASTRO");
					$('#erroModal').modal('show');
				}

			});
			req.write(texto);
			req.end();
		}
	});			
}