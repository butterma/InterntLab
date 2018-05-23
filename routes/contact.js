var express = require('express');
var debug = require('debug')('ex5:contact');
var router = express.Router();
app.get('/contact', function(req, res) {
   debug('get contact page');
    res.render('contact');    
  });

  module.exports = router;