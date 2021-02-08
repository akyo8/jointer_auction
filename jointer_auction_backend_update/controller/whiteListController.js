
const { whiteListHelper } = require('../helpers');
const whiteListController = {}


whiteListController.addUser = function (data, next) {

    whiteListHelper.addUser(data, next);
    // whiteListHelper.checkWallet(data,function(response,error){
    //     if(error){
    //         next(null,error);
    //         return false;
    //     }
    //     addWhiteList()
    // })
    //internal function only called when validations is done 
    // function addWhiteList(){
    //     var args = [data.address, Number(data.whiteListType)];
    //     whiteListHelper.contractMethod('addNewWallet',args,function(response,error){
    //         if(!error){
    //             data.txHash = response;
    //             whiteListHelper.addNewWallet(data);
    //         }
    //         next(response,error);        
    //     })
    // }
}

whiteListController.updateUser = function (data, next) {
    whiteListHelper.updateUser(data, next);
}

whiteListController.updateWalletList = function (data, next) {
    whiteListHelper.updateWalletList(data, next);
}

whiteListController.findUserByAddress = function (data, next) {
    whiteListHelper.findUserByAddress(data, next)
}

whiteListController.findUserByEmail = function (data, next) {
    whiteListHelper.findUserByEmail(data, next)
}

whiteListController.findUserByPhone = function (data, next) {
    whiteListHelper.findUserByPhone(data, next)
}

module.exports = whiteListController;


// whiteListController.addUserDetails = function (data, next) {

//     whiteListHelper.addUserDetails(data);
    // // whiteListHelper.checkWallet(data,function(response,error){
    // //     if(error){
    // //         next(null,error);
    // //         return false;
    // //     }
    // //     addWhiteList()
    // // })
    // //internal function only called when validations is done 
    // function addWhiteList(){
    //     var args = [data.address, Number(data.whiteListType)];
    //     whiteListHelper.contractMethod('addNewWallet',args,function(response,error){
    //         if(!error){
    //             data.txHash = response;
    //             whiteListHelper.addNewWallet(data);
    //         }
    //         next(response,error);        
    //     })
    // }
// }