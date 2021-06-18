module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define('token', {
      token: {
          type: Sequelize.STRING,
          allowNull: false
      },
      tokenExpires : {
          type: Sequelize.DATE,
          defaultValue: sequelize.literal("CURRENT_TIMESTAMP + interval '30 min'")
      }
  }, { timestamps : true });
  return Token;
};
