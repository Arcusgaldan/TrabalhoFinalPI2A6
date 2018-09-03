class ControllerUsuario{
	static Inserir(usuario){
		var validates = require('./../validates.js');
		if(!validates.exact(usuario.prontuario, 9) || 	!validates.req(usuario.nome) || 
			!validates.req(usuario.email) || !validates.exact(usuario.senha, 64) || 
			!validates.req(usuario.lattes) ||  !validates.req(usuario.dataCad) || 
			!validates.req(usuario.primeiroAcesso)){
				return false;
		}else{
			var sql = "INSERT INTO tbUsuarios values (0, " + usuario.prontuario + "\ 
			)"
		}
	}
}