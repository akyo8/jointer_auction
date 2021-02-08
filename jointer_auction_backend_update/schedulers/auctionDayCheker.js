var req = require("request");
var Web3 = require("web3");
var path = require('path');

var { auctionConfig , initConfigs } = require('../configs');
var {
  auctionHelper
} = require('../helpers');
const InputDataDecoder = require('ethereum-input-data-decoder');
var fs = require('fs');

const decoder = new InputDataDecoder(auctionConfig.contractAbi);
//var web3 = new Web3('wss://ropsten.infura.io/ws');
let web3 = new Web3(
  new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws/v3/648254b2c917421699353403bc610ef0")
);

var AuctionContract = new web3.eth.Contract(auctionConfig.contractAbi, auctionConfig.contractAddress);


AuctionContract.getPastEvents("AuctionEnded",
    {                               
        fromBlock: '0',     
        toBlock: 'latest' // You can also specify 'latest'          
    })                              
.then(function(resp){
  for(let i=0;i < resp.length ; i++){
    let element = resp[i]
    let _auctionDayId = element.returnValues._auctionDayId
    if(_auctionDayId === '89' ){
      console.log(element);
      // let currentMarketPrice = (element.returnValues._yesterdayContribution*10**12/element.returnValues._todaySupply)
      // element["currentMarketPrice"] = currentMarketPrice ;
      // auctionHelper.AuctionEnded(element, (a, b) => {})
    }
  
  }

})
.catch((err) => console.error(err));

