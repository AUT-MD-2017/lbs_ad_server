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

const Image = sequelize.define('image',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    unique: true
    // references: {
    //     model: 'User',
    //     key: 'id'
    // }
  },
  owner_id: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  owner_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urls: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
  getterMethods: {
    to_dict: function() {
      return {
        urls: this.urls
      }
    }
  }
});

module.exports = Image;