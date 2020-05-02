const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const session = req.session;
  console.log(req.cookies['connect.sid'])
  res.render('index', { title: 'Database Dashboard', user: req.user });
});

module.exports = router;