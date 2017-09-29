const _ = require('lodash');
const faker = require('faker');
const router = require('express').Router();

const utils = require('../utils');
const { CATEGORY, PRICE_LEVEL } = require('../constants');


const ALL_CATEGORIES_VALUES = _.reduce(_.values(CATEGORY), (arr, category) => {
  return arr.concat(_.values(category));
}, []);

const {
  address, image, helpers, random, lorem, phone,
} = faker;

const createUser = () => ({
  ...helpers.userCard(),
  ...{
    avatar: image.avatar(),
  },
});

const createLocation = (options) => {
  const opts = _.assign({
    extra: false,
    categories: ALL_CATEGORIES_VALUES,
    priceLevels: _.values(PRICE_LEVEL),
    distanceBase: _.random(2000),
  }, options);

  const location = {
    id: random.uuid(),
    name: utils.formatLocationName(lorem.words()),
    category: _.toUpper(_.sample(opts.categories)),
    discount: opts.discount,
    priceLevel: _.sample(opts.priceLevels),
    distance: utils.formatDistance(
      _.random(opts.distanceBase + 1, opts.distanceBase + 200),
    ),
  };

  return opts.extra ? {
    ...location,
    hoursToday: '11:00 AM - 11:00 PM',
    address: address.streetAddress(),
    contact: phone.phoneNumberFormat(),
    website: 'www.nandos.co.nz',
    coords: {
      latitude: -36.852694,
      longitude: 174.764033,
    },
  } : location;
};

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
    ALL_CATEGORIES_VALUES : _.values(category);

  const paginator = {
    total: 50,
    page: parseInt(query.page, 10) || 1,
    perPage: parseInt(query.perPage, 10) || 20,
  };

  res.jsonp({
    ...paginator,
    items: _.times(paginator.perPage, (i) => {
      const distanceBase = (paginator.page - 1 + i) * 200;

      return createLocation({
        discount: i === 0 ? 30 : undefined,
        categories,
        distanceBase,
      });
    }),
  });
});

router.get('/location/:id', (req, res) => {
  res.jsonp({
    ...createLocation({ extra: true }),
    id: req.params.id,
  });
});

module.exports = router;
