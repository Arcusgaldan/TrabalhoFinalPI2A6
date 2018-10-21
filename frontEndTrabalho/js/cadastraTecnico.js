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
			    	var form = document.getElementById('formCadastroTecnico');
			    	form.action = "http://localhost:3000/arquivo/fotoTecnico?fileName=" + tecnico.nome.replace(" ", "-") + "_" + idGrupo;
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