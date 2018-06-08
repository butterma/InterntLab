var express = require('express');
var debug = require('debug')('ex5:index');
var router = express.Router();
const User = require('../model')("User");
const Flower = require('../model')("Flower");
const Branch = require('../model')("Branch");

/* GET home page. */
router.get('/', async(req, res) => {
 if(req.query.user==null){
  debug("login=false"); 
  res.render('index',{login:false,title:'Express'});
 }
  else
  {
    debug("login=true");  
    res.render('index', {login:true,title: req.query.user, user:req.query.user});
  }    
});

router.post('/login', async (req, res) => {
    debug("in post");
  let user;
  try {
      debug(`before request: ${req.body.username}`);
      user = await User.REQUEST({username: req.body.username});
      debug("after request");
    } catch (err) {
      debug(`Error with DB request for login: ${err}`);
      res.status(500).send("Error checking user login");
      return;
  }
  if (user === null || user.length === 0) {      
    debug(`No such user: ${req.body.username}`);
    res.status(404).send("Wrong user or password");
    return;
  }
  debug(`User: ${JSON.stringify(user)}`);
  if (user[0].password !== req.body.password) {
    debug(`Wrong password: ${req.body.username}/${req.body.password} - must be ${user[0].password}`);
    res.status(404).send("Wrong user or password");
      return;
  } 
  debug("login successful");
  
  res.send("OK");
});

router.post('/logout',async(req,res)=>{
  debug("in logout post");
  res.render('index',{login:false});
});


router.post('/signUp', async (req, res) => {
  debug('add user');
  if (req.body.username === undefined || req.body.username === null || req.body.username === "")
    debug("Missing user to add!!!");
  else if (req.body.password === undefined || req.body.password === null || req.body.password === "")
    debug("Missing password for user to add!!!");
  else if (req.body.passwordRe === undefined || req.body.passwordRe === null || req.body.passwordRe === "")
    debug("Missing password repeat for user to add!!!");
  else {
    let user;
    try {
      user = await User.REQUEST({ username: req.body.username });
    } catch (err) {
      debug(`get user for adding failure: ${err}`);
    }
    if (user === null || JSON.stringify(user) == "[]")
      try {
        debug("req category: "+req.body.cat);
        await User.CREATE([req.body.username, req.body.password, req.body.cat, 1]);
        debug('User created:' + user);
      } catch (err) {
        debug("Error creating a user: " + err);
      }
    else
    {
      debug('User to be added already exists or checkin user existence failure!');
    }
  }
  res.redirect('/users/?user='+req.query.user);
});
module.exports = router;
