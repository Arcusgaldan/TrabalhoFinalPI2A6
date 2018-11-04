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

function cadastra(){
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