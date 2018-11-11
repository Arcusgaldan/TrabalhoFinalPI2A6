document.getElementById("btnCadastroLinhaDocente").addEventListener('click', cadastraLinha, false);

function cadastraLinha(){
	console.log("Entrei em cadastraLinhaDocente::cadastraLinha");
	var modelo = require('./../../modelo/mVinculoDocenteLinha.js').novo();

	modelo.codLinha = parseInt(document.getElementById('linhaDocenteCadastrar').value);
	modelo.codDocente = document.getElementById('idDocenteCadLinha').value;

	var utils = require('./../../utils.js');
	utils.enviaRequisicao("DataAtual", "", "", function(res){
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;
		});
		res.on('end', function(){
			modelo.dataInicio = msg.substring(0, 10);
			utils.enviaRequisicao("VinculoDocenteLinha", "INSERIR", modelo, function(res){
				if(res.statusCode == 200){
					$('#sucessoModal').modal('show');
					$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
					setTimeout(function(){location.reload();} , 2000);
				}else{
					document.getElementById('msgErroModal').innerHTML = "Não foi possível cadastrar vínculo de linha com docente";
					$("#erroModal").modal('show');
				}
			});
		});
	});
}