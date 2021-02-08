
var express = require('express');
var app = express.Router();
const { jntrNoteController } = require('../controller')

app.get('/getTxHistory/:address', (req, res) => {
    jntrNoteController.getTxHistory(req.params.address, function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})

app.post('/updateTxHistory', (req, res) => {
    jntrNoteController.updateTxHistory(req.body.txData, function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})

module.exports = app;