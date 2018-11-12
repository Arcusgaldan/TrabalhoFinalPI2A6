document.getElementById('btnExcluir').addEventListener('click', excluir, false);

function excluir(){
	var idPublicacao = document.getElementById('idPublicacaoExcluir').value;

	var utils = require('./../../utils.js');
	utils.enviaRequisicao("Publicacao", "EXCLUIR", {id: idPublicacao}, function(res){
		if(res.statusCode == 200){
			$('#sucessoModal').modal('show');
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
			setTimeout(function(){location.reload();} , 2000);
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível excluir publicação";
			$("#erroModal").modal('show');
		}
	});
}