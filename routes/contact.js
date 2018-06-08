var express = require('express');
var debug = require('debug')('ex5:contact');
var router = express.Router();
const User=require('../model')("User");
router.get('/', async(req, res)=> {
   debug('get contact page');
   try{
   if(req.query.user==null)
    res.render('contact',{title:'contact us',login:false,user:null});  
    else{
      let tmp = await User.REQUEST({username:req.query.user});
      res.render('contact',{title:'contact us', login:true, user:tmp[0].username, category: tmp[0].category});
     
    }
  }catch(err){}

  });

  module.exports = router;