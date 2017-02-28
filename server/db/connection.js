const Sequelize = require("sequelize");
const sequelize = new Sequelize("postgres:///attendant");
const User = sequelize.import("../models/user");
const Attendant = sequelize.import("../models/attendant");
const Event = sequelize.import("../models/events")

Attendant.belongsTo(User);
User.hasMany(Attendant);
Event.belongsTo(User);
Event.belongsTo(Attendant);
Attendant.hasMany(Event);
User.hasMany(Event);

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  models: {
    User: User,
    Attendant: Attendant,
    Event: Event
  }
}
