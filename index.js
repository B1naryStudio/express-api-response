var isEmpty = require('./isEmpty');

module.exports = function(req, res, next){
	var successStatus;
	var failureStatus;
	var shouldNotHaveData;
	switch (req.method.toLowerCase()){
		case 'get':
			successStatus = 200;
			failureStatus = res.err ? 400 : 404;			
			shouldNotHaveData = res.shouldNotHaveData;
			break;
		case 'post':
			shouldNotHaveData = res.shouldNotHaveData && true;
			successStatus = 201;
			failureStatus = res.err ? 400 : 404;			
			break;
		case 'put':
		case 'patch':
		case 'delete':
			shouldNotHaveData = res.shouldNotHaveData && true;
			successStatus = shouldNotHaveData ? 204 : 200;
			failureStatus = res.err ? 400 : 404;
			break;
		default: 
			successStatus = 200;
			failureStatus = res.err ? 400 : 404;
	}

	successStatus = res.successStatus || successStatus;
	failureStatus = res.failureStatus || failureStatus;

	if (res.err){
		return res.status(failureStatus).end();
	} else if ((isEmpty(res.data))){
		if (!res.shouldNotHaveData){
			return res.status(failureStatus).end();
		} else {
			return res.status(successStatus).end();
		}
	} else {
		return res.status(successStatus).json(res.data);
	}
};

