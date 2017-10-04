const _ = require('lodash');


const cfg = {
  port: 3000,
  ip: '0.0.0.0',
  useFakeApi: false,

  // the database config
  username: 'admin',
  password: 'admin',
  driver: 'mysql',
  db_host: '127.0.0.1',
  db_port: 3306,
  db_name: 'mobile',
};

let localCfg;
/* eslint-disable */
try {
  localCfg = require('./local_config');
} catch (err) {
  localCfg = {};
}
/* eslint-enable */

module.exports = _.merge(cfg, localCfg);
