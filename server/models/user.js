module.exports = function(sequelize, Sequelize){
  var model = sequelize.define("user", {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING
  });

  return model;
}
