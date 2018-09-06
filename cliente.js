function senhaHash(objeto){
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256');

    hash.update(objeto.senha);
    objeto.senha = hash.digest('hex');
    return objeto;
}


var http = require('http');
//var querystring = require('querystring');

var dados = {
    id: 0,
    prontuario: '1690312',
    nome: 'Gabiru',
    email: 'Gabiruemail@teste.com',
    senha: 'senhaGabiru',
    curriculoLattes: 'curriculo.lates/123456',
    foto: 'FOTOGABIRU',
    data: '2018-08-06',
    primeiroAcesso: 1,
    codTipoUsuario: 1
};
dados = senhaHash(dados);
console.log(dados);


var texto = JSON.stringify(dados);
var opcoes = {
    hostname: "127.0.0.1",
    port: 8080,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',    
      'Content-Length': Buffer.byteLength(texto),
      'Objeto': 'Usuario',
      'Operacao': 'INSERT'
    }
};



var req = http.request(opcoes, (res) => {
    console.log("Chegou a resposta!");
    res.setEncoding('utf8');
    //console.log(res);        
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});    

//req.on('error', (e) => {
//  console.error(`problem with request: ${e.message}`);
//});

console.log(texto);
try{
    req.write(texto);
    console.log("Escrevi texto");
    req.end();
    console.log("Mandei texto");
}catch(er){
    console.log("ERROZAO DA PORRA");
}