var http = require('http');
var assert = require('assert');

var opts = {
    host: 'localhost',
    port: 24136,
    path: '/article',
    method: 'POST',
    headers: {
        //'content-type': 'application/x-www-form-urlencoded'
        'content-type': 'application/json'
    }
};

var article = {
    article: {
        author: 'Victor Tabuenca Calvo',
        date: 'getData()',
        content: 'Hello world!',
        published: 'true'
    }
};

var req = http.request(opts, function (res) {
    res.setEncoding('utf8');
    var data = "";
    res.on('data', function (d) {
        data += d;
    });
    res.on('end', function () {
        if (article.article.published === "false") {
            assert.strictEqual(data, '{"status":"ok","message":"Article Received"}');
        } else {
            assert.strictEqual(data, '{"status":"ok","message":"Article Published"}');
        }
    });
});

req.write(JSON.stringify(article));
req.end();
