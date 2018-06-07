var express = require('express');
var debug = require('debug')('ex5:branches');
var router = express.Router();
const Branch = require('../model')("Branch");
const User=require("../model")("User");
/* GET branches listing. */
router.get('/', async (req, res) => {
  try {
     if(req.query.user==null)
     {
      res.render('branches', {title: 'Branch List', branches: await Branch.REQUEST(),login:false,user:null});
     }
      else
      {
        debug('user =' + req.query.user);  
        let tmp = await User.REQUEST({username:req.query.user});
        debug('user =' + tmp[0].username);  
        res.render('branches', {title: 'Branch List', branches: await Branch.REQUEST(), login:true, user:tmp[0].username, category: tmp[0].category});
      }
      
  } catch (err) { /*debug(`get branches failure: ${err}`);*/ }
});


module.exports = router;