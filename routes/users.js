var express = require('express');
var router = express.Router();
const User = require('../model')("User");
var debug = require('debug')('lab5:users');
/* GET users listing. */
router.get('/', async (req, res) => {
  //debug('request users');
  try {
     if(req.query.login=="true")
      res.render('users', {title: 'User List', users: await User.REQUEST(),login:true});
      else
      res.render('users', {title: 'User List', users: await User.REQUEST(),login:false});
  } catch (err) { /*debug(`get users failure: ${err}`);*/ }
});

router.post('/signUp', async (req, res) => {
  debug('add user');
  /*if (!req.session.admin)
      debug("Must be admin to add a user!!!");*/
 if (req.body.username === undefined || req.body.username === null || req.body.username === "")
      debug("Missing user to add!!!");
  else if (req.body.password === undefined || req.body.password === null || req.body.password === "")
      debug("Missing password for user to add!!!");
  else if (req.body.passwordRe === undefined || req.body.passwordRe === null || req.body.passwordRe === "")
      debug("Missing password repeat for user to add!!!");
  else {
      let user;
      try {
          user = await User.REQUEST({username: req.body.username});
      } catch (err) {
          debug(`get user for adding failure: ${err}`);
      }
      if (user === null)
          try {
              await User.CREATE([req.body.username, req.body.password, req.body.cat,1]);
              debug('User created:' + user);
          } catch (err) {
              debug("Error creating a user: " + err);
          }
      else
          debug('User to be added already exists or checkin user existence failure!');
  }
  res.redirect('/users');
});
module.exports = router;
