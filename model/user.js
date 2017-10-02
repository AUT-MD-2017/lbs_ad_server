const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.db_name,
  config.username,
  config.password,
  {
    'dialect': config.driver,
    'host': config.db_host,
    'port': config.db_port,
    'pool':
    {
        max: 5,
        min: 0,
        idle: 30000
    }
  }
);

const User = sequelize.define('user',{
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  created_at: {
    type: Sequelize.NOW
  },
  updated_at: {
    type: Sequelize.NOW
  }
}, {
  timestamps: false,
  freezeTableName: true,
  getterMethods: {
    to_dict: function() {
      return {
        id: this.id,
        email: this.email,
        username: this.username
      }
    }
  }
});

module.exports = User;