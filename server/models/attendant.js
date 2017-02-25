module.exports = function(sequelize, Sequelize){
  var model = sequelize.define("attendant", {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
  });

  return model;
}
