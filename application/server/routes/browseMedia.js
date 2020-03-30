var mediaManager = require('../database/media-manager.js');
var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/browse', (req, res, next) => {
  let category = req.body.category;
  if (category === undefined) {
    category = 'all';
  }
  request.post('http://0.0.0.0:3001/browse', {json: req.query}, (error, response, body) => {
    res.render('browse', {results: body.results});
  });
});

router.post('/browse', (req, res, next) => {
  let category = req.body.category;
  let search = req.body.search;

  if (category == 'all') { category = undefined; }
  if (search.length == 0) { search = undefined; }

  filter = { status: 'approved', category: category, title: search };

  mediaManager.getMediaFilter(25, 0, filter, (results) => {
    results.forEach((result, idx) => {
      userManager.getUserFromID(result.author_id, (user) => {
        result["author_username"] = user[0].username;

        if (idx == results.length - 1) {
          res.status(200);
          res.send({success: true, filter: filter, results: results});
        }
      });
    });
  });
});

module.exports = router;
