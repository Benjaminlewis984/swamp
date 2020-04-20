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
  let search_params = req.body.search;
  let search_array

  if(search_params != undefined) {
    search_array = search_params.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter( e => e.trim().length > 1 )
  }

  if (category == 'all') { category = undefined; }
  if (search_array.length < 1) { search = undefined; } else { search = search_array; }

  filter = { status: 'approved', category: category, search: search };
  
  mediaManager.getMediaFilter(25, 0, filter, (results) => {
    if (results.length == 0) {
      res.status(400);
      res.send({success: true, filter: filter, results: results});
    }
    else {
      results.forEach((result, idx) => {
        userManager.getUserFromID(result.acc_id, (user) => {
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
