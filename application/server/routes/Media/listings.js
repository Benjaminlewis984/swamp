const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const axios = require('axios');
axios.defaults.withCredentials = true;

/**
 * Renders the listings page with all of the user's uploaded media content
 */
router.get('/listings', async (req, res, next) => {
  axios.post('http://0.0.0.0:3001/listings',
    req.query
  )
  .then((response) => {
    res.render('listings', {results: response.data.results});
  });
});

/**
 * Queries the database for all of your uploaded media listings using your acc_id
 * 
 * @param req.body.user.acc_id: User's acc_id
 * @return: User's uploaded media content along with their purchase count
 */
router.post('/listings', async (req, res, next) => {
  let accountID = req.body.user.acc_id;
  const results = await mediaManager.getListings(25, 0, accountID);

  if (results.length == 0) {
    return res.status(200).send({success: true, results: results});
  }
  else {
    results.forEach(async (result, idx) => {
      result.purchase_count = await mediaManager.getPurchaseCount(result.m_id);

      if(idx == results.length - 1) { return res.status(200).send({success: true, results: results}); }
    });
  }
});

module.exports = router;