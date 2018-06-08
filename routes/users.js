var express = require('express');
var debug = require('debug')('ex5:users');
var router = express.Router();
const User = require('../model')("User");

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    debug('here');
     if(req.query.user==null || JSON.stringify(req.query.user) == '[]')
     {       
      debug('here2');
      res.render('users', {title: 'User List', users: await User.REQUEST(), login:false, user:null});
      debug('after here');
     }
      else
      {
        debug('get users, user = ' + req.query.user);
        let tmp = await User.REQUEST({username:req.query.user});
        debug(tmp[0].username);
        res.render('users', {title: 'User List', users: await User.REQUEST(), login:true, user:tmp[0].username, category: tmp[0].category});
      }
  } catch (err) { 
    debug(`get users failure: ${err}`); }
});

module.exports = router;
