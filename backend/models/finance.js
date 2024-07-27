module.exports = (sequelize, DataTypes) => {
    const Finance = sequelize.define('Finance', {
      type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    });
  
    return Finance;
  };
  