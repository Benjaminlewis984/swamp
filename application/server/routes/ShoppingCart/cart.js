const express = require('express');
const router = express.Router();
const cartManager = require('../../database/cart-manager.js');
const userManager = require('../../database/user-manager.js');
const passport_config = require('../../modules/passport-config.js');

/**
 * Retrieves all of the user's media content, using their acc_id, in their shopping cart and renders it on the page
 * 
 * @param req.user.acc_id: User's acc_id
 * @return: User's media content in their shopping cart
 */
router.get('/cart', passport_config.checkUser, async (req, res) => {
  if(req.user) {
    const cart = await cartManager.getFromCartByID(req.user.acc_id);
    if(cart != undefined) {
      cart.forEach(async (result, idx) => {
        const user = await userManager.getUserFromID(result.acc_id);
        result['author_username'] = user[0].username;

        if(idx == cart.length - 1) {
          return res.render('cart', {results: cart});
        }
    });
    } else { return res.status(200).send('There are no listings in your shopping cart at this time.'); }
  } else { return res.status(403).send({success: "false"}); }
});

/**
 * Adds a media content to logged in user's shopping cart
 * 
 * @param req.user.acc_id: User's acc_id
 * @param req.body.m_id: The m_id of the media content to be put in shopping cart
 * @return: "true" or "false" depending on whether the media content is successfully added to the shopping cart
 */
router.post('/cart', passport_config.checkAuth, passport_config.checkUser, async (req, res) => {
  const add = await cartManager.addToCart(req.body.m_id, req.user.acc_id);
  if(add != undefined) { return res.status(200).send({success: "true"}); }
  else { return res.status(403).send({success: "false"}); }
});

/**
 * Deletes a media content in logged in user's shopping cart
 * 
 * @param req.user.acc_id: User's acc_id
 * @param req.body.m_id: The m_id of the media content to be deleted from shopping cart
 * @return: "true" or "false" depending on whether the media content is successfully deleted from the shopping cart
 */
router.delete('/cart', async (req, res) => {
  const deleted = await cartManager.deleteFromCart(req.body.m_id, req.user.acc_id);
  if(deleted != undefined) { return res.status(200).send({sucess: "true"}); }
  else { return res.status(404).send({success: "false"}); }
});

module.exports = router;