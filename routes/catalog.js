var express = require('express');
var debug = require('debug')('ex5:catalog');
var router = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (re, file, cb) {
    cb(null,'flower' + Date.now() +'.' + file.mimetype.slice(6))}})
var upload = multer({ storage: storage });
const Flower = require('../model')("Flower");
const User=require('../model')("User");
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