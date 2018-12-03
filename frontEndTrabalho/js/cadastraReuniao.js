document.getElementById('btnCadastrar').addEventListener('click', cadastrar, false);

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

function cadastrar(){
	var reuniao = require('./../../modelo/mReuniao.js').novo();

	reuniao.pauta = document.getElementById('pautaReuniao').value;
	reuniao.data = document.getElementById('dataReuniao').value;
	reuniao.horarioInicio = document.getElementById('horaInicioReuniao').value;
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		if(idGrupo != 0){
			reuniao.codGrupo = idGrupo;
			if(document.getElementById('horaTerminoReuniao').value != ""){
				reuniao.horarioTermino = document.getElementById('horaTerminoReuniao').value;
			}

			console.log("Reuniao a ser inserida é " + JSON.stringify(reuniao));

			var utils = require('./../../utils.js').enviaRequisicao("Reuniao", "INSERIR", reuniao, function(res){
				if(res.statusCode == 200){
					$('#sucessoModal').modal('show');
					$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
			    	setTimeout(function(){location.reload();} , 2000);
				}else{
					document.getElementById('msgErroModal').innerHTML = "Não foi possível inserir reunião";
					$("#erroModal").modal('show');
					return;
				}
			});
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar ID do grupo";
			$("#erroModal").modal('show');
		}		
	});
}