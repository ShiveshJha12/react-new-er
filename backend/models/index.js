const sequelize = require('../db'); // Adjust the path if necessary
const User = require('./user');
const Event = require('./event');

// Define associations
User.hasMany(Event, { foreignKey: 'userId' });
Event.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Event, sequelize };
