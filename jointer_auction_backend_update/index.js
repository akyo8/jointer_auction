var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');

const { initConfigs } = require('./configs');
const routes = require('./routes');

var privateKey, certificate, credentials;

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


app.use('/whiteList', routes.whiteListRoute);
app.use('/auction', routes.auctionRoute);
app.use('/jntrNote', routes.jntrNoteRoute);

if (initConfigs.isPROD) {
    var httpsServer1 = https.createServer(credentials, app);
    console.log(initConfigs.dbName);
    httpsServer1.listen(initConfigs.httpsPort, () => { console.log(`Server Is Running On Port https:${initConfigs.httpsPort}`); });
} else {
    app.listen(initConfigs.httpPort, () => { console.log(`Server Is Running On Port http:${initConfigs.httpPort}`); });
}