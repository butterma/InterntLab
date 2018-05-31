var express = require('express');
var debug = require('debug')('ex5:users');
var router = express.Router();
const User = require('../model')("User");
/* GET users listing. */
router.get('/', async (req, res) => {
  debug('get users');
  try {
     if(req.query.user==null)
     {
      debug('get users');
      res.render('users', {title: 'User List', users: await User.REQUEST(),login:false,user:null});
      debug('get users');
     }
      else
      {
        debug('get users');
        res.render('users', {title: 'User List', users: await User.REQUEST(),login:true,user:req.query.user});
        debug('get users');
      }
  } catch (err) { /*debug(`get users failure: ${err}`);*/ }
});


module.exports = router;
