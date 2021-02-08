
var Web3 = require('web3');
var initConfigs =  require('../initConfigs');
provider = `https://ropsten.infura.io/v3/${initConfigs.INFURA_KEY}`;

web3 = new Web3(new Web3.providers.HttpProvider(provider));

web3.getRawTransactionApp = function(_address, _gasPrice, _gasLimit, _to, _value, _data) {
    
    return web3.eth.getTransactionCount(_address).then(function (_nonce) {
        console.log(_nonce);
        return {
            nonce: web3.utils.toHex(_nonce),
            gasPrice: (_gasPrice != "" && typeof _gasPrice != "undefined") ? web3.utils.toHex(_gasPrice) : '0x098bca5a00',
            gasLimit: (_gasLimit != "" && typeof _gasLimit != "undefined") ? web3.utils.toHex(_gasLimit) : '0x96ed',
            to: _to,
            value: (_value != "" && typeof _value != "undefined") ? web3.utils.toHex(_value) : '0x00',
            data: (_data != "" && typeof _data != "undefined") ? _data : '',
            chainId: require('../initConfigs').chainId
        }
    })
}



module.exports = web3;