'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.User, {onDelete: 'CASCADE'});
        Event.belongsTo(models.Attendant, {onDelete: 'CASCADE'});
      }
    }
  });
  return Event;
};
