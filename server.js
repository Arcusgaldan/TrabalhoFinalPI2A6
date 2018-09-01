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
        switch(req.method){
            case 'GET':
                console.log('foi get');
                console.log('Objeto = ' + req.headers['objeto']);
                break;
            case 'POST':
                console.log('foi post');
                console.log('Objeto = ' + req.headers['objeto']);
                break;
        }
        res.write('Hello World!');
        res.end();
    })    
}).listen(8080);