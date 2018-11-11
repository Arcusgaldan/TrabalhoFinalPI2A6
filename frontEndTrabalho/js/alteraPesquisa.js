document.getElementById('btnAlterarAluno').addEventListener('click', alteraAluno, false);
document.getElementById('btnAlterarPesquisa').addEventListener('click', alteraPesquisa, false);

function alteraAluno(){
	var modelo = require('./../../modelo/mAluno.js').novo();
	var controller = require('./../../controller/cAluno.js');

	modelo.id = document.getElementById('idAlunoAlterar')
	modelo.nome = document.getElementById('nomeAlunoAlterar').value;
	modelo.curso = document.getElementById('cursoAlunoAlterar').value;
	modelo.linkLattes = document.getElementById('linkLattesAlunoAlterar').value;
	modelo.dataInicio = document.getElementById('dataInicioAlunoAlterar').value;
	modelo.dataFim = document.getElementById('dataFimAlunoAlterar').value;
	if(modelo.dataFim == "")
		modelo.dataFim = "1001-01-01";
	modelo.tipo = document.getElementById('tipoAlunoAlterar').value;
	modelo.codPesquisa = document.getElementById('idPesquisaAlterar').value;


	if(!controller.validar(modelo)){
		document.getElementById('msgErroModal').innerHTML = "Por favor preencha os campos corretamente.";
		$("#erroModal").modal('show');
		return;
	}


	document.getElementById('alunoPesquisaAlterar').value = modelo.nome;
	document.getElementById('cursoAlunoAlterarTemp').value = modelo.curso;
	document.getElementById('linkLattesAlunoAlterarTemp').value = modelo.linkLattes;
	document.getElementById('dataInicioAlunoAlterarTemp').value = modelo.dataInicio;
	document.getElementById('dataFimAlunoAlterarTemp').value = modelo.dataFim;
	document.getElementById('tipoAlunoAlterarTemp').value = modelo.tipo;
	$("#alteraAlunoModal").modal('toggle');

}

function alteraPesquisa(){
	if(document.getElementById('cursoAlunoAlterarTemp').value === ""){
		document.getElementById('msgErroModal').innerHTML = "Por favor insira um aluno";
		$("#erroModal").modal('show');
	}

	var pesquisa = require('./../../modelo/mPesquisa.js').novo();
	var aluno = require('./../../modelo/mAluno.js').novo();

	var cPesquisa = require('./../../controller/cPesquisa.js');

	pesquisa.id = document.getElementById('idPesquisaAlterar').value;
	pesquisa.titulo = document.getElementById('tituloPesquisaAlterar').value;
	pesquisa.codDocente = parseInt(document.getElementById('docentePesquisaAlterar').value);
	pesquisa.codLinha = parseInt(document.getElementById('linhaPesquisaAlterar').value);
	pesquisa.dataInicio = document.getElementById('dataInicioPesquisaAlterar').value;
	pesquisa.dataFim = document.getElementById('dataFimPesquisaAlterar').value;
	if(pesquisa.dataFim == "")
		pesquisa.dataFim = "1001-01-01";

	aluno.id = document.getElementById('idAlunoAlterar').value;
	aluno.nome = document.getElementById('alunoPesquisaAlterar').value;
	aluno.curso = document.getElementById('cursoAlunoAlterarTemp').value;
	aluno.linkLattes = document.getElementById('linkLattesAlunoAlterarTemp').value;
	aluno.dataInicio = document.getElementById('dataInicioAlunoAlterarTemp').value;
	aluno.dataFim = document.getElementById('dataFimAlunoAlterarTemp').value;
	aluno.tipo = document.getElementById('tipoAlunoAlterarTemp').value;
	aluno.atual = 1;
	aluno.codPesquisa = pesquisa.id;

	var antigoAluno = require('./../../modelo/mAluno.js').novo();
	if(aluno.id == 0){
		antigoAluno.id = document.getElementById('idAntigoAlunoAlterar').value;
		antigoAluno.nome = document.getElementById('nomeAntigoAlunoAlterar').value;
		antigoAluno.curso = document.getElementById('cursoAntigoAlunoAlterar').value;
		antigoAluno.linkLattes = document.getElementById('linkLattesAntigoAlunoAlterar').value;
		antigoAluno.dataInicio = document.getElementById('dataInicioAntigoAlunoAlterar').value;
		antigoAluno.dataFim = document.getElementById('dataFimAntigoAlunoAlterar').value;
		antigoAluno.tipo = document.getElementById('tipoAntigoAlunoAlterar').value;
		antigoAluno.atual = 0; 
		antigoAluno.codPesquisa = pesquisa.id;
	}


	var controller = require('./../../controller/cPesquisa.js');

	if(!cPesquisa.validar(pesquisa)){		
		document.getElementById('msgErroModal').innerHTML = /*"Por favor preencha os campos corretamente"*/ "Não passou na validação com modelo = " + JSON.stringify(pesquisa);
		$("#erroModal").modal('show');
		return;
	}

	var utils = require('./../../utils.js');

	utils.enviaRequisicao("Pesquisa", "ALTERAR", pesquisa, function(res){
		if(res.statusCode == 200){
			if(aluno.id == 0){
				utils.enviaRequisicao("Aluno", "INSERIR", aluno, function(res){
					if(res.statusCode == 200){
						utils.enviaRequisicao("Aluno", "ALTERAR", antigoAluno, function(res){
							if(res.statusCode == 200){
								$("#sucessoModal").modal('show');
								$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
								setTimeout(function(){location.reload();} , 2000);
							}else{
								document.getElementById("msgErroModal").innerHTML = "Não foi possível alterar o antigo aluno";
								$("#erroModal").modal('show');
								utils.enviaRequisicao("Aluno", "BUSCAR", {campo: "nome", valor: aluno.nome}, function(res){
									if(res.statusCode == 200){
										var msg = "";
										res.on('data', function(chunk){
											msg += chunk;
										});
										res.on('end', function(){
											var idAluno = JSON.parse(msg).resultado[resultado.length - 1].id;
											utils.enviaRequisicao("Aluno", "EXCLUIR", {id: idAluno}, function(res){
												if(res.statusCode == 200){
													document.getElementById("msgErroModal").innerHTML = "Erro ao cadastrar novo aluno, registro deletado para evitar problemas de integridade.";
													$("#erroModal").modal('show');
												}else{
													document.getElementById("msgErroModal").innerHTML = "Não foi possível excluir o novo aluno. Erro fatal, contate o suporte";
													$("#erroModal").modal('show');
												}
											});
										});
									}else{
										document.getElementById("msgErroModal").innerHTML = "Não foi possível buscar o novo aluno. Erro fatal, contate o suporte";
										$("#erroModal").modal('show');
									}
								});
							}
						});
					}else{
						document.getElementById("msgErroModal").innerHTML = "Não foi possível cadastrar o novo aluno";
						$("#erroModal").modal('show');
					}
				});
			}else{
				utils.enviaRequisicao("Aluno", "ALTERAR", aluno, function(res){
					if(res.statusCode == 200){
						$("#sucessoModal").modal('show');
						$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
						setTimeout(function(){location.reload();} , 2000);
					}else{
						document.getElementById("msgErroModal").innerHTML = "Não foi possível alterar aluno";
						$("#erroModal").modal('show');
					}
				});
			}
		}else{
			document.getElementById("msgErroModal").innerHTML = "Não foi possível alterar a pesquisa";
			$("#erroModal").modal('show');
		}
	});
}