var express = require('express');
var app = express.Router();
const { Validator } = require('node-input-validator');
const { whiteListController } = require('../controller')

app.get("/findUserByAddress/:address", (req, res) => {
    var data = { address: req.params.address }
    whiteListController.findUserByAddress(data, (response, error) => {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        console.log(response)
        return res.send({ resp_code: 1, data: response.length > 0 ? true : false });
    })
})


app.post("/findUserByEmail", (req, res) => {
    var data = { email: req.body.email, address: req.body.address }
    whiteListController.findUserByEmail(data, (response, error) => {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({
            resp_code: 1,
            data: {
                "logInStatus": response.length > 0 ? true : false,
                "userProfile": response.length > 0 ? response[0] : null
            }
        });
    })
})

app.get("/findUserByPhone/:phone", (req, res) => {
    var data = { phone: req.params.phone }
    whiteListController.findUserByPhone(data, (response, error) => {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response.length > 0 ? true : false });
    })
})

app.post('/addUser', (req, res) => {

    const v = new Validator(req.body, {
        email: 'required|email',
        countryCode: 'required',
        phone: 'required',
        address: 'required',
    });

    v.check()
        .then(function (matched) {
            if (!matched) {
                return res.status(422).send(v.errors);
            }
            whiteListController.addUser(v.inputs, (response, error) => {
                if (error) {
                    return res.status(400).send({ resp_code: -1, data: error.toString() });
                }
                return res.send({
                    resp_code: 1, data: {
                        "logInStatus": ((response !== null && response !== undefined) ? true : false),
                        "userProfile": ((response !== null && response !== undefined) ? response : null)
                    }
                });
            })
        }).catch((e) => {
            return res.status(400).send({ resp_code: -1, data: e.toString() });
        })
})

app.post('/updateUser', (req, res) => {

    var requestData = {
        first_name: req.body.identity.transaction_identity.first_name,
        last_name: req.body.identity.transaction_identity.last_name,
        middle_name: req.body.identity.transaction_identity.middle_name,
        country_code: req.body.identity.transaction_identity.country_code,
        phone: req.body.identity.transaction_identity.identity_phone_numbers[0].phone_number.replace("+", ""),
        kycStatus: req.body.identity.state,
        kycId: req.body.identity.id
    }

    whiteListController.updateUser(requestData, (response, error) => {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})

app.post("/updateWalletList", (req, res) => {

    var data = { email: req.body.email, address: req.body.address }
    
    whiteListController.updateWalletList(data, (response, error) => {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({
            resp_code: 1,
            data: {
                "logInStatus": response.length > 0 ? true : false,
                "userProfile": response.length > 0 ? response[0] : null
            }
        });
    })
})

module.exports = app;
