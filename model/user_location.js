const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.db_name,
  config.username,
  config.password,
  {
    dialect: config.driver,
    host: config.db_host,
    port: config.db_port,
    pool:
    {
      max: 5,
      min: 0,
      idle: 30000,
    },
  },
);

const userLocation = sequelize.define('user_location', {
  user_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    unique: true,
    // references: {
    //     model: 'User',
    //     key: 'id'
    // }
  },
  lat: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false,
  },
  lng: {
    type: Sequelize.DECIMAL(10, 8),
    allowNull: false,
  },
  updated_at: {
    type: Sequelize.NOW,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  getterMethods: {
    to_dict() {
      return {
        lat: this.lat,
        lng: this.lng,
      };
    },
  },
});

module.exports = userLocation;
