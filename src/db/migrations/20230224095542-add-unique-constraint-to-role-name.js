'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Roles', {
      fields: ['role_name'],
      type: 'unique',
      name: 'unique_role_name_constraint',
      collate: 'NOCASE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Roles',
      'unique_role_name_constraint',
    )
  },
}
