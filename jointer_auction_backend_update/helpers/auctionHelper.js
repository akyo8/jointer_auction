const {
    web3
} = require('../configs');
var Tx = require('ethereumjs-tx');
var abi = require('ethereumjs-abi');
var fs = require('fs');
const path = require('path');
var bigInt = require("big-integer");
var moment = require("moment");


const {
    auctionConfig,
    tagAlongConfig,
    currencyPriceConfig,
    tokenConfig,
    converterConfig,
    relayTokenConfig
} = require('../configs');
const {
    AuctionDetailsModel,
    UserInvestMentModel,
    DownSideProtectionModel
} = require('../models').auctionSchema;

const auctionHelper = {}

const AuctionContract = new web3.eth.Contract(auctionConfig.contractAbi, auctionConfig.contractAddress);

const CurrencyContract = new web3.eth.Contract(currencyPriceConfig.contractAbi, currencyPriceConfig.contractAddress);

const TagAlongContract = new web3.eth.Contract(tagAlongConfig.contractAbi, tagAlongConfig.contractAddress);

const TokenContract = new web3.eth.Contract(tokenConfig.contractAbi, tokenConfig.contractAddress);

const ConverterContract = new web3.eth.Contract(converterConfig.contractAbi, converterConfig.contractAddress);

const RelayTokenContract = new web3.eth.Contract(relayTokenConfig.contractAbi, relayTokenConfig.contractAddress);


auctionHelper.calculateMarketPrice = function (next) {
    RelayTokenContract.methods.totalSupply().call().then((totalSupply) => {
        ConverterContract.methods.getReserveBalance(converterConfig.BntAddress).call().then((bntBalance) => {
            ConverterContract.methods.getReserveBalance(converterConfig.JntrAdress).call().then((jntrBalance) => {
                console.log(jntrBalance)
                let bntRation = bntBalance / (totalSupply * 0.5);
                let jntrRatio = jntrBalance / (totalSupply * 0.5);
                let jntrPrice = ((bntRation / jntrRatio) * 0.30);

                console.log(bntRation);
                console.log("ration", jntrRatio);
                console.log("jntrpice", jntrPrice);

                let newjntrRatio = bntRation * 0.30 / (0.01);
                let newjntrBalance = newjntrRatio * (totalSupply * 0.5)
                let newSendJntrBalance = newjntrBalance - jntrBalance;

                console.log(newSendJntrBalance)
                next({ jntrPrice: jntrPrice, jntrBalance: jntrBalance, jntrRatio: jntrRatio, bntRation: bntRation, totalSupply: totalSupply });
            })
        })
    }).catch(function (e) {
        console.log(e)
    })

}


auctionHelper.setCurrencyPriceOnchain = function (currency, price, cb) {
    var encodeABI = CurrencyContract.methods.setCurrencyPriceUSD(currency, price).encodeABI();
    var fromAddress = currencyPriceConfig.ownerAddress;
    return CurrencyContract.methods.setCurrencyPriceUSD(currency, price).estimateGas({
        from: fromAddress
    })
        .then(function (_gasLimit) {
            console.log(_gasLimit)
            return web3.getRawTransactionApp(fromAddress, '', _gasLimit, currencyPriceConfig.contractAddress, '', encodeABI);
        }).then(function (_rawData) {
            var tx = new Tx(_rawData);
            let privateKey = new Buffer(currencyPriceConfig.privateKey, 'hex');
            tx.sign(privateKey);
            var serializedTx = tx.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (error, hash) {
                console.log("success", hash)
                cb(true)
            })
        }).catch(function (e) {
            cb(false)
            console.log("fail", e)
        })
}


auctionHelper.getAuctionDetails = function (next) {
    fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'), function (err, dataAll) {
        fs.readFile(path.resolve(__dirname, '../data/currentAuctionStatus.json'), function (err, data) {
            if (dataAll !== null) {
                var allData = JSON.parse(dataAll);
                allData['isAuctionEnding'] = JSON.parse(data).isAuctionEnding;
                next(allData, err);
            } else {
                next(null, err);
            }
        });
    });
    // next(require('../data/auctionDetails.json'),null);
}

auctionHelper.getCurrencyPrice = function (next) {
    fs.readFile(path.resolve(__dirname, '../data/priceData.json'), function (err, data) {
        next(data !== null ? JSON.parse(data) : null, err);
    });
    // next(require('../data/auctionDetails.json'),null);
}




auctionHelper.getAuctionData = function (next) {
    AuctionDetailsModel.find().sort('-auctionDayId').limit(10).then(function (response) {
        next(response.reverse(), null);
    }).catch(function (e) {
        next(null, e)
    })
}


auctionHelper.UpdateAuctionDays = function (data, activeDay) {

    for (let x = 0; x < data.length; x++) {
        let element = data[x];
        let auctionDayId = data.returnValues._auctionDayId;
        AuctionDetailsModel.findOne({
            auctionDayId: auctionDayId
        }).then((response) => {
            if (response == null) {
                let details = new AuctionDetailsModel({
                    auctionDayId: auctionDayId,
                    participants: [],
                    totalSupply: web3.utils.fromWei(data.returnValues._todaySupply),
                    isOpen: activeDay === auctionDayId ? true : false,
                    tokenCost: web3.utils.fromWei(tokenPrice, "mwei"),
                    marketCost: 0,
                })
                details.save((resp) => {
                    next(resp, null)
                })
            }




            // auctionHelper.updatePreviousAuction(auctionDayId-1,data.returnValues._yesterdaySupply, data.returnValues._tokenPrice,data["currentMarketPrice"],(a, b)=> {
            //     console.log(data.returnValues._yesterdaySupply);
            //     distbrubateFund(auctionDayId-1,data.returnValues._yesterdaySupply);
            // })


        }).catch((e) => {
            next(null, e);
        })


    }

}

auctionHelper.getUserInvestMent = function (address, next) {
    const data = [];
    var resposneSent = false;
    AuctionDetailsModel.find().sort('-auctionDayId').limit(10).then(function (response) {
        if (response !== null) {
            resposne = response.reverse()
            if (response.length === 0) {
                next(response, null);
            }
            for (let index = 0; index < response.length; index++) {
                let element = response[index];
                UserInvestMentModel.findOne({
                    address: address,
                    "investMentDetails.dayId": element.auctionDayId
                }, {
                    "investMentDetails.$": 1
                }).then(async (newResponse) => {
                    let previousInvestMent = 0;
                    let _data = {
                        auctionDayId: element.auctionDayId,
                        isOpen: element.isOpen,
                        totalSupply: element.totalSupply,
                        totalInvest: element.totalInvest,
                        marketCost: element.marketCost,
                        tokenCost: element.totalInvest / element.totalSupply,
                        maxContributionAllowed: element.maxContributionAllowed
                    }
                    if (index === 0) {
                        if (element.auctionDayId == 1) {
                            previousInvestMent = 500;
                            _data["groupBonus"] = element.totalInvest > previousInvestMent ? (element.totalInvest / previousInvestMent) * 100 : 0;
                        } else {
                            let a = await AuctionDetailsModel.findOne({ auctionDayId: element.auctionDayId - 1 });
                            previousInvestMent = a === null ? 0 : a.totalInvest;
                            _data["groupBonus"] = element.totalInvest > previousInvestMent ? (element.totalInvest / previousInvestMent) * 100 : 0;

                        }
                    } else {
                        previousInvestMent = response[index - 1].totalInvest;
                        _data["groupBonus"] = element.totalInvest > previousInvestMent ? (element.totalInvest / previousInvestMent) * 100 : 0;
                    }
                    if (newResponse !== null) {
                        _data["userInvest"] = newResponse.investMentDetails[0].totalInvestMent;
                        _data["userInvestRatio"] = (newResponse.investMentDetails[0].totalInvestMent / element.totalInvest) * 100;
                        _data["tokenGet"] = (element.totalSupply / element.totalInvest) * newResponse.investMentDetails[0].totalInvestMent;
                    } else {
                        _data["userInvestRatio"] = null
                        _data["tokenGet"] = null
                        _data["userInvest"] = null
                    }
                    _data["previousInvestMent"] = previousInvestMent;
                    data.push(_data);
                    while (data.length == response.length && !resposneSent) {
                        resposneSent = true;
                        let newdata = sort_by_key(data, 'auctionDayId');
                        next(newdata, null);
                    }
                })



            }
        }
    }).catch(function (e) {
        next(null, e)
    })
}

function sort_by_key(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


auctionHelper.getUserTotalInvestMentDownSide = function (address, next) {
    DownSideProtectionModel.findOne({
        address: address,
    }).then((investmentDownside) => {
        next(investmentDownside, null)
    }).catch(function (e) {
        next(null, e)
    })
}



auctionHelper.contriButionAdded = function (data, next) {
    let auctionDayId = data.returnValues._auctionDayId;
    console.log(data.returnValues._auctionDayId)
    AuctionDetailsModel.findOne({
        auctionDayId: auctionDayId
    }).then((response) => {
        console.log(response)
        if (response == null) {
            auctionHelper.createAuction(auctionDayId, (resp, err) => {
                auctionHelper.updateAuction(data.returnValues, (a, b) => { });
            })
        } else {
            auctionHelper.updateAuction(data.returnValues, (a, b) => { });
        }
        auctionHelper.updateUserInvestMent(data.returnValues, (a, b) => { });
        auctionHelper.updateDownsideProtectionData(data.returnValues, (a, b) => { });
    }).catch((e) => {
        console.log(e)
        next(null, e);
    })
}

auctionHelper.updateAuction = function (data, next) {

    AuctionDetailsModel.findOne({
        auctionDayId: data._auctionDayId
    }).then((response) => {
        response.totalSupply = web3.utils.fromWei(data._todaySupply);
        response.totalInvest = web3.utils.fromWei(data._todayContribution, "mwei");
        if (!response.participants.includes(data._fundBy.toLowerCase())) {
            response.participants.push(data._fundBy.toLowerCase());
        }
        response.save((resp) => {
            next(resp, null)
        })

    }).catch((e) => {
        next(null, e);
    })
}

auctionHelper.updateUserInvestMent = function (data, next) {
    UserInvestMentModel.findOne({
        address: data._fundBy.toLowerCase()
    }).then((response) => {
        console.log("response", response);
        if (response == null) {
            var details = new UserInvestMentModel({
                address: data._fundBy.toLowerCase(),
                fundAdress: [data.fundAddress.toLowerCase()],
                investMentDetails: [{
                    dayId: data._auctionDayId,
                    totalInvestMent: web3.utils.fromWei(data._fundAmount, "mwei")
                }]
            })
            details.save((resp) => {
                next(resp, null)
            })
        } else {
            UserInvestMentModel.findOne({
                address: data._fundBy.toLowerCase(),
                "investMentDetails.dayId": data._auctionDayId
            }, {
                "investMentDetails.$": 1
            }).then((newResponse) => {

                if (newResponse == null) {
                    response.fundAdress.push(data.fundAddress.toLowerCase());
                    response.investMentDetails.push({
                        dayId: data._auctionDayId,
                        totalInvestMent: web3.utils.fromWei(data._fundAmount, "mwei")
                    })
                    response.save((resp) => {
                        next(resp, null)
                    })
                } else {
                    let newValue = newResponse.investMentDetails[0].totalInvestMent + Number(web3.utils.fromWei(data._fundAmount, "mwei"))

                    UserInvestMentModel.updateOne({
                        address: data._fundBy.toLowerCase(),
                        "investMentDetails.dayId": data._auctionDayId
                    }, {
                        '$set': {
                            'investMentDetails.$.totalInvestMent': newValue,
                        }
                    }).then((resp) => {
                        response.fundAdress.push(data.fundAddress.toLowerCase());
                        response.save()
                        next(resp, null)
                    })
                }


            })
        }
    }).catch((e) => {
        console.log(e)
        next(null, e);
    })

}

auctionHelper.updateDownsideProtectionData = function (data, next) {
    DownSideProtectionModel.findOne({
        address: data._fundBy.toLowerCase()
    }).then((response) => {
        console.log("response", response);
        if (response == null) {
            var details = new DownSideProtectionModel({
                address: data._fundBy.toLowerCase(),
                totalInvestMent: web3.utils.fromWei(data._fundAmount, "mwei")
            })
            details.save((resp) => {
                next(resp, null)
            })
        } else {
            response.totalInvestMent = response.totalInvestMent + Number(web3.utils.fromWei(data._fundAmount, "mwei"));
            response.save((resp) => {
                next(resp, null)
            })
        }
    }).catch((e) => {
        console.log(e)
        next(null, e);
    })
}

auctionHelper.clearDownsideUserInvestment = function (address, next) {
    DownSideProtectionModel.findOne({
        address: address.toLowerCase()
    }).then((response) => {
        console.log("response", response);
        if (response == null) {
            next(null, null)
        } else {
            response.totalInvestMent = 0;
            response.save((resp) => {
                next(resp, null)
            })
        }
    }).catch((e) => {
        console.log(e)
        next(null, e);
    })
}

auctionHelper.distbrubateFund = function (dayId) {
    distbrubateFund(dayId);
}

auctionHelper.createAuction = function (auctionDayId, next) {
    let details = new AuctionDetailsModel({
        auctionDayId: auctionDayId,
        participants: []
    })
    details.save((resp) => {
        next(resp, null)
    })

}

auctionHelper.updatePreviousAuction = function (auctionDayId, supply, tokenPrice, marketPrice, next) {
    AuctionDetailsModel.findOne({
        auctionDayId: auctionDayId
    }).then((response) => {
        console.log(marketPrice)
        if (response !== null) {
            response.totalSupply = web3.utils.fromWei(supply);
            response.isOpen = false;
            response.tokenCost = web3.utils.fromWei(tokenPrice, "mwei");
            response.marketCost = marketPrice
            response.save((resp) => {
                next(resp, null)
            })
        } else {
            next(resp, null)
        }

    }).catch((e) => {
        next(null, e);
    })
}

auctionHelper.AuctionEnded = function (data, next) {
    let auctionDayId = data.returnValues._auctionDayId;
    console.log(auctionDayId);
    AuctionDetailsModel.findOne({
        auctionDayId: auctionDayId
    }).then((response) => {
        if (response == null) {
            let details = new AuctionDetailsModel({
                auctionDayId: auctionDayId,
                participants: [],
                totalSupply: web3.utils.fromWei(data.returnValues._todaySupply),
                maxContributionAllowed: data.returnValues._maxContributionAllowed
            })
            details.save((resp) => {
                next(resp, null)
            })
        }
        auctionHelper.updatePreviousAuction(auctionDayId - 1, data.returnValues._yesterdaySupply, data.returnValues._tokenPrice, data["currentMarketPrice"], (a, b) => {
            console.log(data.returnValues._yesterdaySupply);
            distbrubateFund(auctionDayId - 1, data.returnValues._yesterdaySupply);
        })


    }).catch((e) => {
        next(null, e);
    })

}


auctionHelper.EndAuction = function (price, next) {

    AuctionContract.methods.getAuctionDetails().call().then(async function (auctionData) {
        if (Number(auctionData._todayContribution) === 0) {
            var signTran = "";
            var fromAddress = tagAlongConfig.ownerAddress;
            AuctionContract.methods.maxContributionAllowed().call().then(async function (response) {
                fs.readFile(path.resolve(__dirname, '../data/priceData.json'), function (err, data) {
                    data = JSON.parse(data);
                    let maxContributionAllowed = web3.utils.toWei(auctionData._yesterdayContribution, "mwei");
                    let etherPrice = web3.utils.toWei(data["0x0000000000000000000000000000000000000000"], "mwei");
                    var ethers = (Number(maxContributionAllowed)) / etherPrice;
                    ethers = web3.utils.toWei(ethers.toString());
                    ethers = (ethers).toString();
                    console.log("ethers", ethers)
                    return web3.eth.getBalance(tagAlongConfig.contractAddress).then(function (balance) {

                        if (Number(ethers) > balance) {
                            ethers = (balance);
                        }
                        return ethers.toString();
                    }).then(function (ethers) {
                        // sign transcation called from here 
                        console.log("here")
                        signTran = "0x7465737400000000000000000000000000000000000000000000000000000000";
                        return TagAlongContract.methods.contributeWithEther(signTran, signTran, 10, signTran, signTran, ethers).estimateGas({ from: fromAddress })
                    }).then(function (_gasLimit) {
                        console.log("_gasLimit", _gasLimit)
                        var encodeABI = TagAlongContract.methods.contributeWithEther(signTran, signTran, 10, signTran, signTran, ethers).encodeABI();
                        return web3.getRawTransactionApp(fromAddress, web3.utils.toWei("1", "gwei"), "949451", tagAlongConfig.contractAddress, '', encodeABI);
                    }).then(function (_rawData) {
                        var tx = new Tx(_rawData);
                        let privateKey = new Buffer(tagAlongConfig.privateKey, 'hex');
                        tx.sign(privateKey);
                        var serializedTx = tx.serialize();
                        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                            .on('receipt', function (response) {

                                setTimeout(() => {
                                    fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'), function (err, data) {
                                        data = JSON.parse(data);

                                        let newvalue = data["currentMarketPrice"];

                                        console.log("price", newvalue, price)

                                        newvalue = (newvalue * 10 ** 6).toFixed(0);

                                        console.log(newvalue)

                                        endAuctionOnChain(newvalue);
                                    })
                                }, 2000)

                            })

                    }).catch(function (e) {
                        console.log("fail", e);
                        // if(e.message.includes("replacement transaction underpriced")) {
                        //     auctionHelper.EndAuction(price,next);
                        // }
                    })
                })
            }).catch(function (e) {
                next(null, e);
            })
        } else {
            endAuctionOnChain(price);
        }
    }).catch(function (e) {
        console.log(e)
        next(null, e);
    })

}


auctionHelper.apprecitation = function (tokeAmount) {
    try {
        mintTokens("0x546B072287eb122B292CA6EF4a03cb0D6010593E", tokeAmount, (a, b) => { })
    } catch (e) {
        console.error("fail at apprecitation", e)
    }
}

function mintTokens(adress, tokeAmount, next) {

    var encodeABI = TokenContract.methods.mint(adress, tokeAmount).encodeABI();
    var fromAddress = tokenConfig.ownerAddress;

    return TokenContract.methods.mint(adress, tokeAmount).estimateGas({
        from: fromAddress
    })
        .then(function (_gasLimit) {
            return web3.getRawTransactionApp(fromAddress, web3.utils.toWei("41", "gwei"), _gasLimit, tokenConfig.contractAddress, '', encodeABI);
        }).then(function (_rawData) {
            var tx = new Tx(_rawData);
            let privateKey = new Buffer(tokenConfig.privateKey, 'hex');
            tx.sign(privateKey);
            var serializedTx = tx.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', function (response) {
                console.log("minted")
                next(true);
            })
        }).catch(function (e) {
            console.log("error", e)
            next(false)
        })

}

function grouper(array, cols) {

    function split(array, cols) {
        if (cols == 1) return array;
        var size = Math.ceil(array.length / cols);
        return array.slice(0, size).concat([null]).concat(split(array.slice(size), cols - 1));
    }

    var a = split(array, cols);
    var groups = [];
    var group = [];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === null) {
            groups.push(group);
            group = [];
            continue;
        }
        group.push(a[i]);

    }
    groups.push(group);
    return groups;

}

// pass wallets as sub array
function distbrubateFundOnChain(dayId, wallets) {

    for (let tempX = 0; tempX < wallets.length; wallets++) {
        console.log(wallets[tempX]);
        var encodeABI = AuctionContract.methods.disturbuteTokens(dayId, wallets[tempX]).encodeABI();
        var fromAddress = auctionConfig.ownerAddress;
        return AuctionContract.methods.disturbuteTokens(dayId, wallets[tempX]).estimateGas({
            from: fromAddress
        })
            .then(function (_gasLimit) {
                return web3.getRawTransactionApp(fromAddress, web3.utils.toWei("41", "gwei"), _gasLimit, auctionConfig.contractAddress, '', encodeABI);
            }).then(function (_rawData) {
                var tx = new Tx(_rawData);
                let privateKey = new Buffer(auctionConfig.privateKey, 'hex');
                tx.sign(privateKey);
                var serializedTx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
            }).catch(function (e) {
                console.log("erorr", e)
                // email send to user 
                // fail check distrvution needed 
            })
    }
}

function distbrubateFund(auctionDayId, tokenSupply) {
    tokenSupply = bigInt(tokenSupply * 3).toString()
    mintTokens(auctionConfig.contractAddress, tokenSupply, function (a) {
        if (a) {
            AuctionDetailsModel.findOne({
                auctionDayId: auctionDayId
            }).then(function (response) {
                var participants = response.participants;
                var groups = participants.length / 4 < 1 ? 1 : participants.length / 4;
                var wallets = grouper(participants, groups);
                distbrubateFundOnChain(auctionDayId, wallets)
            }).catch(function (e) {
                console.log("erorr", e)
                // send email to infrom 
            })


        }
    })
}


function endAuctionOnChain(price) {

    var encodeABI = AuctionContract.methods.auctionEnd(price).encodeABI();

    var fromAddress = auctionConfig.ownerAddress;

    return AuctionContract.methods.auctionEnd(price).estimateGas({
        from: fromAddress
    })
        .then(function (_gasLimit) {
            console.log(_gasLimit)
            return web3.getRawTransactionApp(fromAddress, web3.utils.toWei("41", "gwei"), _gasLimit, auctionConfig.contractAddress, '', encodeABI);
        }).then(function (_rawData) {
            var tx = new Tx(_rawData);
            let privateKey = new Buffer(auctionConfig.privateKey, 'hex');
            tx.sign(privateKey);
            var serializedTx = tx.serialize();

            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (error, hash) {
                fs.readFile(path.resolve(__dirname, '../data/currentAuctionStatus.json'), function (err, data) {
                    let jsonData = JSON.parse(data);
                    jsonData["isAuctionEnding"] = true;
                    fs.writeFile(path.resolve(__dirname, '../data/currentAuctionStatus.json'), JSON.stringify(jsonData), function (err) {
                        if (err) throw err;
                        console.log('Auction Status Updated!');
                    })
                })
                console.log("success", hash)
                console.log("error", error)
            })
        }).catch(function (e) {
            console.log("fail", e)
        })

}


auctionHelper.getSignForEth = function (data, next) {
    var privateKey = new Buffer("0x4bdc679e6a472f7146b6f76baaef33cb046b2d6fdc2457cf3ca95cbff991421f", 'hex');
    var hash = "0x" + abi.soliditySHA3(
        ["address", "uint256"],
        ["0xD21A1BAcB68b50173791853764be24567dD75Ac4", "0"]
    ).toString('hex')

    var signTran = web3.eth.accounts.sign(hash, privateKey);
    delete signTran["signature"];
    next(signTran, null)
}

auctionHelper.getAuctionEnd = function (next) {
    next(auctionConfig.AuctionEnds, null)
}
module.exports = auctionHelper;