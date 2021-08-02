module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define("like", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['userId', 'postId']
    }]
  })

  return Like;
};