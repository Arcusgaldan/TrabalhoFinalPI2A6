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

	insere: function(con, comando){		
		con.connect(function(err){
			if(err) throw err;
			console.log("Conectado ao banco!");
			con.query(comando, function(err, res){
				if(err){ console.log("Erro: " + err); throw err;}				
				console.log("Deu bom inserindo");
				console.log('Resultado: ' + res);
				con.destroy();
			});
		});
	},

	buscar: function(con, comando){
		con.connect(function(err){
			if(err) throw err;
			console.log("Conectado ao banco!");
			con.query(comando, function(err, res){
				if(err){console.log("Erro " + err); throw err;}
				console.log("Deu bom inserindo");
				console.log("Resultado: " + res);
				con.destroy();
				return res;
			});
		});
	}
}