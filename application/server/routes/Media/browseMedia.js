const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const request = require('request');
const passport_config = require('../../modules/passport-config.js');

router.get('/browse', (req, res, next) => {
  let category = req.body.category;
  if (category === undefined) {
    category = 'all';
  }
  request.post('http://0.0.0.0:3001/browse', {json: {query: req.query, user: req.user}}, (error, response, body) => {
    res.render('browse', {results: body.results});
  });
});

router.post('/browse', (req, res, next) => {
  let category = req.body.query.category;  
  let search = req.body.query.search;
  let search_array
  
  if(search == '') {
    search = undefined;
  }
  if(search != undefined) {
    search_array = search.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter( e => e.trim().length > 1 );
    search_array = [...new Set(search_array)];
    if (!(search_array.length < 1 || search == undefined)) { search = search_array; }
  }

  if (category == 'all') { category = undefined; }
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
          if(req.body.user == undefined) {
            if (idx == results.length - 1) {
              return res.status(200).send({success: true, filter: filter, results: results});
            }
          } else {
            // mediaManager.checkMediaBought(req.body.user['acc_id'], result['m_id'], (results) => {
            //   if(results != undefined) {
            //     results['bought'] == true;
            //   }
  
            //   if (idx == results.length - 1) {
            //     return res.status(200).send({success: true, filter: filter, results: results});
            //   }
            // });
            if (idx == results.length - 1) {
              return res.status(200).send({success: true, filter: filter, results: results});
            }
          }
        });
      });
    }
  });
});

module.exports = router;
