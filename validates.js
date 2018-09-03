module.exports = {
	max: function(palavra, valor){
		if(palavra == null)
			return false;

		if(palavra.length <= valor)
			return true;
		else
			return false;		
	},
	min: function(palavra, valor){
		if(palavra == null)
			return false;

		if(palavra.length > valor)
			return true;
		else
			return false;
	},
	exact: function(palavra, valor){
		if(palavra == null)
			return false;

		if(palavra.length == valor)
			return true;
		else
			return false;
	}

	req: function(palavra){
		if(palavra == null)
			return false;
		return true;
	}

}