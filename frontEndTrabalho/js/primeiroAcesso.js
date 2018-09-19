var http = require('http');

var opcoes = {
    hostname: "127.0.0.1",
    port: 8080,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',    
      'Content-Length': 0,
      'Objeto': 'Usuario',
      'Operacao': 'LISTAR'
    }
};

var req = http.request(opcoes, (res) => {
    console.log("Chegou a resposta!");
    res.setEncoding('utf8');
    //console.log(res);
    if(res.statusCode == 747){
    	console.log("Nao ha cadastros");
    	window.location = "../frontEndTrabalho/cadastroAdministrador.html";
    }else if(res.statusCode == 200){
    	console.log("Ha cadastros!");
    }else{
    	console.log("Erro.");
    }
}); 
try{
	req.end();
}catch(err){
	console.log("Erro: " + err);
}