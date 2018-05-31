var express = require('express');
var debug = require('debug')('ex5:branches');
var router = express.Router();
const Branch = require('../model')("Branch");
/* GET branches listing. */
router.get('/', async (req, res) => {
  debug('get branches');
  try {
     if(req.query.user==null)
      res.render('branches', {title: 'Branch List', branches: await Branch.REQUEST(),login:false,stam:false});
      else
      res.render('branches', {title: 'Branch List', branches: await Branch.REQUEST(),login:true,stam:true});
  } catch (err) { /*debug(`get branches failure: ${err}`);*/ }
});


module.exports = router;