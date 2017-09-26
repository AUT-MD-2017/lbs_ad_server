const _ = require('lodash');
const faker = require('faker');
const router = require('express').Router();

const utils = require('../utils');
const { CATEGORY, PRICE_LEVEL } = require('../constants');


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
  const { query } = req;

  const category = CATEGORY[_.toUpper(query.category)];
  const categories = _.isUndefined(category) ?
    _.reduce(_.values(CATEGORY), (arr, category) => {
      return arr.concat(_.values(category));
    }, []) :
    _.values(category);
  const priceLevels = _.values(PRICE_LEVEL);

  const paginator = {
    total: 25,
    page: query.page || 1,
    perPage: query.perPage || 10,
  };

  res.jsonp({
    ...paginator,
    items: _.times(paginator.perPage, (i) => {
      const distanceBase = (paginator.page - 1 + i) * 200;

      return {
        id: random.uuid(),
        name: utils.formatLocationName(lorem.words()),
        category: _.toUpper(_.sample(categories)),
        priceLevel: _.sample(priceLevels),
        distance: utils.formatDistance(
          _.random(distanceBase + 1, distanceBase + 200),
        ),
      };
    }),
  });
});

module.exports = router;
