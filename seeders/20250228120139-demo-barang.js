// "use strict";

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//      */
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   },
// };

"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const items = [];

    for (let i = 0; i < 20; i++) {
      items.push({
        kode_barang: `BRG-${faker.string.alphanumeric(5).toUpperCase()}`,
        nama_barang: faker.commerce.productName(),
        stock: faker.number.int({ min: 10, max: 100 }),
        harga: faker.number.int({ min: 50000, max: 500000 }),
        diskon: faker.number.int({ min: 0, max: 50 }),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    await queryInterface.bulkInsert("barangs", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("barangs", null, {});
  },
};
