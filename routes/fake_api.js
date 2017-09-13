const _ = require('lodash')
const faker = require('faker');
const router = require('express').Router();


const { image, helpers, random, lorem } = faker;

const createUser = () => ({
  ...helpers.userCard(),
  ...{
    avatar: image.avatar(),
  },
});

router.get('/current_user', (req, res) => {
  res.jsonp(createUser());
});

router.get('/user/login', (req, res) => {
  res.jsonp({
    token: random.uuid(),
  });
});

router.get('/user/logout', (req, res) => {
  res.jsonp({
    ok: true,
  });
});

router.get('/locations', (req, res) => {
  res.jsonp({
    items: _.times(10, () => ({
      name: lorem.sentence(),
      desc: lorem.sentences(),
    })),
  });
});

module.exports = router;
