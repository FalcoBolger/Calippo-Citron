var http = require('http');
var assert = require('assert');
var util = require('util');

var indexOpts = {
    host: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET'
};

var articlesOpts = {
    host: 'localhost',
    port: 8000,
    path: '/articles',
    method: 'GET'
};

var req = http.request(indexOpts, function (res) {
    console.log('STATUS ' + res.statusCode);
    console.log('HEADERS ' + util.inspect(res.headers));
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function (d) {
        assert.strictEqual(d, 'Welcome to Victor and Yasmina\'s Wedding Web Site');
        console.log('BODY ' + d);
    });
    res.on('end', function () {
        console.log('END');
    });
    res.on('error', function (err) {
        console.log('REQUEST ERROR ' + err);
    });
});
req.write("");
req.end();

var req = http.request(articlesOpts, function (res) {
    console.log('STATUS ' + res.statusCode);
    console.log('HEADERS ' + util.inspect(res.headers));
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function (d) {
        console.log('BODY ' + d);
    });
    res.on('end', function () {
        console.log('END');
    });
    res.on('error', function (err) {
        console.log('REQUEST ERROR ' + err);
    });
});
req.write("");
req.end();
