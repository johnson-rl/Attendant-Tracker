var Sequelize = require("sequelize");
var sequelize = new Sequelize("postgres:///attendant");
var User = sequelize.import("../models/user");
var Attendant = sequelize.import("../models/attendant");

Attendant.belongsTo(User);
User.hasMany(Attendant);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Attendant: Attendant
  }
}
