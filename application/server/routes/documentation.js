var raml2html = require('raml2html');
var configWithDefaultTheme = raml2html.getConfigForTheme();

var express = require('express');
var router = express.Router();

router.get('/documentation', (req, res, next) => {
  raml2html.render('./documentation/source.raml', configWithDefaultTheme).then((result) => {
    res.set('Content-Type', 'text/html');
    res.send(result);
  }, (error) => {
    console.log(error);
  });
});

module.exports = router;