"use strict";
const bcrypt = require("bcrypt");
const { v4: uuid4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pass = "wkwkwkwk";

    await queryInterface.bulkInsert("users", [
      {
        account_uuid: `USR-${uuid4()}`,
        name: "raffii",
        email: "raffi@gmail.com",
        password: `${await bcrypt.hash(pass, 5)}`,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
