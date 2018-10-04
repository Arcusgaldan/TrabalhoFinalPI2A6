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
	    	alert("Cadastro realizado com sucesso!");
	    	setTimeout(function(){location.reload();} , 2000);
	    }
	    else
	    	console.log("FALHA NO CADASTRO");
	}); 	
    req.write(texto);
    req.end();
}