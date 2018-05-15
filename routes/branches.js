var express = require('express');
var debug = require('debug')('ex5:branches');
var router = express.Router();
const Branch = require('../model')("Branch");
/* GET branches listing. */
router.get('/', async (req, res) => {
  debug('get branches');
  try {
     if(req.query.login=="true")
      res.render('branches', {title: 'Branch List', branches: await Branch.REQUEST(),login:true});
      else
      res.render('branches', {title: 'Branch List', branches: await Branch.REQUEST(),login:false});
  } catch (err) { /*debug(`get branches failure: ${err}`);*/ }
});


module.exports = router;