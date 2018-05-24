var express = require('express');
var debug = require('debug')('ex5:contact');
var router = express.Router();
router.get('/', function(req, res) {
   debug('get contact page');
   if(req.query.login=="true")
    res.render('contact',{title:'contact us',login:true});  
    else
    res.render('contact',{title:'contact us',login:false});
  });

  module.exports = router;