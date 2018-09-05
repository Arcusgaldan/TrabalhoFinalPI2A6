module.exports = {
	conecta: function(){
		var mysql = require('mysql');

		var con = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'toor',
			database: 'DBPronn'
		});

		con.connect(function(err) {
			if (err) throw err;
		  	console.log("Connected!");
		});
		return con;
	},

	insere: function(con, comando){
		con.query(comando, function(err, res){
			if(err) throw err;
			console.log('Resultado: ' + res);
		});
	}
}