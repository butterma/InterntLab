var express = require('express');
var debug = require('debug')('ex5:index');
var router = express.Router();var multer  = require('multer');
var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (re, file, cb) {
    cb(null,'flower' + Date.now() +'.' + file.mimetype.slice(6))}})
var upload = multer({ storage: storage });
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
    if (currentUser != null || JSON.stringify(currentUser) != "[]")
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

router.post('/createFlower', upload.single('image'), async (req, res) => {
  debug('add flower');
  if (req.body.name === undefined || req.body.name === null || req.body.name === "")
    debug("Missing flower name to add!!!");
  else if (req.body.color === undefined || req.body.color === null || req.body.color === "")
    debug("Missing color to add!!!");
  else if (req.body.cost === undefined || req.body.cost === null || req.body.cost === "")
    debug("Missing cost to add!!!");
  else {
    let flower;
    try {
      flower = await Flower.REQUEST({ name: req.body.name, color: req.body.color, cost: req.body.cost, image: req.file.path.slice(6)});
    } catch (err) {
      debug(`get flower for adding failure: ${err}`);
    }
    if (flower === null || JSON.stringify(flower) == "[]")
      try {
        await Flower.CREATE([req.body.name, req.body.color, req.body.cost, req.file.path.slice(6)]);
        debug('flower created:' + flower);
      } catch (err) {
        debug("Error creating a flower: " + err);
      }
    else
    {
      debug('flower to be added already exists or checkin flower existence failure!');
    }
  }
  res.redirect('/?user='+req.query.user);
});

router.post('/deleteFlower', async (req, res) => {
  debug('delete flower');
  if (req.body.name === undefined || req.body.name === null || req.body.name === "")
    debug("Missing flower to delete!!!");
  else {
    let flower;
    try {
      flower = await Flower.REQUEST({ name: req.body.name });
    } catch (err) {
      debug(`get flower for delete failure: ${err}`);
    }
    if (flower != null || JSON.stringify(flower) != "[]")
      try {
        await Flower.DELETE([req.body.name]);
        debug('flower deleted:' + flower);
      } catch (err) {
        debug("Error deleting a flower: " + err);
      }
    else
    {
      debug('failure delete flower!');
    }
  }
  res.redirect('/flowers/?user='+req.query.user);
});

module.exports = router;
