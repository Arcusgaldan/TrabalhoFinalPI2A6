module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.data = objeto.data;
		final.horarioInicio = objeto.horarioInicio;
		final.pauta = objeto.pauta;
		final.horarioTermino = objeto.horarioTermino;
		final.convidado = objeto.convidado;
		final.codGrupo = objeto.codGrupo;
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.data = '1001-01-01';
		final.horarioInicio = '00:00:00';
		final.pauta = "";
		final.horarioTermino = '00:00:00';
		final.convidado = "";
		final.codGrupo = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["data", "horarioInicio", "pauta", "horarioTermino", "pauta", "horarioTermino", "concidado"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}