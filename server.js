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
            if(objeto == "LinhaPesquisa" && operacao == "BUSCARPARENTE"){
                var utils = require('./utils.js');
                var resultado = utils.buscaParentesLinha(parseInt(jsonRqs['tipoBusca']), jsonRqs['linha'], function(resultado){
                    console.log("RESULTADO DO BUSCARPARENTE NO RESULTADO: " + resultado);
                    if(resultado){
                        var texto = JSON.stringify(resultado);
                        console.log("Achou parentes, respondendo...");
                        res.statusCode = 200;
                        res.write(texto);
                        res.end();
                    }else{
                        console.log("Não achou parentes, respondendo...");
                        res.statusCode = 400;
                        res.end();
                    }
                });
                return;                
            }else if(objeto != "Reset" && objeto != "DataAtual"){//Para toda operação de servidor que não tenha um controller associado, adiciona a exceção neste if (ex: Email)
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