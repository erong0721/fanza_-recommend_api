'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pornstars', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      ruby: {
        type: Sequelize.STRING,
      },
      bust: {
        type: Sequelize.STRING,
      },
      cup: {
        type: Sequelize.STRING,
      },
      waist: {
        type: Sequelize.STRING,
      },
      hip: {
        type: Sequelize.STRING,
      },
      height: {
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.STRING,
      },
      blood_type: {
        type: Sequelize.STRING,
      },
      hobby: {
        type: Sequelize.STRING,
      },
      prefectures: {
        type: Sequelize.STRING,
      },
      imageURL_small: {
        type: Sequelize.STRING(1000),
      },
      imageURL_large: {
        type: Sequelize.STRING(1000),
      },
      listURL_digital: {
        type: Sequelize.STRING(1000),
      },
      listURL_monthly_premium: {
        type: Sequelize.STRING(1000),
      },
      listURL_mono: {
        type: Sequelize.STRING(1000),
      },
      listURL_rental: {
        type: Sequelize.STRING(1000),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pornstars');
  }
};