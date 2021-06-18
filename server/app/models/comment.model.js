module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    comment: {
      type: Sequelize.STRING(10000),
      allowNull: false
    }
  })

  return Comment;
};
