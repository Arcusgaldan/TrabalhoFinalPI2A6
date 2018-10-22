document.getElementById("btnCadastrar").addEventListener("click", cadastra);

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

function cadastra(){
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
			    	var form = document.getElementById('formCadastroDocente');
			    	form.action = "http://localhost:3000/arquivo/fotoDocente?fileName=" + docente.nome.replace(" ", "-") + "_" + idGrupo;
			    	form.submit();
			    	$('#sucessoModal').modal('show');
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