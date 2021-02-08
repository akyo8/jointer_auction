'use strict';
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;
var uuidv4 = require('uuid/v4');

var AuctionDetailsSchema = new Schema({
  _id: { type: UUID, default: uuidv4 },
  startAt: { type: Date, default: Date.now },
  endsAt: { type: Date, default: Date.now },
  auctionDayId: { type: Number, default: 0, unique: true },
  totalSupply: { type: Number, default: 0 },
  totalInvest: { type: Number, default: 0 },
  tokenCost: { type: Number, default: 0 },
  marketCost: { type: Number, default: 0 },
  groupDiscount: { type: Number, default: 0 },
  isOpen: { type: Boolean, default: true },
  participants: [{ type: String, trim: true }],
  maxContributionAllowed: { type: Number, default: 0 }
})



var UserInvestMentSchema = new Schema({
  _id: { type: UUID, default: uuidv4 },
  address: { type: String, required: true, trim: true, unique: true },
  fundAdress: [{ type: String, required: true, trim: true, unique: true }],
  investMentDetails: [{
    dayId: { type: Number, default: 1 },
    totalInvestMent: { type: Number, default: 0 },
    recivedToken: { type: Number, default: 0 },
  }],
})


var DownSideProtectionSchema = new Schema({
  _id: { type: UUID, default: uuidv4 },
  address: { type: String, required: true, trim: true, unique: true },
  totalInvestMent: { type: Number, default: 0 },
  receivedToken: { type: Number, default: 0 }
})

AuctionDetailsSchema.set('toJSON', { getters: true, virtuals: true });
const AuctionDetailsModel = mongoose.model('AuctionDetails', AuctionDetailsSchema);
const UserInvestMentModel = mongoose.model('UserInvestMent', UserInvestMentSchema);
const DownSideProtectionModel = mongoose.model('DownSideProtection', DownSideProtectionSchema);

module.exports = { AuctionDetailsModel: AuctionDetailsModel, UserInvestMentModel: UserInvestMentModel, DownSideProtectionModel: DownSideProtectionModel };