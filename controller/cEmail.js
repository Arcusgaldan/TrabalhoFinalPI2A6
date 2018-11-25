module.exports = {
	trataOperacao: function(operacao, msg, cb){
		var resposta = {};
		switch(operacao){
			case "ENVIAR":
				this.enviar(msg.email, msg.mensagem, msg.assunto, function(codRes){
					resposta.codigo = codRes;
					cb(resposta);
				});
				break;

			default:
				resposta.codigo = 400;
				cb(resposta);
		}
	},	

	enviar: function(email, mensagem, assunto, cb){
		require('./../dao.js').email(email, mensagem, assunto, function(res){
			cb(res);
		});
	}
}