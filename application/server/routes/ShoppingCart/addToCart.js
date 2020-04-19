const express = require('express');
const router = express.Router();
const cartManager = require('../../database/cart-manager.js');
const userManager = require('../../database/user-manager.js');
const passport_config = require('../../modules/passport-config.js');

router.get('/cart', passport_config.checkUser, (req, res, next) => {
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

router.post('/cart', passport_config.checkAuth, passport_config.checkUser, (req, res, next) => {
  cartManager.addToCart(req.body.m_id, req.user.acc_id);
  res.status(200);
  res.send({success: "true"});
})

module.exports = router;