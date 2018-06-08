var express = require('express');
var debug = require('debug')('ex5:users');
var router = express.Router();
const User = require('../model')("User");

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    debug('here');
     if(req.query.user==null || JSON.stringify(req.query.user) == '[]')
     {       
      debug('here2');
      res.render('users', {title: 'User List', users: await User.REQUEST(), login:false, user:null});
      debug('after here');
     }
      else
      {
        debug('get users, user = ' + req.query.user);
        let tmp = await User.REQUEST({username:req.query.user});
        debug(tmp[0].username);
        res.render('users', {title: 'User List', users: await User.REQUEST(), login:true, user:tmp[0].username, category: tmp[0].category});
      }
  } catch (err) { 
    debug(`get users failure: ${err}`); }
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
        debug('User created:' +JSON.stringify(req.body.username));
        debug('by: ' +JSON.stringify(req.query.user));
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

router.post('/deleteUser', async (req, res) => {
  debug('delete user');
  if (req.body.username === undefined || req.body.username === null || req.body.username === "")
    debug("Missing user to delete!!!");
  else {
    let currentUser;
    try {
      currentUser = await User.REQUEST({ username: req.body.username });
    } catch (err) {
      debug(`get user for delete failure: ${err}`);
    }
    if (currentUser != null && JSON.stringify(currentUser) != "[]")
      try {
        await User.DELETE([req.body.username, req.body.password, req.body.cat, 1]);
        debug('User deleted:' + currentUser);
      } catch (err) {
        debug("Error deleting a user: " + err);
      }
    else
    {
      debug('failure delete user!');
    }
  }
  
  res.redirect('/users/?user='+req.query.user);
});

router.post('/updateUser', async (req, res) => {
  debug('update user');
  if (req.body.username === undefined || req.body.username === null || req.body.username === "")
    debug("Missing username to update!!!");
  else if (req.body.category === undefined || req.body.category === null || req.body.category === "")
    debug("Missing category to update!!!");
  else {
    let user;
    try {
      user = await User.REQUEST({ username: req.body.username });
    } catch (err) {
      debug(`get user for adding failure: ${err}`);
    }
    if (user != null || JSON.stringify(user) != "[]")
      try {
        debug('user category to update: '+req.body.category);
        await User.UPDATE([req.body.username, req.body.password, req.body.category, 1]);
        debug('User updated:' + user);
      } catch (err) {
        debug("Error updating a user: " + err);
      }
    else
    {
      debug('User to be updated is not exist!');
    }
  }
  res.redirect('/users/?user='+ req.query.user);
});

module.exports = router;
