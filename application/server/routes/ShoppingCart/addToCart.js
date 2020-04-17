const express = require('express');
const router = express.Router();
const cartManager = require('../../database/cart-manager.js');

router.get('/cart', (req, res, next) => {
  cartManager.getFromCartByID(req.user.reg_id, (results) => {
    if(results == undefined) {
        res.send('There are no listings in your shopping cart at this time.');
    } else {
      results.forEach((result, idx) => {
        console.log(result);
      })
    }
  });
})

router.post('/cart', (req, res, next) => {
  cartManager.addToCart(req.body.approved_id, req.user.acc_id);
  res.status(200);
  res.send({success: "true"});
})

module.exports = router;