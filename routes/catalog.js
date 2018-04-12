var express = require('express');
var router = express.Router();

/* GET catalog page */
router.get('/', function(req, res, next) {
  res.send('catalog',data);
});

module.exports = router;