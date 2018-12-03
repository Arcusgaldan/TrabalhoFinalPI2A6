document.getElementById("btnCadastrar").addEventListener("click", cadastra);

function buscaId(tecnico, cb){
	var http = require('http');
	var utils = require('./../../utils.js');
	
	var objeto = {
		campo: "linkLattes",
		valor: tecnico.linkLattes
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Tecnico";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta de buscaId recebida!");
		if(res.statusCode == 200){
			console.log("Achei id de tecnico!");
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var tecnico = JSON.parse(msg).resultado[0];
				cb(tecnico.id);
			});
		}else{
			console.log("Não achei id de tecnico...");
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
	if(document.getElementById("nomeTecnicoCadastrar").value.length == 0){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome no técnico";
		$("#erroModal").modal("show");
		return false;
	}else if (document.getElementById("nomeTecnicoCadastrar").value.length < 3){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome com mais de três caracteres";
		$("#erroModal").modal("show");
		return false;
	}

	if(document.getElementById("atividadeTecnicoCadastrar").value.length == 0){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome em atividade";
		$("#erroModal").modal("show");
		return false;
	}else if (document.getElementById("atividadeTecnicoCadastrar").value.length < 3){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome com mais de três caracteres";
		$("#erroModal").modal("show");
		return false;
	}

	if(document.getElementById("formacaoTecnicoCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir formação do técnico";
		document.getElementById("msgErroModal").innerHTML = "<p>Selecione uma formação para o técnico a ser cadastrado</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("formacaoTecnicoCadastrar").value > 2){
		if (document.getElementById("nomeCursoTecnicoCadastrar").value.length == 0){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir nome";
			document.getElementById("msgErroModal").innerHTML = "<p>Favor coloque o nome do curso do técnico</p>";
			$("#erroModal").modal("show");	
			return false;
		}else if(document.getElementById("nomeCursoTecnicoCadastrar").value.length < 3){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir nome";
			document.getElementById("msgErroModal").innerHTML = "<p>Nome do curso do técnico deve ter no mínimo 3 caracteres</p>";
			$("#erroModal").modal("show");	
			return false;
		}

	}
	if(document.getElementById("anoConclusaoTecnicoCadastrar").value.length == 0){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor insira um ano de formação para o técnico</p>";
		$("#erroModal").modal("show");
		return false;
	}
	var anoAtual = (new Date).getFullYear();
	if(document.getElementById("anoConclusaoTecnicoCadastrar").value > anoAtual){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de conclusão maior que data atual</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("anoConclusaoTecnicoCadastrar").value.length != 4){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de conclusão deve conter 4 digitos</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("linkLattesTecnicoCadastrar").value.length == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir Link Lattes";
		document.getElementById("msgErroModal").innerHTML = "<p>Por favor insira um link lattes</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataEntradaTecnicoCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>insira uma data de vínculo do técnico com o grupo</p>";
		$("#erroModal").modal("show");
		return false;
	}
	// var verificaDataEntrada = document.getElementById("dataEntradaTecnicoCadastrar").value.split("-");
	// var anoEntrada = verificaDataEntrada[0];

	// if(document.getElementById("dataEntradaTecnicoCadastrar").value > anoEntrada){
	// 	document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
	// 	document.getElementById("msgErroModal").innerHTML = "<p>Ano de vínculo do técnico maior que ano atual</p>";
	// 	$("#erroModal").modal("show");
	// 	return false;
	// }
	return true;
}


function cadastra(){
	if(!verificaCadastro()){
		return;
	}
	var modelo = require('./../../modelo/mTecnico.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cTecnico.js');
	var tecnico = modelo.novo();

	tecnico.id = 0;
	tecnico.nome = document.getElementById('nomeTecnicoCadastrar').value;
	tecnico.atividade = document.getElementById('atividadeTecnicoCadastrar').value;
	tecnico.formacao = formacaoToString(document.getElementById('formacaoTecnicoCadastrar').value);
	tecnico.anoConclusao = document.getElementById('anoConclusaoTecnicoCadastrar').value;
	tecnico.nomeCurso = document.getElementById('nomeCursoTecnicoCadastrar').value;
	tecnico.linkLattes = document.getElementById('linkLattesTecnicoCadastrar').value;
	tecnico.dataEntrada = document.getElementById('dataEntradaTecnicoCadastrar').value;
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		if(idGrupo == 0){
			console.log("Não foi possível achar o grupo do técnico. Favor contatar suporte.");
			tecnico.codGrupo = 0;
			return;
		}else{
			console.log("Grupo do técnico é " + idGrupo);
			tecnico.codGrupo = idGrupo;
			var texto = JSON.stringify(tecnico);

			var opcoesHTTP = utils.opcoesHTTP(texto);
			opcoesHTTP.headers.Objeto = "Tecnico";
			opcoesHTTP.headers.Operacao = "INSERIR";

			var req = http.request(opcoesHTTP, (res) => {
				console.log("Chegou a resposta!");
			    res.setEncoding('utf8');
			    //console.log(res);        
			    if(res.statusCode == 200){
			    	buscaId(tecnico, function(idTecnico){
			    		if(!idTecnico){
			    			console.log("Não achou id de tecnico");
			    			document.getElementById("msgErroModal").innerHTML = "Não foi possível cadastrar foto...";
			    			$("erroModal").modal("show");
			    			return;
			    		}
				    	var form = document.getElementById('formCadastroTecnico');
				    	form.action = "http://localhost:3000/arquivo/fotoTecnico?fileName=" + idTecnico;
				    	form.submit();
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