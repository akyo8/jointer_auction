'use strict';

var dbName =  require('../configs').initConfigs.dbName;

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
require('mongoose-uuid2')(mongoose);

const connectionUrl = `mongodb://localhost:27017/${dbName}`
var db = mongoose.connect(connectionUrl,{useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true });
module.exports = db;