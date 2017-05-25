var request = require('supertest');
var express = require('express');
var apiResponse = require('../');

describe('express api middleware on *get* should', function(){
	var app;
	beforeEach(function(){
		app = express();
	});

	it('return 404 code on no data', function(done){
		app.get('/', apiResponse);
		
		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});

	it('return 400 code on error', function(done){
		app.get('/', function(req, res, next){
			res.err = 'asd';
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(400)
		.end(done);
	});

	it('return 404 code on non-object data', function(done){
		app.get('/', function(req, res, next){
			res.data = 'asd';
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});

	it('return 200 code on object data', function(done){
		app.get('/', function(req, res, next){
			res.data = {asd: '1'};
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(200)
		.end(done);
	});

	it('return 400 code on empty object data', function(done){
		app.get('/', function(req, res, next){
			res.data = {};
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});

	it('return 200 code on array data', function(done){
		app.get('/', function(req, res, next){
			res.data = [1, 2, 3];
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(200)
		.end(done);
	});

	it('return 404 code on empty array data with {emptyArrayIsOk: true}', function(done){
		apiResponse.options({emptyArrayIsOk: true});

		app.get('/', function(req, res, next){
			res.data = [];
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(404)
		.end(done);

		apiResponse.options({emptyArrayIsOk: false});
	});

	it('return 404 code on empty array data', function(done){
		app.get('/', function(req, res, next){
			res.data = [];
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});

	it('return 200 code on empty data and should not have data', function(done){
		app.get('/', function(req, res, next){
			res.data = [];
			res.shouldNotHaveData = true;
			next();
		}, apiResponse);

		request(app)
		.get('/')
		.expect(200)
		.end(done);
	});

	it('return 400 code on wrong data and should have error message', function(done) {
		app.get('/', function(req, res, next) {
			res.err = {
				message: 'Something went wrong'
			};
			next();
		}, apiResponse);

		request(app)
			.get('/')
			.expect(400)
			.end(function(err, res) {
				res.error.text.should.equal('Something went wrong');
				done();
			});
	});

	it('return 400 code on wrong data and should not have error message', function(done) {
		app.get('/', function(req, res, next) {
			res.err = {
				message: 'Something went wrong'
			};
			res.shouldSendErrorMessage = false;
			next();
		}, apiResponse);

		request(app)
			.get('/')
			.expect(400)
			.end(function(err, res) {
				res.error.text.should.equal('');
				done();
			});
	});

});

