var express = require('express');
var router = express.Router();
const User = require('../model')("User");

/* GET users listing. */
router.get('/', async (req, res) => {
  //debug('request users');
  try {
      res.render('users', {title: 'User List', users: await User.REQUEST()});
  } catch (err) { /*debug(`get users failure: ${err}`);*/ }
});

module.exports = router;
