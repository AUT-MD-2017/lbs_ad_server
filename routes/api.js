const router = require('express').Router();
const crypto = require('crypto');
const statusCode = require('../helper/status_code');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const userLocation = require('../model/user_location');
const Image = require('../model/image');

const secret = 'secretKey';

const SignUpHandler = function signUp(req, res) {
  const email = req.body.email || undefined;
  const username = req.body.username || '';
  const password = req.body.password || undefined;
  const lat = req.body.lat || undefined;
  const lng = req.body.lat || undefined;
  const urls = req.body.urls || undefined;

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
        const passwdCode = md5.digest('hex').substr(0, 16)

        User.create({
          email,
          username,
          password: passwdCode,
        }).then((user) => {
          const ID = user.get('id');

          Image.create({
            owner_id: ID,
            owner_type: 0,
            urls,
          }).catch(error => {
            res.end("create Image error: " + error.toString());
          });

          userLocation.create({
            user_id: ID,
            lat,
            lng,
          }).catch(error => {
            res.end("create userLocation error: " + error.toString());
          });;

          res.jsonp(
            {
              stauts_code: statusCode.SUCCESS,
              status_message: statusCode.SUCCESS_MSG,
            },
          );

        }).catch(error => {
          res.end("create tables error: " + error.toString());
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
  const email = req.param('email') || undefined;
  const password = req.param('password') || undefined;

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


router.get('/create_user', SignUpHandler);
router.post('/create_user', SignUpHandler);

router.get('/current_user', (req, res) => {
  const token = req.query.token || undefined;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
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

// TODO
router.get('/user/:id/bookmarks', (req, res) => {
  res.jsonp({

  });
});

// TODO
router.get('/locations', (req, res) => {
  res.jsonp({
    
  });
});

// TODO
router.get('/location/:id', (req, res) => {
  res.jsonp({
    
  });
});

// TODO
router.post('/location/:id/bookmark', (req, res) => {
  res.jsonp({
  
  });
});

// TODO
router.delete('/location/:id/bookmark', (req, res) => {
  res.jsonp({
    
  });
});

module.exports = router;
