'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Question belongs to One Quiz, but a Question can have many Choices
      models.Question.belongsTo(models.Quiz)
      models.Question.hasMany(models.Choice)
    }
  };
  Question.init({
    question: DataTypes.STRING,
    quizId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};