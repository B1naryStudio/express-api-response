[![Build Status](https://travis-ci.org/B1naryStudio/express-api-response.svg)](https://travis-ci.org/B1naryStudio/express-api-response)

## Install
> npm install express-api-response

[![NPM](https://nodei.co/npm/express-api-response.png)](https://nodei.co/npm/express-api-response/)

## Overview
Middleware for serving json responses with correct REST API / HTTP status codes without pain.
Works with [Express](https://github.com/visionmedia/express).

**express-api-response** creates 5 new fields on express response object:
- res.data - object which will be transferred to the client.
- res.err - error which occured within route handler.
- res.shouldNotHaveData - indicates, whether empty res.data field should lead to 
failure status code.
- res.successStatus - status code which will be added to the response in case of success.
- res.failureStatus - status code which will be added to the response in case of failure.  
These two status parameters and the shouldNotHaveData one are optional and most of the time 
you will not use them. Here are the default values for different methods:

| Method | Error present | No error, no data | No error, data | shouldNotHaveData|
|--------|---------------|-------------------|----------------|------------------|
| get    | 400           | 404               | 200            | false            |
| post   | 400           | 201               | 201            | true             |
| put    | 400           | 204               | 200            | true             |
| delete | 400           | 204               | 200            | true             |
| patch  | 400           | 204               | 200            | true             |
##Usage

```js
var express = require('express');
var app = express();
var apiResponse = require('express-api-response');

app.get('/', function(req, res, next){
	res.data = {data: 'myjson'};
	next();
}, apiResponse);
```

```js
var express = require('express');
var app = express();
var apiResponse = require('express-api-response');

app.post('/route', function(req, res, next){
	asyncFunction(function(err, data){
		res.data = data;
		res.err = err;
		next();
	});
}, apiResponse);
```

```js
var express = require('express');
var app = express();
var apiResponse = require('express-api-response');

app.delete('/route', function(req, res, next){
	asyncFunction(function(err, data){
		res.data = data;
		res.err = err;
		res.shouldNotHaveData = false;
		res.failureStatus = 702;
		next();
	});
}, apiResponse);
```

##Contributing
Feel free to open issues and send PRs, though make sure that you create tests
for new functionality and amend ones for fixes and changes. 

## Running tests 
`npm test`

## License

The MIT License (MIT)

[![Binary Studio](http://www.binary-studio.com/images/logo.gif)](http://binary-studio.com)  
Copyright (c) 2014 Semenistyi Mykyta nikeiwe@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
