document.getElementById("btnCadastrar").addEventListener("click", cadastra);

function formacaoToString(cod){
	var vetor = ["Ensino Fundamental", "Ensino Médio", "Superior", "Pós-Graduação", "Mestrado", "Doutorado", "p.hD"];
	return vetor[cod+1];
}

function cadastra(){
	var modelo = require('./../../modelo/mTecnico.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cTecnico.js');
	var tecnico = modelo.novo();

	tecnico.id = 0;
	tecnico.nome = document.getElementById('nomeTecnicoCadastrar').value;
	tecnico.atividade = document.getElementById('atividadeTecnicoCadastrar').value;
	tecnico.formacao = formacaoToString(document.getElementById('formacaoTecnicoCadastrar').value);
	tecnico.anoConclusao = document.getElementById('anoConclusaoTecnicoCadastrar').value;
	tecnico.nomeCurso = document.getElementById('nomeCursoTecnicoCadastrar').value;
	tecnico.linkLattes = document.getElementById('linkLattesTecnicoCadastrar').value;
	tecnico.dataEntrada = document.getElementById('dataEntradaTecnicoCadastrar').value;

	var texto = JSON.stringify(tecnico);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Tecnico";
	opcoesHTTP.headers.Operacao = "INSERIR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a resposta!");
	    res.setEncoding('utf8');
	    //console.log(res);        
	    if(res.statusCode == 200){
	    	var form = document.getElementById('formCadastroTecnico');
	    	form.action = "http://localhost:3000/arquivo/fotoTecnico?fileName=" + usuario.prontuario;
	    	form.submit();
	    	$('#sucessoModal').modal('show');
	    	$('#sucessoModal').addEventListener('toggle', function(){location.reload();});
	    }
	    else{
	    	console.log("FALHA NO CADASTRO");
			$('#erroModal').modal('show');
		}

	});
	req.write(texto);
	req.end();
}