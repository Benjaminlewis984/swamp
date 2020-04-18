const express = require('express');
const router = express.Router();
const cartManager = require('../../database/cart-manager.js');
const userManager = require('../../database/user-manager.js');

router.get('/cart', (req, res, next) => {
  cartManager.getFromCartByID(req.user.acc_id, (results) => {
    if(results == undefined) {
      res.send('There are no listings in your shopping cart at this time.');
    } else {
      results.forEach((result, idx) => {
         userManager.getUserFromID(result.acc_id, (user) => {
           result["author_username"] = user[0].username;
  
           if (idx == results.length - 1) {
             res.render('cart', {results: results});
           }
         });
      })
    }
  });
})

router.post('/cart', (req, res, next) => {
  console.log(req.body)
  cartManager.addToCart(req.body.m_id, req.user.acc_id);
  res.status(200);
  res.send({success: "true"});
})

module.exports = router;