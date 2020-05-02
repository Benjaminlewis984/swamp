const raml2html = require('raml2html');
const configWithDefaultTheme = raml2html.getConfigForTheme();
const express = require('express');
const router = express.Router();

router.get('/documentation', (req, res) => {
  raml2html.render('./documentation/source.raml', configWithDefaultTheme).then((result) => {
    res.set('Content-Type', 'text/html');
    res.send(result);
  }, (error) => {
    console.log(error);
  });
});

module.exports = router;