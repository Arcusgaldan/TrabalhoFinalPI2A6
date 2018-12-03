document.getElementById('btnAlterarDocente').addEventListener("click", alterar, false);
	console.log("entrou na função alterar 1");

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
	if(document.getElementById("nomeDocenteAlterar").value.length == 0){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome no docente";
		$("#erroModal").modal("show");
		return false;
	}else if (document.getElementById("nomeDocenteAlterar").value.length < 3){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome com mais de três caracteres";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("formacaoDocenteAlterar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir formação do docente";
		document.getElementById("msgErroModal").innerHTML = "<p>Selecione uma formação para o docente a ser cadastrado</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("formacaoDocenteAlterar").value > 2){
		if (document.getElementById("nomeCursoDocenteAlterar").value.length == 0){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir nome";
			document.getElementById("msgErroModal").innerHTML = "<p>Favor coloque o nome do curso do docente</p>";
			$("#erroModal").modal("show");	
			return false;
		}else if(document.getElementById("nomeCursoDocenteAlterar").value.length < 3){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir nome";
			document.getElementById("msgErroModal").innerHTML = "<p>Nome do curso do docente deve ter no mínimo 3 caracteres</p>";
			$("#erroModal").modal("show");	
			return false;
		}

	}
	if(document.getElementById("anoConclusaoDocenteAlterar").value.length == 0){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor insira um ano de formação para o docente</p>";
		$("#erroModal").modal("show");
		return false;
	}
	var anoAtual = (new Date).getFullYear();
	if(document.getElementById("anoConclusaoDocenteAlterar").value > anoAtual){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de conclusão maior que data atual</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("anoConclusaoDocenteAlterar").value.length != 4){
		// console.log("Entrou no if do ano");
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de conclusão deve conter 4 digitos</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("lattesDocenteAlterar").value.length == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir Link Lattes";
		document.getElementById("msgErroModal").innerHTML = "<p>Por favor insira um link lattes</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataEntradaDocenteAlterar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>insira uma data de vínculo do docente com o grupo</p>";
		$("#erroModal").modal("show");
		return false;
	}
	// var verificaDataEntrada = document.getElementById("dataEntradaDocenteAlterar").value.split("-");
	// var anoEntrada = verificaDataEntrada[0];

	// if(document.getElementById("dataEntradaDocenteAlterar").value > anoEntrada){
	// 	document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
	// 	document.getElementById("msgErroModal").innerHTML = "<p>Ano de vínculo do docente maior que ano atual</p>";
	// 	$("#erroModal").modal("show");
	// 	return false;
	// }
	return true;
}

function alterar(){
	if(!verificaCadastro()){
		return;
	}
	console.log("entrou na função alterar");
	var modelo = require('./../../modelo/mDocente.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cDocente.js');
	var tecnico = modelo.novo();

	tecnico.id = document.getElementById('idDocenteAlterar').value;
	tecnico.nome = document.getElementById('nomeDocenteAlterar').value;
	tecnico.formacao = formacaoToString(document.getElementById('formacaoDocenteAlterar').value);
	console.log("tecnico formacao é igual: " + document.getElementById('formacaoDocenteAlterar').value);
	tecnico.anoConclusao = document.getElementById('anoConclusaoDocenteAlterar').value;
	tecnico.nomeCurso = document.getElementById('nomeCursoDocenteAlterar').value;
	tecnico.linkLattes = document.getElementById('lattesDocenteAlterar').value;
	tecnico.foto = document.getElementById('fotoDocenteAlterar').value;
	tecnico.dataEntrada = document.getElementById('dataEntradaDocenteAlterar').value;

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
			opcoesHTTP.headers.Objeto = "Docente";
			opcoesHTTP.headers.Operacao = "ALTERAR";

			var req = http.request(opcoesHTTP, (res) => {
				console.log("Chegou a resposta!");
			    res.setEncoding('utf8');
			    //console.log(res);        
			    if(res.statusCode == 200){
			    	var form = document.getElementById('formAlteraDocente');
			    	form.action = "http://localhost:3000/arquivo/fotoDocente?fileName=" + tecnico.nome + "_" + idGrupo;
			    	form.submit();
			    	$('#sucessoModal').modal('show');
			    	$('#sucessoModal').addEventListener('toggle', function(){location.reload();});
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