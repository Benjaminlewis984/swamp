const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const request = require('request');

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
  if (search == '') { search = undefined; }

  filter = { status: 'approved', category: category, title: search };
  
  mediaManager.getMediaFilter(25, 0, filter, (results) => {
    if (results.length == 0) {
      res.status(400);
      res.send({success: true, filter: filter, results: results});
    }
    else {
      results.forEach((result, idx) => {
        userManager.getUserFromID(result.author_id, (user) => {
          result["author_username"] = user[0].username;

          if (idx == results.length - 1) {
            res.status(200);
            res.send({success: true, filter: filter, results: results});
          }
        });
      });
    }
  });
});

module.exports = router;
