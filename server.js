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
            if(objeto != "Email"){//Para toda operação de servidor que não tenha um controller associado, adiciona a exceção neste if (ex: Email)
                var caminho = './controller/c' + objeto + '.js';
                var controller = require(caminho);
                if(controller == null){
                    res.statusCode = 400;
                    res.write('Objeto inexistente.');
                    console.log('Objeto inexistente.');
                    res.end();
                    return false;
                }                
            }
            switch(req.headers['operacao']){
                case 'INSERIR':
                    controller.inserir(jsonRqs, function(codRes){
                        if(codRes == 200){
                            res.statusCode = 200;
                            res.write(objeto + ' inserido com sucesso!');
                            res.end();
                        }else{
                            res.statusCode = codRes;
                            res.write('Falha ao inserir ' + objeto);
                            res.end();
                        }
                    });
                    break;                    
                case 'ALTERAR':
                    controller.alterar(jsonRqs, function(codRes){
                        if(codRes == 200){
                            res.statusCode = 200;
                            res.write(objeto + ' alterado com sucesso!');
                            res.end();  
                        }else{
                            res.statusCode = codRes;
                            res.write('Falha ao alterar ' + objeto);
                            res.end();
                        }
                    });
                    break;
                case 'EXCLUIR':
                    controller.excluir(jsonRqs['id'], function(codRes){
                        if(codRes == 200){
                            res.statusCode = 200;
                            res.write(objeto + ' excluido com sucesso!');
                            res.end();
                        }else{
                            res.statusCode = codRes;
                            res.write('Falha ao excluir ' + objeto);
                            res.end();
                        }
                    });
                    break;
                case 'LISTAR':
                    controller.listar(function(resultado){
                        if(resultado != ""){
                            console.log("Resposta será " + resultado);
                            res.statusCode = 200;
                            var resposta = JSON.stringify(resultado);
                            res.write(resposta);
                            res.end();
                        }else if(resultado == null){
                            console.log("Erro fatal na busca.");
                            res.statusCode = 400;
                            res.write("Erro fatal na busca");
                            res.end();
                        }else{
                            res.statusCode = 747;
                            res.write('Não há ' + objeto + "s cadastrados");
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
                        res.statusCode = 746;
                        console.log('Campo ou valor inexistente para busca no banco.');
                        res.write('Campo ou valor inexistente para busca no banco.');
                        res.end();
                        break;
                    }else{
                        controller.buscar(campo, valor, function(resultado){
                            if(resultado != null && resultado != ""){
                                res.statusCode = 200;                    
                                var resultadoFinal = {"resultado": resultado};
                                var resposta = JSON.stringify(resultadoFinal);
                                console.log("Resposta será " + JSON.stringify(resposta));
                                var respostaFinal = resposta.replace("\\\"", "\"");
                                console.log("Resposta final: " + respostaFinal);
                                res.write(resposta);
                                res.end();
                            }else{
                                res.statusCode = 747;
                                console.log('Erro ao buscar ' + objeto);
                                res.write('Erro ao buscar ' + objeto);
                                res.end();                                
                            }
                        });
                    }   
                    break;
                case 'EMAIL':
                    var dao = require('./dao.js');
                    var mensagem = jsonRqs['mensagem'];
                    var email = jsonRqs['email'];
                    var assunto = jsonRqs['assunto'];

                    dao.email(email, mensagem, assunto, function(resultado){
                        if(resultado == 400){
                            console.log("Erro ao enviar o email. Contate o suporte.");
                            res.statusCode(resultado);
                            res.write("Erro ao enviar o email. Contate o suporte.");
                            res.end();
                        }else{
                            console.log("Email enviado com sucesso!");
                            res.statusCode(resultado);
                            res.write("Email enviado com sucesso!");
                            res.end();
                        }
                    });
                    break;                    
                default:
                    console.log("Operação " + req.headers['operacao'] + " não suportada.");
                    res.statusCode = 400;
                    res.write('Operação " + operacao + " não suportada.');
                    res.end();
                    break;
            }            
        }
    })    
}).listen(8080);