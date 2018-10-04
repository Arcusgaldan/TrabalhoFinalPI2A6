var url = window.location.href;
var idGrupo = parseInt(url.slice(url.indexOf("#") + 1, url.length));

if(Number.isInteger(idGrupo)){
	var http = require('http');
	var utils = require('../../utils.js');

	var objeto = {
		campo: "id",
		valor: idGrupo
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
	    console.log("Chegou a resposta!");
	    res.setEncoding('utf8');
	    //console.log(res);
	    if(res.statusCode == 747){
	    	console.log("Este grupo não está cadastrado no banco de dados.");
	    	window.location = "../frontEndTrabalho/404.html";
	    }else if(res.statusCode == 200){
	    	console.log("Ha cadastros!");
	    	//Preencher os valores do grupo
	    	res.on('data', function(chunk){
	    		var grupo = JSON.parse(chunk).resultado[0];
	    		console.log("Resposta foi: " + chunk);
	    		console.log("Nome do grupo: " + grupo.nome);
				document.getElementById("siglaGrupo").innerHTML = grupo.sigla;
				document.getElementById("nomeGrupo").innerHTML = grupo.nome;
				document.getElementById("descicaoGrupo").innerHTML = grupo.descricao;
				document.getElementById("fundGrupo").innerHTML = grupo.dataFundacao;
				document.getElementById("emailGrupo").innerHTML = grupo.email;
				document.getElementById("logotipoGrupo").src = grupo.logotipo;
				document.getElementById("liderGrupo").innerHTML = grupo.codUsuario;
	    	});
	    	//Puxa os dados para o collapse de exibição deusuário
	    }else{
	    	console.log("Erro de conexão ao servidor/banco.");
	    }
	}); 



try{
	req.write(texto);
	req.end();
}catch(err){
	console.log("Erro: " + err);
}
}else{
	window.location = "404.html";
}