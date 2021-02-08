'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;
var uuidv4 = require('uuid/v4');

var WhiteListSchema = new Schema({
  _id: { type: UUID, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true, trim: true, unique: true },
  phone: { type: String, required: true, trim: true, unique: true },
  wallets: [{ type: String, trim: true }],
  unapprovedWallets: [{ type: String, trim: true }],
  whiteListType: { type: Number, trim: true, default: 0 },
  kycStatus: { type: String, trim: true, default: null },
  expireOn: { type: Date, trim: true, default: Date.now },
  kycId: { type: String, trim: true, default: null },
  details: {
    first_name: { type: String, trim: true, default: null },
    last_name: { type: String, trim: true, default: null },
    middle_name: { type: String, trim: true, default: null },
    country: { type: String, trim: true, default: null },
    phone: { type: String, trim: true, default: null },
    extraDetails: [{
      key: { type: String, trim: true },
      value: { type: String, trim: true }
    }]
  }
})
WhiteListSchema.set('toJSON', { getters: true, virtuals: true });
const whiteListModel = mongoose.model('WhiteList', WhiteListSchema);
module.exports = { whiteListModel: whiteListModel };


