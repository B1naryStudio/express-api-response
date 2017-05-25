var isEmpty = require('./isEmpty');
var staticOptions = {};

function apiResponse(req, res, next) {
	var successStatus;
	var failureStatus;
	var shouldNotHaveData;
	var shouldSendErrorMessage;
	switch (req.method.toLowerCase()) {
		case 'get':
			successStatus = 200;
			failureStatus = res.err ? 400 : 404;
			shouldNotHaveData = res.shouldNotHaveData;
			break;
		case 'post':
			shouldNotHaveData = typeof res.shouldNotHaveData !== 'undefined' ?
				res.shouldNotHaveData : true;
			successStatus = 201;
			failureStatus = res.err ? 400 : 404;
			break;
		case 'put':
		case 'patch':
		case 'delete':
			shouldNotHaveData = typeof res.shouldNotHaveData !== 'undefined' ?
				res.shouldNotHaveData : true;
			successStatus = shouldNotHaveData && isEmpty(res.data, staticOptions) ? 204 : 200;
			failureStatus = res.err ? 400 : 404;
			break;
		default:
			successStatus = 200;
			failureStatus = res.err ? 400 : 404;
	}

	if (res.err !== undefined && res.err !== null && res.err.message !== undefined && res.err.message !== null) {
		if(res.shouldSendErrorMessage === undefined) {
			shouldSendErrorMessage = true;
		} else {
			shouldSendErrorMessage = res.shouldSendErrorMessage;
		}
	} else {
		shouldSendErrorMessage = false;
	}

	successStatus = res.successStatus || successStatus;
	failureStatus = res.failureStatus || failureStatus;
	if (res.err) {
		if (shouldSendErrorMessage) {
			return res.status(failureStatus).send(res.err.message);
		} else {
			return res.status(failureStatus).end();
		} 
	} else if ((isEmpty(res.data, staticOptions))) {
			if (!shouldNotHaveData) {
				return res.status(failureStatus).end();
			} else {
				return res.status(successStatus).end();
			}
		} else {
			return res.status(successStatus).json(res.data);
		}
};

apiResponse.options = function(options){
	if (typeof options === 'object'){
		staticOptions = options;
	}
};

module.exports = apiResponse;