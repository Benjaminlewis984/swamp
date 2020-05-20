const express = require('express');
const checkoutManager = require('../../database/checkout-manager.js');
const router = express.Router();

/**
 * Uses the user's acc_id to access their shopping cart in the database.
 * Then, adds each of their media content in the shopping cart to the checkout table.
 * Once added, the media content tuple is deleted from the shopping cart table.
 * 
 * @param req.user.acc_id: User's acc_id
 * @return: "true" or "false" depending on whether the entire shopping cart is checked out
 */
router.post('/checkout', async (req, res) => {
  const checkout = await checkoutManager.buyAllInCart(req.user.acc_id);
  if(checkout != undefined) { res.status(200).send({success: "true"}); }
  else { res.status(404).send({success: "false"}); }
});

module.exports = router;