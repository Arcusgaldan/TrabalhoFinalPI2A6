document.getElementById('btnExcluir').addEventListener('click', exclui, false);

function exclui(){
	var objeto = {id: document.getElementById('idEquipamentoExcluir').value}

	var utils = require('./../../utils.js');

	utils.enviaRequisicao("Equipamento", "EXCLUIR", objeto, function(res){
		if(res.statusCode == 200){
			$("#sucessoModal").modal("show");		
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
	    	setTimeout(function(){location.reload();} , 2000);
		}else{
			document.getElementById('msgErroModal').innerHTML = "Falha ao excluir equipamento";
			$("#erroModal").modal("show");
		}
	});
}