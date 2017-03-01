if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.HEROKU_POSTGRESQL_AMBER_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_AMBER_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize("postgres:///attendant")
  }
}

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
