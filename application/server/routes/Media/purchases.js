const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const request = require('request');

/**
 * Renders the listings page with all of the user's bought media content
 */
router.get('/purchases', async (req, res, next) => {
  request.post('http://0.0.0.0:3001/purchases', {json: {query: req.query, user: req.user}}, (error, response, body) => {
    res.render('purchases', {results: body.results});
  });
});

/**
 * Selects all the media content, that you've purchased, from the database and returns them
 * 
 * @param req.body.user.acc_id: User's acc_id
 * @return: All media content that was bought by the user.
 */
router.post('/purchases', async (req, res, next) => {
  let accountID = req.body.user.acc_id;
  const results = await mediaManager.getPurchases(25, 0, accountID);

  results.forEach(async (result, idx) => {
    const userResult = await userManager.getUserFromID(result.acc_id);
    result['author_username'] = userResult[0].username;
    result.preview_path = result.preview_path.substr(result.preview_path.indexOf('preview/') + 8);

    if(idx == results.length - 1) { return res.status(200).send({success: true, results: results}); }
  });
});

module.exports = router;