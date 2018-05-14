var express = require('express');
var debug = require('debug')('lab5:index');
var router = express.Router();
const User = require('../model')("User");
/* GET home page. */
router.get('/', function(req, res, next) {
 if(req.query.login=="true")  
    res.render('index', {login:true,title: 'Express'});
  else
    res.render('index',{login:false,title:'Express'});
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
  login=true;
  res.send("OK");
});
module.exports = router;
