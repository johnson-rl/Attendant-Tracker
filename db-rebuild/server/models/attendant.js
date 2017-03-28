'use strict';
module.exports = function(sequelize, DataTypes) {
  var Attendant = sequelize.define('Attendant', {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Attendant.belongsTo(models.User, {onDelete: 'CASCADE'});
        Attendant.hasMany(models.Event, {as: 'events'})
      }
    }
  });
  return Attendant;
};
