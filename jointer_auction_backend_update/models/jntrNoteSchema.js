'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;
var uuidv4 = require('uuid/v4');

var RedemptionTxHistorySchema = new Schema({
    _id: { type: UUID, default: uuidv4 },
    txId: { type: String, trim: true, unique: true },
    userAddress: { type: String, trim: true },
    sentAmount: { type: Number, default: 0 },
    sentAmountUSD: { type: Number, default: 0 },
    sentCurrency: { type: String, trim: true },
    returnAmount: { type: Number, default: 0 },
    returnAmountUSD: { type: Number, default: 0 },
    returnCurrency: { type: String, trim: true },
    txStatus: { type: String, trim: true, default: "pending" },
    txTime: { type: Number, default: 0 },
})


RedemptionTxHistorySchema.set('toJSON', { getters: true, virtuals: true });
const RedemptionTxHistoryModel = mongoose.model('RedemptionTxHistory', RedemptionTxHistorySchema);

module.exports = { RedemptionTxHistoryModel: RedemptionTxHistoryModel };