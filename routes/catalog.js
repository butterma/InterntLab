var express = require('express');
var debug = require('debug')('ex5:catalog');
var router = express.Router();
const Flower = require('../model')("Flower");
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

/* GET catalog listing. */
router.get('/', async (req, res) => {
  debug('get catalog');
  try {
     if(req.query.login=="true")
      res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:true});
      else
      res.render('catalog', {title: 'Flower List', catalog: await Flower.REQUEST(),login:false});
  } catch (err) { /*debug(`get catalog failure: ${err}`);*/ }
});
router.post('/createFlower', upload.single('image'), async (req, res) => {
  debug('add flower');
  debug(JSON.stringify(req.file));
  debug(JSON.stringify(req.files));
  debug(JSON.stringify(req.body.file));
  if (req.body.name === undefined || req.body.name === null || req.body.name === "")
    debug("Missing flower name to add!!!");
    if (req.body.color === undefined || req.body.color === null || req.body.color === "")
    debug("Missing color to add!!!");
    if (req.body.image === undefined || req.body.image === null || req.body.image === "")
    debug("Missing image to add!!!");
    if (req.body.cost === undefined || req.body.cost === null || req.body.cost === "")
    debug("Missing cost to add!!!");
  else {
    let flower;
    try {
      flower = await Flower.REQUEST({ name: req.body.name, color: req.body.color, cost: req.body.cost, image: req.body.image });
    } catch (err) {
      debug(`get flower for adding failure: ${err}`);
    }
    if (flower === null || JSON.stringify(flower) == "[]")
      try {
        await Flower.CREATE([req.body.name, req.body.color, req.body.cost, req.body.image]);
        debug('flower created:' + flower);
      } catch (err) {
        debug("Error creating a flower: " + err);
      }
    else
    {
      debug('flower to be added already exists or checkin flower existence failure!');
    }
  }
  res.redirect('/flowers');
});

module.exports = router;