'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Todo model
     * @param {number} userId - Id of To-Do owner
     * @param {string} title - Title of To-Do
     * @param {string} description - Description of To-Do
     * @param {string} priority - Priority of To-Do
     * @returns {object} Todo model
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