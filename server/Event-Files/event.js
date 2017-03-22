'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Event.belongsTo(models.Attendant, {
          foreignKey: 'attendantId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Event;
};
