var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Database Dashboard', user: req.user });
  console.log(req.user);
});

module.exports = router;