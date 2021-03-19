module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("post", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    text: {
      type: Sequelize.STRING(10000),
      allowNull: false
    }
  });

  return Post;
};
