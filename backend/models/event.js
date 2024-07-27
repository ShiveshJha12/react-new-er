// src/models/event.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust the path as necessary

class Event extends Model {}

Event.init({
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATE,
  location: DataTypes.STRING,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // The name of the table
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Event',
});

module.exports = Event;
