var express = require('express');
var debug = require('debug')('ex5:catalog');
var router = express.Router();
const Flower = require('../model')("Flower");

/* GET catalog listing. */
router.get('/', async (req, res) => {
  debug('get catalog');
  try {
     if(req.query.user==null)
      res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:false, user:false});
      else
      res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:true, user:true});
  } catch (err) { /*debug(`get catalog failure: ${err}`);*/ }
});

module.exports = router;