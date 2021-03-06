'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Posts.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    countLike: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    countComment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'posts',
    paranoid: false,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['id', 'slug']
      },
      {
        name: 'content_index',
        fields: ['id', 'slug']
      }
    ]
  });
  return Posts;
};