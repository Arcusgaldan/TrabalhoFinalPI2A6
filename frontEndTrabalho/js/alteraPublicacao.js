document.getElementById('btnAlterar').addEventListener('click', altera, false);

function altera(){
	var modelo = require('./../../modelo/mPublicacao.js').novo();

	modelo.id = document.getElementById('idPublicacaoAlterar').value;
	modelo.titulo = document.getElementById("tituloPublicacaoAlterar").value;
	modelo.tipo = document.getElementById("tipoPublicacaoAlterar").value;
	modelo.codDocente = document.getElementById("docentePublicacaoAlterar").value;
	modelo.codPesquisa = document.getElementById("pesquisaPublicacaoAlterar").value;
	if(modelo.codPesquisa == "0"){
		modelo.codPesquisa = null;
	}
	modelo.codLinha = document.getElementById("linhaPublicacaoAlterar").value;
	modelo.referencia = document.getElementById("referenciaPublicacaoAlterar").value;
	modelo.data = document.getElementById("dataPublicacaoAlterar").value;

	var controller = require('./../../controller/cPublicacao.js');

	if(!controller.validar(modelo)){
		document.getElementById('msgErroModal').innerHTML = "Por favor preencha os campos corretamente";
		console.log("MODELO EM VALIDAR: " + JSON.stringify(modelo));
		$("#erroModal").modal('show');
		return;
	}

	var utils = require('./../../utils.js');
	utils.enviaRequisicao('Publicacao', "ALTERAR", modelo, function(res){
		if(res.statusCode == 200){
			$('#sucessoModal').modal('show');
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
			setTimeout(function(){location.reload();} , 2000);
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível alterar publicação";
			$("#erroModal").modal('show');
		}
	});
}