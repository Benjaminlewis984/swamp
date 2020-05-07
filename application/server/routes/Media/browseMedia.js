const cartManager = require('../../database/cart-manager.js');
const checkoutManager = require('../../database/checkout-manager.js');
const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();

/**
 * Renders the results page and also sends, in JSON, all the approved media content
 * 
 * @param req.body.category: Category of search query. Defaults to 'all'
 * @return: All the approved media content
 */
router.get('/browse', (req, res, next) => {
  res.render('browse');
});

/**
 * Extracts necessary information from the body. The information sent 
 * is then used to filter out the database results to find
 * media content that meets the requirements.
 * 
 * @param req.body.query.category: Category filter
 * @param req.body.query.search: Search filter
 * @param req.body.query.page: Page of the browse
 * @return: Returns the 
 */
router.post('/browse', async (req, res, next) => {
  let category = ''
  switch(req.body.category) {
    case 'all':
      category = undefined
      break;
    case 'document':
      category = 1;
      break;
    case 'image':
      category = 2;
      break;
    case 'video':
      category = 3;
      break;
    case 'audio':
      category = 4;
      break;
    default:
      category = undefined;
  }
  
  let search = req.body.search;
  let search_array

  let page = req.body.page;
  if (req.body.page == undefined || req.body.page <= 0) {
    page = 1;
  }

  if(search == '') {
    search = undefined;
  }
  if(search != undefined) {
    search_array = search.replace(/[^A-Za-z0-9]/g, ' ').split(' ').filter( e => e.trim().length > 1 );
    search_array = [...new Set(search_array)];
    if (!(search_array.length < 1 || search == undefined)) { search = search_array; }
  }

  filter = { status: 'approved', category: category, search: search };
  
  const results = await mediaManager.getMediaFilter(25, 25 * (page - 1), filter);
  if (results.length == 0) {
    return res.status(200).send({success: true, filter: filter, results: results});
  } else {
    results.forEach(async (result, idx) => {
      const userResult = await userManager.getUserFromID(result.acc_id);
      result.author_username = userResult[0].username;
      result.author_profile_path = userResult[0].profile_path;
      result.bought = 'false';
      
      if(req.user != undefined) {
        const bought = await checkoutManager.checkMediaInCheckout(req.user.acc_id, result['m_id']);
        if(bought != undefined) { result.bought = 'true'; }
        if(idx == results.length - 1) { return res.status(200).send({success: true, filter: filter, results: results}); }
      }

      if(idx == results.length - 1) { return res.status(200).send({success: true, filter: filter, results: results}); }
    });
  }
});

module.exports = router;
