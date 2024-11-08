"use strict";

/**
 * Получить список последних транзакций
 *
 * returns List
 **/
exports.getTransactions = function () {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = [
      {
        id: 10,
        type: "in",
        category: {
          name: "Restaurant",
          id: 1,
        },
        value: 4877,
        status: "Consumed",
      },
      {
        id: 10,
        type: "in",
        category: {
          name: "Restaurant",
          id: 1,
        },
        value: 4877,
        status: "Consumed",
      },
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
