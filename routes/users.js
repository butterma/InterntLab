var express = require('express');
var debug = require('debug')('ex5:users');
var router = express.Router();
const User = require('../model')("User");
/* GET users listing. */
router.get('/', async (req, res) => {
  try {
     if(req.query.user==null)
     {
      res.render('users');//, {title: 'User List', users: await User.REQUEST(),login:false,user:null});
     }
      else
      {
        debug('get users');
        let tmp=await User.REQUEST({username:req.query.user});
        res.render('users', {title: 'User List', users: await User.REQUEST(),login:true,user:tmp[0].username,category: tmp[0].category});
      }
  } catch (err) { /*debug(`get users failure: ${err}`);*/ }
});


module.exports = router;
