document.getElementById("btnCadastrar").addEventListener('click', cadastra, false);

function cadastra(){
	var modelo = require('./../../modelo/mPublicacao.js').novo();

	modelo.titulo = document.getElementById("tituloPublicacaoCadastrar").value;
	modelo.tipo = document.getElementById("tipoPublicacaoCadastrar").value;
	modelo.codDocente = document.getElementById("docentePublicacaoCadastrar").value;
	modelo.codPesquisa = document.getElementById("pesquisaPublicacaoCadastrar").value;
	if(modelo.codPesquisa == "0"){
		modelo.codPesquisa = null;
	}
	modelo.codLinha = document.getElementById("linhaPublicacaoCadastrar").value;
	modelo.referencia = document.getElementById("referenciaPublicacaoCadastrar").value;
	modelo.data = document.getElementById("dataPublicacaoCadastrar").value;

	var controller = require('./../../controller/cPublicacao.js');

	if(!controller.validar(modelo)){
		document.getElementById('msgErroModal').innerHTML = "Por favor preencha os campos corretamente";
		console.log("MODELO EM VALIDAR: " + JSON.stringify(modelo));
		$("#erroModal").modal('show');
		return;
	}

	var utils = require('./../../utils.js');
	utils.enviaRequisicao("Publicacao", "INSERIR", modelo, function(res){
		if(res.statusCode == 200){
			$('#sucessoModal').modal('show');
			$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
			setTimeout(function(){location.reload();} , 2000);
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível cadastrar publicação";
			$("#erroModal").modal('show');
		}
	});
}