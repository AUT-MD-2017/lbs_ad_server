const router = require('express').Router();
const crypto = require('crypto');
const statusCode = require('../helper/status_code');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const userLocation = require('../model/user_location');
const Image = require('../model/Image');

const secret = 'secretKey';

const SignUpHandler = function signUp(req, res) {
  const email = req.body.email || undefined;
  const username = req.body.username || '';
  const password = req.body.password || undefined;

  if (email && password) {
    // check whether the email address is used
    User.findOne({
      where: {
        email,
      },
    }).then((user) => {
      if (user) {
        res.end(
          statusCode.ERROR_USER_SIGNUP_ACCOUNT,
        );
      } else {
        const md5 = crypto.createHash('md5');
        md5.update(password);

        const passwdCode = md5.digest('hex').substr(0, 16);

        User.create({
          email,
          username,
          password: passwdCode,
        }).then((user) => {
          res.jsonp(
            {
              stauts_code: statusCode.SUCCESS,
              status_message: statusCode.SUCCESS_MSG,
              user_info: user.get('to_dict'),
            },
          );
        });
      }
    });
  } else {
    res.end(
      statusCode.ERROR_PARAM,
    );
  }
};

const SignInHandler = function signIn(req, res) {
  const email = req.body.email || undefined;
  const password = req.body.password || undefined;

  if (email && password) {
    const md5 = crypto.createHash('md5');
    md5.update(password);
    const passwdCode = md5.digest('hex').substr(0, 16);

    User.findOne({
      where: {
        email,
        password: passwdCode,
      },
    }).then((user) => {
      if (user) {
        const token = jwt.sign({ id: user.get('id') }, secret);

        res.jsonp(

          {
            token,
          },
        );
      } else {
        res.end(
          statusCode.ERROR_USER_SIGNIN_ACCOUNT,
        );
      }
    });
  } else {
    res.end(
      statusCode.ERROR_PARAM,
    );
  }
};


router.get('/create_user', SignInHandler);
router.post('/create_user', SignUpHandler);

// TODO
router.get('/current_user', (req, res) => {
  const token = req.query.token || undefined;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      /*
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
      */
      res.jsonp({
        error: 'TokenError',
      });
    } else {
      const id = decoded.id;
      User.findOne({
        include: [{
          model: userLocation,
          where: {
            user_id: id,
          },
        }, {
          model: Image,
          where: {
            owner_type: '0',
          },
        }],
      }).then((user) => {
        if (user) {
          res.jsonp(
            {
              // user
              //   id: user.get("id"),
              //   email: user.get("email"),
              //   username: user.get("username"),
              ...user.get('to_dict'),
              ...user.get('user_location').get('to_dict'),
              ...user.get('image').get('to_dict'),
            },
          );
        } else {
          res.end(
            statusCode.ERROR_USER_DISAPPEAR,
          );
        }
      });
    }
  });
});

// TODO
router.get('/user/login', SignInHandler);

router.post('/user/login', SignInHandler);

// TODO
router.get('/user/logout', (req, res) => {
  res.jsonp({});
});

// TODO
router.get('/search', (req, res) => {
  res.jsonp({});
});

module.exports = router;
