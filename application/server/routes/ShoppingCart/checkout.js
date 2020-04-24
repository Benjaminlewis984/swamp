const express = require('express');
const checkoutManager = require('../../database/checkout-manager.js');
const router = express.Router();


router.post('/checkout', (req, res) => {
  checkoutManager.checkoutItems(req.user.acc_id, (results) => {
    if(results == undefined) { res.status(404).send({success: "false"}); }
    else { res.status(200).send({success: "true"}); }
  });
});

module.exports = router;