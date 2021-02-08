var CronJob = require('cron').CronJob;
var req = require("request");
var fs = require('fs');
const path = require('path');
var { initConfigs } = require('../configs');

var { setCurrencyPriceOnchain } = require('../helpers').auctionHelper;

var {
    currencyPriceConfig
} = require('../configs');
const baseUrlCMC = 'https://api.coingecko.com/api/v3/simple/price?ids=';

const WS_BASE_URL = `${initConfigs.WS_BASE_URL}/broadcast`;

async function setPrice() {
    var currency = [];
    var currencyPrice = [];
    var length = 0;
    const priceData = {}
    for(key in currencyPriceConfig.currency) {
        req({
            method: 'GET',
            uri: baseUrlCMC+key+"&vs_currencies=usd",
            json: true
        },function (error, data, body) {
           let price = body[key]["usd"] * 10**6;
           price = price.toFixed(0);
           currency.push(currencyPriceConfig.currency[key])
           currencyPrice.push(price);
           priceData[currencyPriceConfig.currency[key]] = price;
           length++;
           if(length == Object.keys(currencyPriceConfig.currency).length){
                internalCall();
           }
        })   
    }
    function internalCall(){
        setCurrencyPriceOnchain(currency,currencyPrice,(check)=>{
            if(check){
                fs.writeFile( path.resolve(__dirname, '../data/priceData.json') , JSON.stringify(priceData) , function (err) {
                    if (err) throw err;
                    req({method: 'GET',uri: `${WS_BASE_URL}/CURRENCY_UPDATE`,json: true},function (error, data, body) {})
                    console.log('Replaced!');
                });
            }
        });
    }

}
var cronJ = new CronJob('*/6 * * * *', () => {
    setPrice();
})
setPrice();
cronJ.start();