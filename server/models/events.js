module.exports = function(sequelize, Sequelize){
  var model = sequelize.define("event", {
    title: Sequelize.STRING,
    date: Sequelize.STRING,
  });

  return model;
}
