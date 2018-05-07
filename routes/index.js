var express = require('express');
var router = express.Router();
var login=false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.post('/login', async (req, res) => {
  //var session = req.session;
  console.log("in post")
  let user;
  try {
      user = await User.findOne({username: req.body.user}).exec();
  } catch (err) {
      //debug(`Login error: ${err}`);
      //session.badLogin = "Login error";
      res.redirect('/');
      return;
  }
  if (user === null) {
      //debug(`Login no user: ${req.body.user}`);
      //session.badLogin = `User '${req.body.user}' doesn't exist`;
      res.redirect('/');
      return;
  }
  if (user.password !== req.body.password) {
      //debug(`Login wrong password: ${req.body.password}/${user.password}`);
      //session.badLogin = `Wrong password for '${req.body.user}'`;
      res.redirect('/');
      return;
  }
  //debug(`Logged to: ${user.username}`);
  //delete session.badLogin;
  /*session.userId = user.id;
  session.userName = user.username;
  session.admin = user.admin;
  session.userName = user.name;
  session.count = 0;*/
  res.redirect('/');
});
module.exports = router;
