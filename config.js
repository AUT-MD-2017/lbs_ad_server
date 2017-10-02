const _ = require('lodash');


const cfg = {
  port: 3000,
  ip: '0.0.0.0',
  useFakeApi: true,

  //填写数据库连接信息，可查询数据库详情页
	username:'admin',//mysql数据库管理员
	password:'admin',//密码
	driver:'mysql',
	db_host:'127.0.0.1',//主机
	db_port: 3306,//端口
	db_name:'mobile',//数据库名
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
