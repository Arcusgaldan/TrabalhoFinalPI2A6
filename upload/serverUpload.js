if(!require('fs').existsSync('uploads')){
	require('fs').mkdirSync('uploads');
}

const express = require('express')
	, app = express()
	, multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        var caminho = require('url').parse(req.url).pathname;
        switch(caminho){
        	case '/arquivo/fotoUsuario':     
        		console.log("É foto de usuario!");
        		var fs = require('fs');
        		if(!fs.existsSync('uploads/fotosUsuario')){
        			fs.mkdirSync('uploads/fotosUsuario');
        		}
        		
        		cb(null, 'uploads/fotosUsuario/');
        		break;
        	default:        		
        		console.log("Foi default");
        		if(!require('fs').existsSync('/uploads')){
        			require('fs').mkdirSync('/uploads');
        		}
        		
        		cb(null, 'uploads/');
        		break;
        }
    },
    filename: function (req, file, cb) {
        // error first callback        
        var query = require('url').parse(req.url, true).query;
        cb(null, query.fileName + ".jpg");        
    }
});


// cria uma instância do middleware configurada
const upload = multer({ storage });

app.use(express.static('public'));

// rota indicado no atributo action do formulário
app.post('/arquivo/fotoUsuario', upload.single('fotoUsuarioCadastrar'), 
    (req, res) => {
    	var get = require('url').parse(req.url).query;
    	console.log("O get é " + get);
    	res.send('<script type="text/javascript">window.history.back();</script>')    	
    });  

app.listen(3000, () => console.log('App na porta 3000'));