const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/listings', async (req, res, next) => {
  request.post('http://0.0.0.0:3001/listings', {json: {query: req.query, user: req.user}}, (error, response, body) => {
    res.render('listings', {results: body.results});
  });
});

router.post('/listings', async (req, res, next) => {
  let accountID = req.body.user.acc_id;
  const results = await mediaManager.getListings(25, 0, accountID);

  results.forEach(async (result, idx) => {
    const userResult = await userManager.getUserFromID(result.acc_id);
    result['author_username'] = userResult[0].username;
    result.bought = 'false';
    result.preview_path = result.preview_path.substr(result.preview_path.indexOf('preview/') + 8);
    result.purchase_count = await mediaManager.getPurchaseCount(result.m_id);

    if(idx == results.length - 1) { return res.status(200).send({success: true, results: results}); }
  });
});

module.exports = router;