var req = require("request");
var Web3 = require("web3");
var path = require('path');

var { auctionConfig, initConfigs } = require('../configs');
var {
  auctionHelper
} = require('../helpers');
const InputDataDecoder = require('ethereum-input-data-decoder');
var fs = require('fs');

const decoder = new InputDataDecoder(auctionConfig.contractAbi);
//var web3 = new Web3('wss://ropsten.infura.io/ws');
let web3 = new Web3(new Web3.providers.WebsocketProvider(initConfigs.Web_Socket));

var AuctionContract = new web3.eth.Contract(auctionConfig.contractAbi, auctionConfig.contractAddress);

const WS_BASE_URL = `${initConfigs.WS_BASE_URL}/broadcast`;

auctionHelper.calculateMarketPrice(function (newPriceData) {
  fs.readFile(path.resolve(__dirname, '../data/auctionEndPrice.json'), function (err, data) {
    let priceData = JSON.parse(data);
    console.log(newPriceData.jntrPrice / priceData["EndDayPrice"] * 100 > 120)
  })
})


function InitEvents() {
  AuctionContract.events.allEvents(function (error, result) {
    if (!error) {
      if (result.event === "FundAdded") {
        auctionHelper.contriButionAdded(result, (a, b) => { });
        detailSetter(result.returnValues, 0, 0)

      }
      if (result.event === "AuctionEnded") {
        fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'), (err, data) => {
          data = JSON.parse(data);
          result["currentMarketPrice"] = data["currentMarketPrice"];
          auctionHelper.AuctionEnded(result, (a, b) => { })
          detailSetter(result.returnValues, 1, 0)
        })
        fs.readFile(path.resolve(__dirname, '../data/currentAuctionStatus.json'), function (err, data) {
          let jsonData = JSON.parse(data);
          jsonData["isAuctionEnding"] = false;
          fs.writeFile(path.resolve(__dirname, '../data/currentAuctionStatus.json'), JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            console.log('Auction Status Updated!');
          })
        })
      }
    } else
      console.log(error)
  })
}

detailSetter(null, null, 0);

function detailSetter(a, b, counter) {
  auctionHelper.calculateMarketPrice(function (newPriceData) {
    fs.readFile(path.resolve(__dirname, '../data/auctionEndPrice.json'), function (err, data) {
      let priceData = JSON.parse(data);
      var newvalue = newPriceData.jntrPrice;
      fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'), function (err, curretndata) {
        curretndata = JSON.parse(curretndata);
        console.log(counter);
        if (counter >= 4) {
          setDetails(a, b, newPriceData, priceData)
        } else if (newvalue === curretndata["currentMarketPrice"]) {
          counter = counter + 1;
          detailSetter(a, b, counter);
        } else {
          setDetails(a, b, newPriceData, priceData)
        }
      })
    })
  })
}

function setDetails(a, b, newPriceData, priceData) {
  var newvalue = newPriceData.jntrPrice;

  if (b === 0) {
    if (newPriceData.jntrPrice / priceData["EndDayPrice"] * 100 > 120) {
      newvalue = priceData["EndDayPrice"] * 1.2;
      let newjntrRatio = newPriceData.bntRation * 0.30 / (newvalue);
      let newjntrBalance = newjntrRatio * (newPriceData.totalSupply * 0.5)
      let newSendJntrBalance = (newjntrBalance - newPriceData.jntrBalance).toFixed(0);
      if (newSendJntrBalance > 0 && newPriceData.jntrPrice / priceData["EndDayPrice"] * 100 > 120) {
        try {
          auctionHelper.apprecitation(newSendJntrBalance.toString())
        } catch (e) {
          console.error(e)
        }
      }
    }
  }

  if (a === null) {
    AuctionContract.methods.getAuctionDetails().call().then(function (resp) {
      resp["currentMarketPrice"] = newvalue;
      fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'), function (err, data) {
        let jsonData = JSON.parse(data);
        resp["EndDate"] = jsonData.EndDate;
        fs.writeFile(path.resolve(__dirname, '../data/auctionDetails.json'), JSON.stringify(resp), function (err) {
          if (err) throw err;
          console.log('Replaced!');
        })
      })
    });
  } else {
    fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'), function (err, data) {
      data = JSON.parse(data);
      if (b === 1) {
        data["_maxContributionAllowed"] = a._maxContributionAllowed;
        let newPrice = { "EndDayPrice": data["currentMarketPrice"] };
        fs.writeFile(path.resolve(__dirname, '../data/auctionEndPrice.json'), JSON.stringify(newPrice), function (err) {
          if (err) throw err;
          console.log('Replaced!');
        })

      }
      if (b === 0) {
        data["currentMarketPrice"] = newvalue;
      }
      data["_todaySupply"] = a._todaySupply;
      data["_yesterdaySupply"] = a._yesterdaySupply;
      data["_todayContribution"] = a._todayContribution,
        data["_yesterdayContribution"] = a._yesterdayContribution;
      data["_totalContribution"] = a._totalContribution;
      fs.writeFile(path.resolve(__dirname, '../data/auctionDetails.json'), JSON.stringify(data), function (err) {
        if (err) throw err;
        var action = b === 0 ? "FUND_ADDED" : "AUCTION_ENDED"
        req({ method: 'GET', uri: `${WS_BASE_URL}/${action}`, json: true }, function (error, data, body) { })
      })
    })
  }

}

web3._provider.on('connect', () => {
  console.log('Web3 WS connected.');
  InitEvents();
});

web3._provider.on('end', () => {
  console.error('Web3 WS disconnected. Reconnecting...');
  web3 = new Web3(new Web3.providers.WebsocketProvider(initConfigs.Web_Socket));
  AuctionContract = new web3.eth.Contract(auctionConfig.contractAbi, auctionConfig.contractAddress);
  InitEvents();
});