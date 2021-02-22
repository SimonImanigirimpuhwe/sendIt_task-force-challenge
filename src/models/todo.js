'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  };
  Todo.init({
    userId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    priority: {
      type: DataTypes.STRING,
      validate: {
        isIn: { args: [['LOW', 'MEDIUM', 'HIGH']], msg: 'Priority can either be Low, Medium or High'}
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};