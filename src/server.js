const express = require('express');
const server = express();
const serverPort = 3001;
const clientPort = 3000;

function setHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + clientPort);
    res.setHeader('Content-Type', 'application/json');
}

server.get('/items', function (req, res) {
    setHeaders(res);
    res.json('{test:"get"}');
});

server.post('/items', function (req, res) {
    setHeaders(res);
    res.json('{test:"post"}');
});

server.listen(serverPort, function () {
    console.log('Example app listening on port ' + serverPort);
});
