var request = require('supertest');
var express = require('express');
var apiResponse = require('../');

describe('express api middleware options should', function(){
	var app;

	beforeEach(function(){
		app = express();
	});

	it('accept empty object without breaking the app', function(done){
		apiResponse.options({});
		app.get('/', apiResponse);
		
		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});


	it('accept empty array without  breaking the app', function(done){
		apiResponse.options([]);
		app.get('/', apiResponse);
		
		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});

	it('accept no arguments without breaking the app', function(done){
		apiResponse.options();
		app.get('/', apiResponse);
		
		request(app)
		.get('/')
		.expect(404)
		.end(done);
	});

});