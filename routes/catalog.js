var express = require('express');
var debug = require('debug')('ex5:catalog');
var router = express.Router();
const Flower = require('../model')("Flower");
/* GET catalog listing. */
router.get('/', async (req, res) => {
  debug('get catalog');
  try {
     if(req.query.login=="true")
      res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:true});
      else
      res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:false});
  } catch (err) { /*debug(`get catalog failure: ${err}`);*/ }
});


module.exports = router;