/* eslint-disable no-unused-vars */
const Service = require('./Service');

const categories = [
  { id: 1, name: 'Ресторан' },
  { id: 2, name: 'Транспорт' },
  { id: 3, name: 'Одежда' },
  { id: 4, name: 'Жилье' },
  { id: 5, name: 'Животные' },
  { id: 6, name: 'Маркетплейсы' },
  { id: 7, name: 'Красота и здоровье' },
];

/**
 * Получить список последних транзакций
 *
 * returns List
 * */
const getTransactions = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  new Promise((resolve, reject) => {
    try {
      resolve(
        Service.successResponse(
          new Array(50).fill(0).map(() => ({
            id: Math.round(Math.random() * 10000),
            type: ['in', 'out'][Math.round(Math.random())],
            category: categories[Math.round(Math.random() * (categories.length - 1))],
            value: Math.round(Math.random() * 5000),
            status: 'Consumed',
          })),
        ),
      );
    } catch (e) {
      reject(Service.rejectResponse(e.message || 'Invalid input', e.status || 405));
    }
  });

module.exports = {
  getTransactions,
};
