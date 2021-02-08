const {
    auctionHelper
} = require('../helpers');
const auctionContoller = {}

auctionContoller.getAuctionDetails = function (next) {
    auctionHelper.getAuctionDetails(function (response, error) {
        next(response, error);
    })

}

auctionContoller.getAuctionData = function (next) {
    auctionHelper.getAuctionData(function (response, error) {
        next(response, error);
    })

}

auctionContoller.getCurrencyPrice = function (next) {
    auctionHelper.getCurrencyPrice(function (response, error) {
        next(response, error);
    })

}




auctionContoller.getAuctionEnd = function (next) {
    auctionHelper.getAuctionEnd(function (response, error) {
        next(response, error);
    })
}

auctionContoller.setAuctionEnd = function (next) {
    auctionHelper.setAuctionEnd(function (response, error) {
        next(response, error);
    })
}

auctionContoller.getSignForEth = function (data, next) {
    auctionHelper.getSignForEth(data, next);
}

auctionContoller.getUserInvestMent = function (data, next) {
    auctionHelper.getUserInvestMent(data, next);
}

auctionContoller.getUserTotalInvestMentDownSide = function (data, next) {
    auctionHelper.getUserTotalInvestMentDownSide(data, next);
}

auctionContoller.clearDownsideUserInvestment = function (address, next) {
    auctionHelper.clearDownsideUserInvestment(address, next);
}



module.exports = auctionContoller;