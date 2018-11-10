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
	modelo.codPesquisa = 0;

	if(!controller.validar(modelo)){
		document.getElementById('msgErroModal').innerHTML = "Por favor preencha os campos corretamente.";
		$("#erroModal").modal('show');
		return;
	}

	document.getElementById('alunoPublicacaoCadastrar').value = modelo.nome;
	document.getElementById('cursoAlunoCadastrar').value = modelo.curso;
	document.getElementById('linkLattesAlunoCadastrar').value = modelo.linkLattes;
	document.getElementById('inicioOrientacaoAlunoCadastrar').value = modelo.dataInicio;
	document.getElementById('terminoOrientacaoAlunoCadastrar').value = modelo.dataFim;

}

function cadastra(){
	var pesquisa = require('./../../modelo/mPesquisa.js').novo();
	var aluno = require('./../../modelo/mAluno.js').novo();

	var cAluno = require('./../../controller/cAluno.js');
	var cPesquisa = require('./../../controller/cPesquisa.js');

	pesquisa.id = 0;
	pesquisa.tiulo = document.getElementById('tituloPesquisaCadastrar').value;
	pesquisa.codDocente = document.getElementById('docentePesquisaCadastrar').value;
	pesquisa.codLinha = document.getElementById('linhaPesquisaCadastrar').value;
	pesquisa.tipo = document.getElementById('tipoPesquisaCadastrar').value;
	pesquisa.dataInicio = document.getElementById('dataInicioPesquisaCadastrar').value;
	pesquisa.dataFim = document.getElementById('dataFimPesquisaCadastrar').value;

	aluno.id = 0;
	aluno.nome = document.getElementById('alunoPublicacaoCadastrar').value;
	aluno.curso = document.getElementById('cursoAlunoCadastrar').value;
	aluno.linkLattes = document.getElementById('linkLattesAlunoCadastrar').value;
	aluno.dataInicio = document.getElementById('inicioOrientacaoAlunoCadastrar').value;
	aluno.dataFim = document.getElementById('terminoOrientacaoAlunoCadastrar').value;

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