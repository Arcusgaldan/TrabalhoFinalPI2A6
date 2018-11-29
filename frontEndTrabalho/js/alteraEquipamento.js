document.getElementById('btnAlterar').addEventListener('click', altera, false);

function verificaCadastro(){
	if(document.getElementById("nomeEquipamentoAlterar").value.length == 0){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome no tecnico";
		$("#erroModal").modal("show");
		return false;
	}else if (document.getElementById("nomeEquipamentoAlterar").value.length < 3){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome com mais de três caracteres";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataEntradaEquipamentoAlterar").value.length == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de cadastro</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataDescarteEquipamentoAlterar").value.length == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de descarte</p>";
		$("#erroModal").modal("show");
		return false;
	}	
	 
	var verificaDataEntrada = document.getElementById("dataEntradaEquipamentoAlterar").value.split("-");
	var verificaDataDescarte = document.getElementById("dataDescarteEquipamentoAlterar").value.split("-");
	
	var anoEntrada = verificaDataEntrada[0];
	var mesEntrada = verificaDataEntrada[1];
	var diaEntrada = verificaDataEntrada[2];

	var anoDescarte = verificaDataDescarte[0];
	var mesDescarte = verificaDataDescarte[1];
	var diaDescarte = verificaDataDescarte[2];

	if (anoDescarte<anoEntrada){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Ano de entrada superior ao ano de descarte</p>";
		$("#erroModal").modal("show");
		return false;
	}else if (anoDescarte=anoEntrada){
		if (mesDescarte<mesEntrada){
			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
			document.getElementById("msgErroModal").innerHTML = "<p>Mês de entrada superior ao mês de descarte</p>";
			$("#erroModal").modal("show");
			return false;
		}else if (mesDescarte==mesEntrada) {
			if (diaDescarte<diaEntrada){
				document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
				document.getElementById("msgErroModal").innerHTML = "<p>Dia de entrada superior ao dia de descarte</p>";
				$("#erroModal").modal("show");
				return false;
			}else{
			}
		}else{
		}
	}else{
	}	

	if(document.getElementById("descricaoEquipamentoAlterar").value.length == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir descrição";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir descrição do equipamento</p>";
		$("#erroModal").modal("show");
		return false;
	}

	return true;
}

function altera(){
	if(!verificaCadastro()){
		return;
	}
	var modelo = require('./../../modelo/mEquipamento.js').novo();

	modelo.id = document.getElementById("idEquipamentoAlterar").value;
	modelo.nome = document.getElementById("nomeEquipamentoAlterar").value;
	modelo.dataEntrada = document.getElementById("dataEntradaEquipamentoAlterar").value;
	if(document.getElementById("dataDescarteEquipamentoAlterar").value != ""){
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