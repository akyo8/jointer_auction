

var contractData = {}

contractData.contractAbi = [{"constant":false,"inputs":[{"name":"_currency","type":"address[]"},{"name":"_price","type":"uint256[]"}],"name":"setCurrencyPriceUSD","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"currencyPrices","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}];

contractData.contractAddress = "0xb2cf9B45cb75dF5092EBA8e342f0202887E38a45";

contractData.ownerAddress = "0xD21A1BAcB68b50173791853764be24567dD75Ac4";

contractData.privateKey = "b5650b4873ada113c0c19b930c65f3576b3a9ac40a74b520b7ae4714315b65b9";;

contractData.currency = {
    "ethereum":"0x0000000000000000000000000000000000000000"
}

module.exports = contractData;