module.exports = (sequelize, Sequelize) => {
    const Scope = sequelize.define("scopes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Scope;
  };
  
  