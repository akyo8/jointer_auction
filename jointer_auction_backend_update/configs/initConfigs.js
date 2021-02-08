const dotenv = require('dotenv').config();
const isPROD = process.env.NODE_ENV == "PROD" ? true : false;

const Web_Socket = `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_KEY}`;

module.exports = {
    isPROD: isPROD,
    httpPort: process.env.HTTP_PORT,
    httpsPort: process.env.HTTPS_PORT,
    dbName: process.env.DB_NAME,
    INFURA_KEY: process.env.INFURA_KEY,
    WS_PORT: process.env.WS_PORT,
    WS_BASE_URL: process.env.WS_BASE_URL,
    Web_Socket: Web_Socket,
    chainId: 3
}

