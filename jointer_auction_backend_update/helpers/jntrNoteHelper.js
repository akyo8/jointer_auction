const {
    web3
} = require('../configs');

const {
    RedemptionTxHistoryModel
} = require('../models').jntrNoteSchema;

const jntrNoteHelper = {}


jntrNoteHelper.getTxHistory = function (userAddress, next) {
    RedemptionTxHistoryModel.find({
        userAddress: userAddress
    }).then(function (response) {
        next(response.reverse(), null);
    }).catch(function (e) {
        next(null, e)
    })
}

jntrNoteHelper.updateTxHistory = function (txData, next) {
    RedemptionTxHistoryModel.findOne({
        txId: txData.txHash.toLowerCase()
    }).then((response) => {
        console.log("response", response);
        if (response == null) {
            let details = new RedemptionTxHistoryModel({
                txId: txData.txHash.toLowerCase(),
                userAddress: txData.userAddress.toLowerCase(),
                sentAmount: txData.sentAmount,
                sentAmountUSD: txData.sentAmountUSD,
                sentCurrency: txData.sentCurrency
            })
            details.save((resp) => {
                next(resp, null)
            })
        } else {
            response.returnAmount = txData.returnAmount;
            response.returnAmountUSD = txData.returnAmountUSD;
            response.returnCurrency = txData.returnCurrency;
            response.txStatus = txData.txStatus;
            response.txTime = txData.txTime;
            response.save((resp) => {
                next(resp, null)
            })
        }
    }).catch((e) => {
        console.log(e)
        next(null, e);
    })

}

module.exports = jntrNoteHelper;