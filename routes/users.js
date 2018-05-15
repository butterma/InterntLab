var express = require('express');
var debug = require('debug')('ex5:users');
var router = express.Router();
const User = require('../model')("User");
/* GET users listing. */
router.get('/', async (req, res) => {
  debug('get users');
  try {
     if(req.query.login=="true")
      res.render('users', {title: 'User List', users: await User.REQUEST(),login:true});
      else
      res.render('users', {title: 'User List', users: await User.REQUEST(),login:false});
  } catch (err) { /*debug(`get users failure: ${err}`);*/ }
});


module.exports = router;
