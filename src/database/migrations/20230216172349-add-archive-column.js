'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('opportunities', 'archived', {
          type: Sequelize.DataTypes.BOOLEAN,
		  defaultValue: false
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('opportunities', 'archived', { transaction: t })
      ]);
    });
  }
};
