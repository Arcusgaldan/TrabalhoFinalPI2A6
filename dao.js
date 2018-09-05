module.exports = {
	criaConexao: function(){
		var mysql = require('mysql');

		var con = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'toor',
			database: 'DBPronn'
		});
		return con;
	},

	insere: function(comando){		
		con.connect(function(err){
			if(err) throw err;
			console.log("Conectado ao banco!");
			con.query(comando, function(err, res){
				if(err){ console.log("Erro: " + err); throw err;}
				console.log('Resultado: ' + res);
			});
		});
		console.log("Deu bom inserindo");
	}
}