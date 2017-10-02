const router = require('express').Router();
const crypto = require('crypto');
const status_code = require('../helper/status_code');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const User_location = require('../model/user_location');
const Image = require('../model/Image');

const secret = 'secretKey';

let SignUpHandler = function(req, res) {
  let email = req.body.email || undefined;
  let username = req.body.username || '';
  let password = req.body.password || undefined;

  if (email && password) {
      // check whether the email address is used
      User.findOne({
          where: {
              email: email
          }
      }).then(function(user) {
          if (user) {
              res.end(
                  status_code.ERROR_USER_SIGNUP_ACCOUNT
              );
          } else {
              let md5 = crypto.createHash('md5');
              md5.update(password);

              let passwd_code = md5.digest('hex').substr(0, 16);

              User.create({
                  email: email,
                  username: username,
                  password: passwd_code
              }).then(function(user) {
                  res.jsonp(
                      {
                        stauts_code: status_code.SUCCESS,
                        status_message: status_code.SUCCESS_MSG,  
                        'user_info': user.get('to_dict')
                      }
                  );
              });
          }
      });
  } else {
      res.end(
          status_code.ERROR_PARAM
      );
  }
};

let SignInHandler = function(req, res) {
  let email = req.body.email || undefined;
  let password = req.body.password || undefined;

  if (email && password) {
      let md5 = crypto.createHash('md5');
      md5.update(password);
      let passwd_code = md5.digest('hex').substr(0, 16);

      User.findOne({
          where: {
              email: email,
              password: passwd_code
          }
      }).then(function(user) {
          if (user) {
              let token = jwt.sign({id: user.get('id')},secret);

              res.jsonp(
                  
                  {
                    'token': token
                  }
              );
          } else {
              res.end(
                  status_code.ERROR_USER_SIGNIN_ACCOUNT
              );
          }
      })
  } else {
      res.end(
          status_code.ERROR_PARAM
      );
  }
};

let SignInfoHandler = function(req, res) {
  req.cur_user().then(function(user) {
      res.jsonp(
          status_code.SUCCESS,
          status_code.SUCCESS_MSG,
          {
              'user_info': user
          }
      );
  }, function() {
      res.sendStatus(401);
  });
}; 

let UserAddHandler = function(req, res) {
    Promise.all([
		User.create({email:'wentianl20@126.com', username:'wentianl20_2', password:'itbilu.com'}),
		User.create({email:'wentianl20@163.com', username:'wentianl20_3', password:'itbilu.com'})
	]).then(function(results){
		console.log(results[0]);
		res.set('Content-Type', 'text/html; charset=utf-8');
		res.end('create successfully :'+JSON.stringify({user_1:results[0].dataValues, user_2:results[1].dataValues}));
	}).catch(error => {
        console.log(error);
        res.end(error.toString());
    });
};

// Test create User
router.get('/create_user',UserAddHandler);  
router.post('/create_user', SignUpHandler);

// TODO
router.get('/current_user', (req, res) => {
  let token = req.query.token || undefined;
  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      /*
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
      */
      res.jsonp({
        error: 'TokenError'
      });
    }
    else {
        let id = decoded.id;
        User.findOne({
            include: [{
                model: User_location,
                where: {
                    user_id: id
                }
            },{
                model: Image,
                where: {
                    owner_type: "0"
                }
            }]
        }).then(function(user) {
            if (user) {
                res.jsonp(
                    {
                        // user
                    //   id: user.get("id"),
                    //   email: user.get("email"),
                    //   username: user.get("username"),
                      ...user.get('to_dict'),
                      ...user.get("user_location").get('to_dict'),
                      ...user.get("image").get('to_dict')
                    }
                );
            } else {
                res.end(
                    status_code.ERROR_USER_DISAPPEAR
                );
            }
        })
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
