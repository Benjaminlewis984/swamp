const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();

/**
 * Renders the listings page with all of the user's uploaded media content
 */
router.get('/listings', async (req, res) => {
  res.render('listings', {username: req.user.username})
});

/**
 * Queries the database for all of your uploaded media listings using your acc_id
 * 
 * @param req.body.user.acc_id: User's acc_id
 * @return: User's uploaded media content along with their purchase count
 */
router.post('/listings', async (req, res) => {
  let username = req.body.username;

  const results = await mediaManager.getListings(25, 0, username);
  if (results.length == 0) {
    return res.status(200).send({success: "true", results: results});
  }
  else {
    results.forEach(async (result, idx) => {
      result.purchase_count = await mediaManager.getPurchaseCount(result.m_id);

      if(idx == results.length - 1) { return res.status(200).send({success: "true", results: results}); }
    });
  }
});

router.delete('/listings', async (req, res) => {
  const media = req.body.m_id;
  const deleted = await mediaManager.deleteMedia(media);
  if(deleted != undefined) {
    return res.status(200).send({success: "true"});
  } else { return res.status(404).send({success: "false"}); }
});

module.exports = router;