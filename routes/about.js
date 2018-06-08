var express = require('express');
var debug = require('debug')('ex5:about');
var router = express.Router();
const User=require('../model')("User");
router.get('/', async(req, res)=> {
   debug('get contact page');
   try{
   if(req.query.user==null)
    res.render('about',{title:'about',login:false,user:null});  
    else{      let user=await User.REQUEST({username:req.query.user});
      let tmp = await User.REQUEST({username:req.query.user});    
      res.render('about',{title:'about',login:true, user:tmp[0].username, category: tmp[0].category});
    }
  }catch(err){}

  });

  module.exports = router;