const {
    jntrNoteHelper
} = require('../helpers');
const jntrNoteController = {}

jntrNoteController.getTxHistory = function (address, next) {
    jntrNoteHelper.getTxHistory(address, function (response, error) {
        next(response, error);
    })
}

jntrNoteController.updateTxHistory = function (data, next) {
    jntrNoteHelper.updateTxHistory(data, next);
}


module.exports = jntrNoteController;