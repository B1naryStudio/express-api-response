 module.exports = function(obj, staticOptions) {

		if (obj == null || typeof obj !== 'object') {
			return true;
		}

		if (obj instanceof Array) {
			if (staticOptions.emptyArrayIsOk){
				return false;
			}

			return obj.length === 0;
		}

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}

		return true;
	};