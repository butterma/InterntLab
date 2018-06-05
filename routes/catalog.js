var express = require('express');
var debug = require('debug')('ex5:catalog');
var router = express.Router();
const Flower = require('../model')("Flower");

/* GET catalog listing. */
router.get('/', async (req, res) => {
  try {
    if(req.query.user==null)
    {
     res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:false,user:null});
    }
     else
     {
       debug('get catalog');
       let tmp = await User.REQUEST({username:req.query.user});
       res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(), login:true, user:tmp[0].username, category: tmp[0].category});
     }
 } catch (err) {  }
});

module.exports = router;