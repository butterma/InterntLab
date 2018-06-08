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


router.post('/createBranch', async (req, res) => {
  debug('add branch');
  if (req.body.name === undefined || req.body.name === null || req.body.name === "")
  debug("Missing branch name to add!!!");
  else if (req.body.address === undefined || req.body.address === null || req.body.address === "")
  debug("Missing branch address to add!!!");
  else if (req.body.workers_amount === undefined || req.body.workers_amount === null || req.body.workers_amount === "")
  debug("Missing branch workers_amount to add!!!");
  else if (req.body.established_at === undefined || req.body.established_at === null || req.body.established_at === "")
  debug("Missing branch established_at to add!!!");
  else {
  let branch;
  try {
    branch = await Branch.REQUEST({ name: req.body.name, address: req.body.address, workers_amount: req.body.workers_amount, established_at: req.body.established_at });
  } catch (err) {
    debug(`get branch for adding failure: ${err}`);
  }
  if (branch === null || JSON.stringify(branch) == "[]")
    try {
      await branch.CREATE([req.body.name, req.body.address, req.body.workers_amount, req.body.established_at]);
      debug('branch created:' + branch);
    } catch (err) {
      debug("Error creating a branch: " + err);
    }
  else
  {
    debug('branch to be added already exists or checkin branch existence failure!');
  }
  }
  res.redirect('/branches');
});

router.post('/deleteBranch', async (req, res) => {
  debug('delete branch');
  if (req.body.name === undefined || req.body.name === null || req.body.name === "")
    debug("Missing branch name to delete!!!");
  else {
    let branch;
    try {
      branch = await Branch.REQUEST({ name: req.body.name });
    } catch (err) {
      debug(`get branch for delete failure: ${err}`);
    }
    if (branch != null || JSON.stringify(branch) != "[]")
      try {
        await Branch.DELETE([req.body.name]);
        debug('branch deleted:' + branch);
      } catch (err) {
        debug("Error deleting a branch: " + err);
      }
    else
    {
      debug('failure delete branch!');
    }
  }
  res.redirect('/branches');
});

module.exports = router;