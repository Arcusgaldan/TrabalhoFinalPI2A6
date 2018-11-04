document.getElementById('btnAlterarLider').addEventListener('click', alteraLider, false);

function alteraLider(){
	var utils = require('./../../utils.js');
	var url = window.location.pathname;
	utils.enviaRequisicao("Grupo", "BUSCAR", {campo: "sigla", valor: url.split("/")[2]}, function(res){
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var grupo = JSON.parse(msg).resultado[0];
				grupo.codUsuario = document.getElementById('selectLider').value;
				grupo.dataFundacao = grupo.dataFundacao.substring(0, 10);
				utils.enviaRequisicao("Grupo", "ALTERAR", grupo, function(resAlteraGrupo){
					if(resAlteraGrupo.statusCode == 200){
						utils.enviaRequisicao("DataHoraAtual", "", "", function(resData){
							if(resData.statusCode == 200){
								var data = "";
								resData.on('data', function(chunk){
									data += chunk;
								});
								resData.on('end', function(){
									utils.enviaRequisicao("LogLider", "INSERIR", {id: 0, data: data, codGrupo: grupo.id, novoLider: grupo.codUsuario}, function(resLogLider){
										if(resLogLider.statusCode == 200){												    								
									    	$('#sucessoModal').modal('show');
											$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
									    	setTimeout(function(){location.reload();} , 2000);
										}else{
											document.getElementById('msgErroModal').innerHTML = "Não foi possível inserir o novo líder no log";
											$("#erroModal").modal('show');
										}
									});
								});
							}else{
								document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar a data atual do servidor";
								$("#erroModal").modal('show');
							}
						});
					}else{
						document.getElementById('msgErroModal').innerHTML = "Não foi possível alterar o grupo do líder";
						$("#erroModal").modal('show');
					}
				});
			});
		}else{
			document.getElementById('msgErroModal').innerHTML = "Não foi possível buscar o grupo do líder";
			$("#erroModal").modal('show');
		}
	});
}