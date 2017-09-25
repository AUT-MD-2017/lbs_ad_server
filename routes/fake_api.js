const _ = require('lodash');
const faker = require('faker');
const router = require('express').Router();

const { CATEGORY } = require('../constants');


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
  const category = CATEGORY[_.toUpper(req.query.category)];
  const categories = _.isUndefined(category) ?
    _.reduce(_.values(CATEGORY), (arr, category) => {
      return arr.concat(_.values(category));
    }, []) :
    _.values(category);

  res.jsonp({
    items: _.times(10, () => ({
      id: random.uuid(),
      name: lorem.words(),
      category: _.toUpper(_.sample(categories)),
    })),
  });
});

module.exports = router;
