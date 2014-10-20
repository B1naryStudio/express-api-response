var request = require('supertest');
var express = require('express');
var apiResponse = require('../');

describe('express api middleware on *post* should', function(){
	var app;
	beforeEach(function(){
		app = express();
	});

	it('return 404 code on no data', function(done){
		app.post('/', apiResponse);
		
		request(app)
		.post('/')
		.expect(404)
		.end(done);
	});

	it('return 400 code on error', function(done){
		app.post('/', function(req, res, next){
			res.err = 'asd';
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(400)
		.end(done);
	});

	it('return 404 code on non-object data', function(done){
		app.post('/', function(req, res, next){
			res.data = 'asd';
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(404)
		.end(done);
	});

	it('return 201 code on object data', function(done){
		app.post('/', function(req, res, next){
			res.data = {asd: '1'};
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(201)
		.end(done);
	});

	it('return 400 code on empty object data', function(done){
		app.post('/', function(req, res, next){
			res.data = {};
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(404)
		.end(done);
	});

	it('return 201 code on array data', function(done){
		app.post('/', function(req, res, next){
			res.data = [1, 2, 3];
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(201)
		.end(done);
	});

	it('return 404 code on empty array data', function(done){
		app.post('/', function(req, res, next){
			res.data = [];
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(404)
		.end(done);
	});

	it('return 201 code on empty data and should not have data', function(done){
		app.post('/', function(req, res, next){
			res.data = [];
			res.shouldNotHaveData = true;
			next();
		}, apiResponse);

		request(app)
		.post('/')
		.expect(201)
		.end(done);
	});

});

