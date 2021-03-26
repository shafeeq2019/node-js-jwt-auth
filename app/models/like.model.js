module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("Like", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  })

  return Like;
};
