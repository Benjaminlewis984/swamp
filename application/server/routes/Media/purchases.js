const mediaManager = require('../../database/media-manager.js');
const express = require('express');
const router = express.Router();

router.get('/purchases', async (req, res, next) => {
  let accountID = req.user.acc_id;
  const results = await mediaManager.getPurchases(25, 0, accountID);

  // console.log(results);

  res.render('purchases');
});

module.exports = router;