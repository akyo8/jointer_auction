
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var { initConfigs } = require('../configs');
var http = require('http');
var https = require('https');
const WebSocket = require('ws');

var privateKey, certificate, ca, credentials, server;

if (initConfigs.isPROD) {
    privateKey = fs.readFileSync('/etc/letsencrypt/live/www.elementzero.network/privkey.pem', 'utf8');
    certificate = fs.readFileSync('/etc/letsencrypt/live/www.elementzero.network/cert.pem', 'utf8');
    ca = fs.readFileSync('/etc/letsencrypt/live/www.elementzero.network/chain.pem', 'utf8');
    credentials = { key: privateKey, cert: certificate, ca: ca };
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

if (initConfigs.isPROD) {
    server = https.createServer(credentials, app);
} else {
    server = http.createServer(app);
}
const wss = new WebSocket.Server({ server });


app.get('/broadcast/:action', function (req, res) {
    let action = req.params.action;
    wss.clients.forEach(function each(client) {
        client.send(action);
    });
    return res.send({ resp_code: 1 });
})

wss.on('connection', function connection(ws) {

    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(client) {
            client.send('heartbeat_msg')
        });
    }, 5000);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');

    ws.on('close', function close() {
        clearInterval(interval);
    });
});

server.listen(initConfigs.WS_PORT, () => { console.log(`server listen on ${initConfigs.WS_PORT}`) });
