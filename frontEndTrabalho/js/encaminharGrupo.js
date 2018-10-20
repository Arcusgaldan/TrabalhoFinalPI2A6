var url = window.location.pathname;
var siglaGrupo = url.split("/")[2];
console.log("URL = "+ url +"\nSigla grupo = " + siglaGrupo);


var http = require('http');
var utils = require('../../utils.js');

var objeto = {
	campo: "sigla",
	valor: siglaGrupo
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
    	window.location = "/404.html";
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

			if(grupo.codUsuario == localStorage.id){
				$("#cardHeaderGrupo").append('\
				<button id="" class="btn btn-warning float-right" data-toggle="modal" data-target="#alteraModal">Alterar Grupo</button>\
          		<a id="" href="/tecnicosGrupo/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Técnico</a>\
          		<a id="" href="/docentesGrupo/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Docentes</a>\
          		<a id="" href="/cadastroLinhasGrupo/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Linhas de Pesquisa</a>\
          		<button id="" class="btn float-right" data-toggle="modal" data-target="#alteraLiderModal" style="margin-right:5px;">Alterar Lider</button>\
            ');
			}

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