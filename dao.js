module.exports = {
	criaConexao: function(){
		var mysql = require('mysql');

		var con = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'DBPronn'
		});
		return con;
	},

	inserir: function(con, comando, cb){
		con.connect(function(err){
			if(err) throw err;
			console.log("Conectado ao banco!");
			con.query(comando, function(err, res){
				if(err){ console.log("Erro: " + err); cb(400); throw err;}				
				console.log("Deu bom inserindo");
				con.destroy();
				cb(200);
			});
		});
	},

	buscar: function(con, comando, cb){
		con.connect(function(err){
			if(err) throw err;
			console.log("Conectado ao banco!");
			con.query(comando, function(err, res){
				if(err){console.log("Erro " + err); cb(null);}
				console.log("Deu bom buscando");
				con.destroy();
				cb(res);
			});
		});
	}
}