const router = require('express').Router();

const cfg = require('../config');
const manifest = require('../dist/manifest.json');

const assetUrl = (name) => {
  return `/static/${manifest[name]}`;
};

const User = require('../model/user');
const userLocation = require('../model/user_location');
const Image = require('../model/Image');

User.hasOne(userLocation, { foreignKey: 'user_id' });
User.hasOne(Image, { foreignKey: 'owner_id' });

router.use('/api', cfg.useFakeApi ? require('./fake_api') : require('./api'));

router.use('*', (req, res) => {
  res.render('index', {
    assetUrl,
    pageName: 'index',
  });
});

module.exports = router;
