document.getElementById('btnAlunoCadastrar').addEventListener('click', cadastraAluno, false);
document.getElementById('btnCadastrar').addEventListener('click', cadastra, false);

function cadastraAluno(){
	var modelo = require('./../../modelo/mAluno.js').novo();
	var controller = require('./../../controller/cAluno.js');

	modelo.nome = document.getElementById('nomeAlunoCadastrar').value;
	modelo.curso = document.getElementById('cursoAlunoCadastrar').value;
	modelo.linkLattes = document.getElementById('linkLattesAlunoCadastrar').value;
	modelo.dataInicio = document.getElementById('dataInicioAlunoCadastrar').value;
	modelo.dataFim = document.getElementById('dataFimAlunoCadastrar').value;
	modelo.tipo = document.getElementById('tipoAlunoCadastrar').value;
	modelo.codPesquisa = 0;

	console.log("MODELO EM cadastraPesquisa::cadastraAluno: " + JSON.stringify(modelo));

	if(!controller.validar(modelo)){
		console.log("Não passou na validação                      em cadastraPesquisa::cadastraAluno com modelo = " + JSON.stringify(modelo));
		document.getElementById('msgErroModal').innerHTML = "Por favor preencha os campos corretamente.";
		$("#erroModal").modal('show');
		return;
	}

	document.getElementById('alunoPesquisaCadastrar').value = modelo.nome;
	document.getElementById('cursoAlunoCadastrarTemp').value = modelo.curso;
	document.getElementById('linkLattesAlunoCadastrarTemp').value = modelo.linkLattes;
	document.getElementById('dataInicioAlunoCadastrarTemp').value = modelo.dataInicio;
	document.getElementById('dataFimAlunoCadastrarTemp').value = modelo.dataFim;
	document.getElementById('tipoAlunoCadastrarTemp').value = modelo.tipo;
	$("#cadastraAlunoModal").modal('toggle');

}

function cadastra(){
	var pesquisa = require('./../../modelo/mPesquisa.js').novo();
	var aluno = require('./../../modelo/mAluno.js').novo();

	var cPesquisa = require('./../../controller/cPesquisa.js');

	pesquisa.id = 0;
	pesquisa.titulo = document.getElementById('tituloPesquisaCadastrar').value;
	pesquisa.codDocente = document.getElementById('docentePesquisaCadastrar').value;
	pesquisa.codLinha = document.getElementById('linhaPesquisaCadastrar').value;
	pesquisa.dataInicio = document.getElementById('dataInicioPesquisaCadastrar').value;
	pesquisa.dataFim = document.getElementById('dataFimPesquisaCadastrar').value;

	aluno.id = 0;
	aluno.nome = document.getElementById('alunoPesquisaCadastrar').value;
	aluno.curso = document.getElementById('cursoAlunoCadastrarTemp').value;
	aluno.linkLattes = document.getElementById('linkLattesAlunoCadastrarTemp').value;
	aluno.dataInicio = document.getElementById('dataInicioAlunoCadastrarTemp').value;
	aluno.dataFim = document.getElementById('dataFimAlunoCadastrarTemp').value;
	aluno.tipo = document.getElementById('tipoAlunoCadastrarTemp').value;


	var controller = require('./../../controller/cPesquisa.js');

	if(!cPesquisa.validar(pesquisa)){		
		document.getElementById('msgErroModal').innerHTML = /*"Por favor preencha os campos corretamente"*/ "Não passou na validação com modelo = " + JSON.stringify(pesquisa);
		$("#erroModal").modal('show');
		return;
	}

	var utils = require('./../../utils.js');

	utils.enviaRequisicao("Pesquisa", "INSERIR", pesquisa, function(res){
		if(res.statusCode == 200){
			utils.enviaRequisicao("Pesquisa", "BUSCAR", {campo: "titulo", valor: pesquisa.titulo}, function(res){
				if(res.statusCode == 200){
					var msg = "";
					res.on('data', function(chunk){
						msg += chunk;
					});
					res.on('end', function(){
						aluno.codPesquisa = JSON.parse(msg).resultado[0].id;
						utils.enviaRequisicao("Aluno", "INSERIR", aluno, function(res){
							if(res.statusCode == 200){
								$('#sucessoModal').modal('show');
								$('#sucessoModal').on('hide.bs.modal', function(){location.reload()});
								setTimeout(function(){location.reload();} , 2000);
							}else{
								document.getElementById('msgErroModal').innerHTML = "Falha ao cadastrar aluno.";
								$("#erroModal").modal('show');
								$('#erroModal').on('hide.bs.modal', function(){location.reload()});
								utils.enviaRequisicao("Pesquisa", "EXCLUIR", aluno.codPesquisa, function(res){
									console.log("Pesquisa excluida!");
								});
							}
						});
					});
				}else{					
					document.getElementById('msgErroModal').innerHTML = "Falha ao buscar ID da pesquisa.";
					$("#erroModal").modal('show');
					return;		
				}
			});	
		}else{
			document.getElementById('msgErroModal').innerHTML = "Falha ao cadastrar pesquisa.";
			$("#erroModal").modal('show');
			return;
		}
	});
}							