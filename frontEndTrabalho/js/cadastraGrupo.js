document.getElementById("btnCadastrar").addEventListener("click", cadastra);

function cadastra(){
	var modelo = require('./../../modelo/mGrupo.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cGrupo.js');
	var grupo = modelo.novo();
	grupo.id = 0;
	grupo.nome = document.getElementById("nomeGrupoCadastrar").value;
	grupo.sigla = document.getElementById("siglaGrupoCadastrar").value;
	grupo.codUsuario = document.getElementById("selectUsuario").value;
	grupo.status = "Aguardando Lider";

	var texto = JSON.stringify(grupo);

	if(!controller.validar(grupo)){
		console.log("Deu ruim"); //Adicionar mensagem de falta de campos em modal/alert
		return;
	}

	console.log("TEXTO: " + texto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "INSERIR";

	console.log("Opções: " + JSON.stringify(opcoesHTTP));

	var req = http.request(opcoesHTTP, (res) => {
	    console.log("Chegou a resposta!");
	    res.setEncoding('utf8');
	    //console.log(res);        
	    if(res.statusCode == 200){
	    	utils.enviaRequisicao("Grupo", "BUSCAR", {campo: "sigla", valor: grupo.sigla}, function(resGrupo){
	    		if(resGrupo.statusCode == 200){
	    			var msgGrupo = "";
	    			resGrupo.on('data', function(chunk){
	    				msgGrupo += chunk;
	    			});
	    			resGrupo.on('end', function(){
	    				var idGrupo = JSON.parse(msgGrupo).resultado[0].id;
	    				utils.enviaRequisicao("DataHoraAtual", "", "", function(resData){
	    					var msgData = "";
	    					resData.on('data', function(chunk){
	    						msgData += chunk;
	    					});
	    					resData.on('end', function(){
	    						var dataAtual = msgData;
	    						utils.enviaRequisicao("LogLider", "INSERIR", {id: 0, data: dataAtual, codGrupo: idGrupo, novoLider: grupo.codUsuario}, function(res){
	    							if(res.statusCode == 200){	    								
								    	$('#sucessoModal').modal('show');
										$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
								    	setTimeout(function(){location.reload();} , 2000);
	    							}else{
	    								document.getElementById('msgErroModal').innerHTML = "Falha ao adicionar ao log de líder";
	    								$("#erroModal").modal("show");
	    							}
	    						});
	    					});
	    				});
	    			});
	    		}else{
	    			document.getElementById('msgErroModal').innerHTML = "Falha ao buscar ID do Grupo recém cadastrado";
	    			$("#erroModal").modal("show");
	    		}
	    	});
	    }
	    else{
	    	document.getElementById('msgErroModal').innerHTML = "Falha no cadastro";
			$('#erroModal').modal('show');    
		}
	}); 	
    req.write(texto);
    req.end();
}