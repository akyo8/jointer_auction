const { auctionHelper } = require('../helpers')
var fs = require('fs');
const path = require('path');
var cronJob = require('cron').CronJob;
var moment = require("moment")

function addTime(){
  fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'),function (err,data) {
    data = JSON.parse(data);
    data["EndDate"] = moment().utc().add(15,'minutes').add(30,'seconds');
    fs.writeFile(path.resolve(__dirname, '../data/auctionDetails.json'),JSON.stringify(data), function (err) {
      if (err) throw err;
       console.log('Replaced!');
    }); 
  })
}

addTime();

// var cronJ = new cronJob("*/15 * * * *", function() {    
//     fs.readFile(path.resolve(__dirname, '../data/auctionDetails.json'),function (err,data) {
//       data = JSON.parse(data);
//       auctionHelper.EndAuction((data["currentMarketPrice"]*10**6).toFixed(0),(a,b)=>{})
//       addTime();
//     })
// }, undefined, true, "GMT");

// cronJ.start();

// auctionHelper.EndAuction("25213",(a,b)=>{})



