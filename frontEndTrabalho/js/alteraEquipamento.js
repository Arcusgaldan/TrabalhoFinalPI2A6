document.getElementById('btnAlterar').addEventListener('click', altera, false);

function altera(){
	var modelo = require('./../../modelo/mEquipamento.js').novo();

	modelo.id = document.getElementById("idEquipamentoAlterar").value;
	modelo.nome = document.getElementById("nomeEquipamentoAlterar").value;
	modelo.dataEntrada = document.getElementById("dataEntradaEquipamentoAlterar").value;
	if(document.getElementById("dataDescarteEquipamentoCadastrar").value != ""){
		modelo.dataDescarte = document.getElementById("dataDescarteEquipamentoAlterar").value;
	}else{
		modelo.dataDescarte = "1001-01-01";
	}
	modelo.descricao = document.getElementById("descricaoEquipamentoAlterar").value;
	modelo.codGrupo = document.getElementById("grupoEquipamentoAlterar").value;

	var utils = require('./../../utils.js');
	utils.enviaRequisicao("Equipamento", "ALTERAR", modelo, function(res){
		if(res.statusCode == 200){
			$("#sucessoModal").modal("show");
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
	    	setTimeout(function(){location.reload();} , 2000);
		}else{
			document.getElementById('msgErroModal').innerHTML = "Erro ao alterar equipamento";
			$('#erroModal').modal('show');
		}		
	});
}