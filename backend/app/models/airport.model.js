module.exports = (sequelize, Sequelize) => {
    const airport = sequelize.define("airports", {
      name: {
        type: Sequelize.STRING
      },
      postal: {
        type: Sequelize.STRING
      },
      initial: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      }
    }, { timestamps: false});
  
    return airport;
  };