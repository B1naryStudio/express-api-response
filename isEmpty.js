 module.exports = function(obj) {

		if (obj == null || typeof obj !== 'object') {
			return true;
		}

		if (obj instanceof Array) {
			return obj.length === 0;
		}

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}

		return true;
	};