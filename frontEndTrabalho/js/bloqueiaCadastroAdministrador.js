var http = require('http');
var utils = require('../../utils.js');

var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "Usuario";
opcoesHTTP.headers.Operacao = "LISTAR";

var req = http.request(opcoesHTTP, (res) => {
    console.log("Chegou a resposta!");
    res.setEncoding('utf8');
    //console.log(res);
    if(res.statusCode == 747){
    	console.log("Nao ha cadastros");
    }else if(res.statusCode == 200){
    	console.log("Ha cadastros!");
    	window.location = "../frontEndTrabalho/acessoNegado.html";
    }else{
    	console.log("Erro.");
    }
}); 
try{
	req.end();
}catch(err){
	console.log("Erro: " + err);
}