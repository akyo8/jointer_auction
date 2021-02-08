
var express = require('express');
var app = express.Router();
const { auctionController } = require('../controller')

app.get('/getAuctionDetails', (req, res) => {
    auctionController.getAuctionDetails(function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})

app.get('/getAuctionData', (req, res) => {
    auctionController.getAuctionData(function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})



app.get('/getCurrencyPrice', (req, res) => {
    auctionController.getCurrencyPrice(function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})

app.get('/getUserInvestMent/:address', (req, res) => {
    auctionController.getUserInvestMent(req.params.address, function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        } else {
            auctionController.getUserTotalInvestMentDownSide(req.params.address, function (responseDownSide, errorDownSide) {
                if (error) {
                    return res.status(400).send({ resp_code: -1, data: errorDownSide.toString() });
                } else {
                    if (responseDownSide !== null) {
                        response["totalInvestment"] = responseDownSide.totalInvestMent;
                        return res.send({ resp_code: 1, data: response, totalInvestMent: responseDownSide.totalInvestMent });
                    } else {
                        response["totalInvestment"] = 0;
                        return res.send({ resp_code: 1, data: response, totalInvestMent: null });
                    }
                }
            })
        }
    })
})


// app.get('/setAuctionEnd',(req,res)=>{
//     auctionController.setAuctionEnd(function(response,error){
//         if(error){
//             return res.status(400).send({resp_code:-1,data:error.toString()});
//         }
//         return res.send({resp_code:1,data:response});
//     })

// })

app.get('/getSignForEth', (req, res) => {
    auctionController.getSignForEth({}, function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })

})

app.post('/clearDownsideUserInvestment', (req, res) => {
    auctionController.clearDownsideUserInvestment(req.body.address, function (response, error) {
        if (error) {
            return res.status(400).send({ resp_code: -1, data: error.toString() });
        }
        return res.send({ resp_code: 1, data: response });
    })
})



app.post('/fetchByAddress', (req, res) => {


})


module.exports = app;