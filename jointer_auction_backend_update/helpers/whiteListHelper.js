const {
    web3
} = require('../configs');
var Tx = require('ethereumjs-tx');
var abi = require('ethereumjs-abi');
var fs = require('fs');
var mongoose = require('mongoose');
const {
    whiteListModel,
    kycDetailModel
} = require('../models').whiteListSchema;
const {
    whiteListConfig,
    initConfigs
} = require('../configs');

const whiteListHelper = {}
const ContractData = new web3.eth.Contract(whiteListConfig.contractAbi, whiteListConfig.contractAddress);


whiteListHelper.findUserByAddress = function (data, next) {
    console.log(data)
    whiteListModel.find({
        wallets: data.address
    }).then((response) => {
        next(response, null)
    }).catch((e) => {
        console.log(e);
        next(null, e);
    })
}


function genrateCodeForKycfunction() {
    var jsonData = require('../data/kycCodeData.json');
    var code = jsonData[0].code;
    return code;
}


function removeFirstCode(){
    fs.readFile('/opt/staging-app/Blockchain/jointer_auction/jointer_auction_backend_update/data/kycCodeData.json', function(err, data) {
        var jsonData = JSON.parse(data);
        jsonData.splice(0,1);
        fs.writeFile('/opt/staging-app/Blockchain/jointer_auction/jointer_auction_backend_update/data/kycCodeData.json',JSON.stringify(jsonData), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });

}

function sendEmail(to, msg ,next) {
    var nodemailer = require('nodemailer');
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreply.rentblock@gmail.com',
            pass: 'mind@2018deft'
        }
    });

    var mailOptions = {
        from: 'noreply.rentblock@gmail.com',
        to: to,
        subject: 'Jointer Kyc Code',
        html: msg
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            next(true);
        }
    });


}

function sendSms(mobile,msg,next) {
    var http = require("https");

    var options = {
        "method": "POST",
        "hostname": "api.msg91.com",
        "port": null,
        "path": "/api/v2/sendsms",
        "headers": {
            "authkey": "249597Asw4VQcZO5bffd728",
            "content-type": "application/json"
        }
    };

    var req = http.request(options, function (res) {
        var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            next(true)
        });
    });
    console.log(mobile,msg)
    req.write(JSON.stringify({
        sender: '85116912',
        route: '4',
        country: '0',
        sms: [{ message: msg, to:[mobile] }]
    }));
    req.end();
}


whiteListHelper.findUserByEmail = async function (data, next) {
    const UserDetails = await whiteListModel.find({
        email: data.email
    });
    if (UserDetails.length > 0 && data.address !== undefined && !UserDetails[0].unapprovedWallets.includes(data.address) && !UserDetails[0].wallets.includes(data.address)) {
        UserDetails[0].unapprovedWallets.push(data.address);
        await UserDetails[0].save();
        next(UserDetails, null)
    } else if (UserDetails.length > 0) {
        next(UserDetails, null)
    } else {
        next([], null);
    }
}

whiteListHelper.updateWalletList = async function (data, next) {
    const UserDetails = await whiteListModel.find({
        email: data.email
    });
    if (UserDetails.length > 0 && data.address !== undefined && UserDetails[0].unapprovedWallets.includes(data.address) && !UserDetails[0].wallets.includes(data.address)) {
        UserDetails[0].wallets.push(data.address);
        var unapprovedWallets = UserDetails[0].unapprovedWallets;
        unapprovedWallets = unapprovedWallets.filter(item => item !== data.address);
        UserDetails[0].unapprovedWallets = unapprovedWallets;
        await UserDetails[0].save();
        next(UserDetails, null)
    } else if (UserDetails.length > 0) {
        next(UserDetails, null)
    } else {
        next([], null);
    }
}

whiteListHelper.findUserByPhone = function (data, next) {
    whiteListModel.find({
        phone: data.phone
    }).then((response) => {
        next(response, null)
    }).catch((e) => {
        console.log(e);
        next(null, e);
    })
}

whiteListHelper.addUser = async function (data, next) {
    var newUser = new whiteListModel({
        email: data.email,
        phone: (data.countryCode.replace("+", "")) + data.phone,
        unapprovedWallets: [data.address]
    });
    let code  = genrateCodeForKycfunction();
    let url = 'https://daiu.app.link/yBE7efy4PI?service_code='+code;
    var msg = "URL :"+url;
    sendEmail(data.email,msg,function(){
        msg = "Jointer KYC :"+url;
        sendSms(Number((data.countryCode.replace("+",""))+data.phone),msg,function(){
            newUser.save()
            removeFirstCode();
            next(newUser, null)
        });
    });
    
    
}

whiteListHelper.updateUser = async function (data, next) {
    const UserDetails = await whiteListModel.findOne({
        phone: data.phone
    });
    console.log(UserDetails);
    UserDetails.details.first_name = data.first_name;
    UserDetails.details.last_name = data.last_name;
    UserDetails.details.middle_name = data.middle_name;
    UserDetails.details.country = data.country_code;
    UserDetails.kycStatus = data.kycStatus;
    UserDetails.kycId = data.kycId;
    await UserDetails.save();

    if(data.kycStatus === "completed"){
        UserDetails.wallets.push(UserDetails.unapprovedWallets[0]);
        whiteListHelper.contractMethod('addNewWallet',[UserDetails.unapprovedWallets[0],0,5], function (a, b) {
            var unapprovedWallets = UserDetails.unapprovedWallets;
            unapprovedWallets = unapprovedWallets.filter(item => item !== unapprovedWallets[0]);
            UserDetails.unapprovedWallets = unapprovedWallets;
            UserDetails.save();
            next(UserDetails, null)
        })
       
    }
}

whiteListHelper.contractMethod = function (methodName, args, next) {
    var encodeABI = ContractData.methods[methodName].apply(this, args).encodeABI();
    var fromAddress = whiteListConfig.ownerAddress;
    return ContractData.methods[methodName].apply(this, args).estimateGas({
        from: fromAddress
    })
        .then(function (_gasLimit) {
            console.log(_gasLimit)
            return getRawTransaction(fromAddress, '', _gasLimit, whiteListConfig.contractAddress, '', encodeABI);

        }).then(function (_rawData) {
            var tx = new Tx(_rawData);
            let privateKey = new Buffer(whiteListConfig.privateKey, 'hex');
            tx.sign(privateKey);
            var serializedTx = tx.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (error, hash) {
                next(hash, error);
            })
        }).catch(function (e) {
            next(null, e);
        })
}

module.exports = whiteListHelper;