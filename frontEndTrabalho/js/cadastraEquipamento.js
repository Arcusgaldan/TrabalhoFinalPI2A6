document.getElementById("btnCadastrar").addEventListener("click", cadastra, false);

function buscaGrupo(sigla, cb){
	var utils = require('./../../utils.js');
	
	var objeto = {
		campo: "sigla",
		valor: sigla
	};

	utils.enviaRequisicao("Grupo", "BUSCAR", objeto, function(res){
		console.log("Chegou a resposta!");
		res.setEncoding('utf8');

		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){				
				var grupo = JSON.parse(msg).resultado[0];
				cb(grupo.id);
			});
		}else{
			cb(0);
		}

	});
}

function verificaCadastro(){
	if(document.getElementById("nomeEquipamentoCadastrar").value.length == 0){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome no equipamento";
		$("#erroModal").modal("show");
		return false;
	}else if (document.getElementById("nomeEquipamentoCadastrar").value.length < 3){
		document.getElementById("msgErroModal").innerHTML = "Favor inserir um nome com mais de três caracteres";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataEntradaEquipamentoCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de cadastro</p>";
		$("#erroModal").modal("show");
		return false;
	}
	if(document.getElementById("dataDescarteEquipamentoCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de descarte</p>";
		$("#erroModal").modal("show");
		return false;
	}	
	 
	var verificaDataEntrada = document.getElementById("dataEntradaEquipamentoCadastrar").value.split("-");
	var verificaDataDescarte = document.getElementById("dataDescarteEquipamentoCadastrar").value.split("-");
	
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

	// if(verificaDataEntrada[0] <= verificaDataDescarte[0]){
	// 	if(verificaDataEntrada[1] <= verificaDataDescarte[1]){
	// 		if(verificaDataEntrada[2] <= verificaDataDescarte[2]){
	// 		}else{
	// 			document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
	// 			document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de descarte superior a de entrada (dia)</p>";
	// 			$("#erroModal").modal("show");
	// 			return false		
	// 		}
	// 	}else{
	// 		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
	// 		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de descarte superior a de entrada (mes)</p>";
	// 		$("#erroModal").modal("show");
	// 		return false	
	// 	}
	// }else{
	// 	document.getElementById("tltErroModal").innerHTML = "Erro ao inserir data";
	// 	document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir data de descarte superior a de entrada (ano)</p>";
	// 	$("#erroModal").modal("show");
	// 	return false
	// }
	
	if(document.getElementById("descricaoEquipamentoCadastrar").value == 0){
		document.getElementById("tltErroModal").innerHTML = "Erro ao inserir descrição";
		document.getElementById("msgErroModal").innerHTML = "<p>Favor inserir descrição do equipamento</p>";
		$("#erroModal").modal("show");
		return false;
	}
	return true;
}

function cadastra(){
	if(!verificaCadastro()){
		return;
	}
	var modelo = require('./../../modelo/mEquipamento.js').novo();
	modelo.nome = document.getElementById("nomeEquipamentoCadastrar").value;
	modelo.dataEntrada = document.getElementById("dataEntradaEquipamentoCadastrar").value;
	if(document.getElementById("dataDescarteEquipamentoCadastrar").value != ""){
		modelo.dataDescarte = document.getElementById("dataDescarteEquipamentoCadastrar").value;
	}else{
		modelo.dataDescarte = "1001-01-01";
	}
	modelo.descricao = document.getElementById("descricaoEquipamentoCadastrar").value;
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		if(idGrupo == 0){
			document.getElementById('msgErroModal').innerHTML = "Não foi possivel buscar o grupo para cadastro de equipamento";
			$("#erroModal").modal("show");
			return;
		}
		
		modelo.codGrupo = idGrupo;

		var controller = require('./../../controller/cEquipamento.js');
		if(!controller.validar(modelo)){
			document.getElementById("msgErroModal").innerHTML = "Os dados não foram validados com sucesso.";
			$("#erroModal").modal("show");
		}

		var utils = require('./../../utils.js');
		utils.enviaRequisicao("Equipamento", "INSERIR", modelo, function(res){
			if(res.statusCode == 200){
				$("#sucessoModal").modal("show");			
				$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
		    	setTimeout(function(){location.reload();} , 2000);
			}else{
				document.getElementById("msgErroModal").innerHTML = "Falha ao cadastrar equipamento";
				$("#erroModal").modal("show");
			}
		});
	});

		
}