const express = require('express');
const checkoutManager = require('../../database/checkout-manager.js');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const checkout = await checkoutManager.checkoutItems(req.user.acc_id);
  if(checkout != undefined) { res.status(200).send({success: "true"}); }
  else { res.status(404).send({success: "false"}); }
});

module.exports = router;