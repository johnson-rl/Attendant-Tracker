if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.DATABASE_URL) {
    var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
    sequelize = new Sequelize(match[5], match[1], match[2], {
        dialect:  'postgres',
        protocol: 'postgres',
        port:     match[4],
        host:     match[3],
        logging: false,
        dialectOptions: {
            ssl: true
        }
    });
    // console.log("Database URL!", process.env.DATABASE_URL)
    // // the application is executed on Heroku ... use the postgres database
    // sequelize = new Sequelize(process.env.DATABASE_URL, {
    //   dialect:  'postgres',
    //   protocol: 'postgres',
    //   logging:  console.log //false
    // })
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
