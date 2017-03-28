'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Attendant, {as: 'attendants'});
        User.hasMany(models.Event, {as: 'events'});
      }
    }
  });
  return User;
};
