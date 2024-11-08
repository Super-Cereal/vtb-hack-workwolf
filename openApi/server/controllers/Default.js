"use strict";

var utils = require("../utils/writer.js");
var Default = require("../service/DefaultService");

module.exports.getTransactions = function getTransactions(req, res, next) {
  Default.getTransactions()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
