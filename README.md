[![Build Status](https://travis-ci.org/B1naryStudio/express-rest-api-response.svg)](https://travis-ci.org/B1naryStudio/express-rest-api-response)

## Install
> npm install express-api-response

## Overview
Middleware for serving json responses with correct REST API / HTTP status codes without pain.
Works with [Express](https://github.com/visionmedia/express).

| Method | Error present | No error, no data | No error, data |
|--------|---------------|-------------------|----------------|
| get    | 400           | 404               | 200            |
| post   | 400           | 201               | 201            |
| put    | 400           | 204               | 200            |
| delete | 400           | 204               | 200            |
| patch  | 400           | 204               | 200            |

##Usage

**Warning**: image-optimus should be used before a middleware that is serving 
files so that it serves changed format file.   

```js
var optimus = require('connect-image-optimus');

var staticPath = __dirname + '/static/';

app.use(optimus(staticPath));
app.use(connect.static(staticPath));
```
##Contributing
Feel free to open issues and send PRs, though make sure that you create tests
for new functionality and amend ones for fixes and changes. 

## Running tests 
`npm test`

## License

The MIT License (MIT)

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