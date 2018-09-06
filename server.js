var http = require('http');

http.createServer(function(req, res){
    var msgRqs = "";
    var jsonRqs;
    console.log("Pacote recebido!");
    req.on('readable', function(){
            var texto = req.read();
            if(texto != null){
                msgRqs += texto;
            }
    });
    req.on('end', function(){
        //msgRqs = '\"'+msgRqs+'\"';
        jsonRqs = JSON.parse(msgRqs);
        console.log(jsonRqs); 
        if(req.headers['objeto'] != null){
            var objeto = req.headers['objeto'];
            switch(req.headers['operacao']){
                case 'INSERT':
                    var caminho = './controller/c' + objeto + '.js';
                    console.log("Caminho = " + caminho);
                    var controller = require(caminho);
                    controller.inserir(jsonRqs);
                    break;
                case 'UPDATE':
                    
                    break;
                case 'DELETE':

                    break;
                case 'SELECT':

                    break;                
                default:
                    break;
            }            
        }
        res.write('Hello World!');
        res.end();
    })    
}).listen(8080);