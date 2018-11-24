var http = require('http');

http.createServer(function(req, res){
    //console.log("Cabeçalhos da requisição: " + JSON.stringify(req.headers));
    console.log("Método da requisição: " + req.method);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Methods', 'OPTION, GET, POST');    
    res.setHeader('Accept-Encoding', 'gzip, deflate, br');
    res.setHeader('Accept-Language', 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7');
    res.setHeader('Accept', "text/plain");
    if(req.method == 'OPTIONS'){
        console.log("Método é options, cabeçalhos da requisição são " + JSON.stringify(req.headers));
        res.setHeader('Access-Control-Allow-Headers', req.headers["access-control-request-headers"]);
        res.end();
        return;
    }
    var msgRqs = "";
    var jsonRqs;
    console.log("Pacote recebido!");
    req.on('readable', function(){
            var texto = req.read();
            console.log("TEXTO: " + texto);
            if(texto != null){
                msgRqs += texto;
            }
    });
    req.on('end', function(){
        // if(!msgRqs){
        //     console.log("Sem msgrqs, enviando os cabeçalhos de aceitação");
        //     res.statusCode = 200;
        //     res.end();
        //     return;
        // }
        //msgRqs = '\"'+msgRqs+'\"';
        if(msgRqs != "")
            jsonRqs = JSON.parse(msgRqs);
        //console.log(jsonRqs);
        if(req.headers['objeto'] != null){
            var objeto = req.headers['objeto'];
            var operacao = req.headers['operacao'];
            
            if(objeto != "Reset" && objeto != "DataAtual" && objeto != "DataHoraAtual"){//Para toda operação de servidor que não tenha um controller associado, adiciona a exceção neste if (ex: Email)
                var caminho = './controller/c' + objeto + '.js';
                var controller = require(caminho);
                if(controller == null){
                    res.statusCode = 400;
                    res.write('Objeto inexistente.');
                    console.log('Objeto inexistente.');
                    res.end();
                    return false;
                }           
            }else if(objeto == "Reset"){
                require('./utils.js').sobeLinhas('txtCNPQ.txt');
                res.statusCode = 200;
                res.end();
                return;
            }else if(objeto == "DataAtual"){
                var data = require('./utils.js').dataAtual();
                res.statusCode = 200;
                res.write(data);
                res.end();
                return;
            }else if(objeto == "DataHoraAtual"){
                var data = require('./utils.js').dataHoraAtual();
                res.statusCode = 200;
                res.write(data);
                res.end();
                return;
            }else{
                controller.trataOperacao(operacao, jsonRqs, function(resposta){
                    res.statusCode = resposta.codigo;
                    if(resposta.msg){
                        res.write(resposta.msg);
                    }
                    res.end();
                });         
            }
        }
    })    
}).listen(8080);