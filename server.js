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
        res.write('Hello World!');
        res.end();
    })    
}).listen(8080);