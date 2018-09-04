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
            switch(req.method){
                case 'GET':
                    
                    break;
                case 'POST':
                    
                    break;
            }            
        }
        res.write('Hello World!');
        res.end();
    })    
}).listen(8080);