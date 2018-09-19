var http = require('http');

http.createServer(function(req, res){
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
        //msgRqs = '\"'+msgRqs+'\"';
        if(msgRqs != "")
            jsonRqs = JSON.parse(msgRqs);
        //console.log(jsonRqs); 
        if(req.headers['objeto'] != null){
            var objeto = req.headers['objeto'];
            var caminho = './controller/c' + objeto + '.js';
            var controller = require(caminho);
            if(controller == null){
                res.statusCode = 400;
                res.write('Objeto inexistente.');
                console.log('Objeto inexistente.');
                res.end();
                return false;
            }
            switch(req.headers['operacao']){
                case 'INSERIR':
                    controller.inserir(jsonRqs, function(codRes){
                    if(codRes == 200){
                        res.statusCode = 200;
                        res.write(objeto + ' inserido com sucesso!');
                        res.end();
                    }else
                        res.statusCode = 400;
                        res.write('Falha ao inserir ' + objeto);
                        res.end();
                    });
                    break;                    
                case 'ALTERAR':
                    controller.alterar(jsonRqs, function(codRes){
                    if(codRes == 200){
                        res.statusCode = 200;
                        res.write(objeto + ' alterado com sucesso!');
                        res.end();  
                    }else
                        res.statusCode = 400;
                        res.write('Falha ao alterar ' + objeto);
                        res.end();
                    });
                    break;
                case 'EXCLUIR':
                    controller.excluir(jsonRqs['id'], function(codRes){
                    if(codRes == 200){
                        res.statusCode = 200;
                        res.write(objeto + ' alterado com sucesso!');
                        res.end();
                    }else
                        res.statusCode = 400;
                        res.write('Falha ao alterar ' + objeto);
                        res.end();
                    });
                    break;
                case 'LISTAR':
                    controller.listar(function(resultado){
                        if(resultado != null){
                            res.statusCode = 200;
                            var resposta = JSON.stringify(resultado);
                            res.write(resposta);
                            res.end();
                        }else{
                            res.statusCode = 400;
                            res.write('Erro ao listar ' + objeto);
                            res.end();
                        }
                    });
                    break;
                case 'BUSCAR':
                    var campo = jsonRqs['campo'];
                    var valor = jsonRqs['valor'];
                    console.log("Campo: " + campo);
                    console.log("Valor: " + valor);
                    if(campo == null || valor == null){
                        res.statusCode = 400;
                        res.write('Campo ou valor inexistente para busca no banco.');
                        res.end();
                        break;
                    }else{
                        controller.buscar(campo, valor, function(resultado){
                            if(resultado != null){
                                res.statusCode = 200;
                                var resposta = JSON.stringify(resultado);
                                console.log("Resposta será " + resposta);
                                res.write(resposta);
                                res.end();
                            }else{
                                res.statusCode = 400;
                                res.write('Erro ao buscar ' + objeto);
                                res.end();                                
                            }
                        });
                    }   
                    break;
                default:
                    console.log("Operação " + operacao + " não suportada.");
                    res.statusCode = 400;
                    res.write('Operação " + operacao + " não suportada.');
                    res.end();
                    break;
            }            
        }
    })    
}).listen(8080);