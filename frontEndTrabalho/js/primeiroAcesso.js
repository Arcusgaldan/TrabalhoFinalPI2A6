var http = require('http');
var utils = require('../../utils.js');

var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "Usuario";
opcoesHTTP.headers.Operacao = "LISTAR";

console.log("opcoesHTTP::primeiroAcesso = " + JSON.stringify(opcoesHTTP));

var req = http.request(opcoesHTTP, (res) => {
    console.log("Chegou a resposta!");
    res.setEncoding('utf8');
    //console.log(res);
    if(res.statusCode == 747){
    	console.log("Nao ha cadastros");
    	window.location = "/cadastroAdministrador";
    }else if(res.statusCode == 200){
    	console.log("Ha cadastros!");
    }else{
    	console.log("Erro.");
    }
}); 
try{
    req.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    req.setHeader('Access-Control-Allow-Credential', true);
    req.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST');
	req.end();
}catch(err){
	console.log("Erro: " + err);
}