const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js')

router.get('/approve', passport_config.checkAuthAdmin, (req, res, next) => {
  mediaManager.getMediaFromStatus("pending", (results) => {
    if(results == undefined) {
      res.send("No media is pending for approval");
    } else {
      results.forEach((result, idx) => {
        userManager.getUserFromID(result.acc_id, (user) => {
          result["author_username"] = user[0].username;

          if (idx == results.length - 1) {
            res.render('approve', {results: results});
          }
        });
      });
    }
  });
});

router.post('/approve', (req, res, next) => {
  mediaManager.approveMedia(req.body.id, req.user.admin_id);
  res.status(200);
  res.send({success: "true"});
});

router.post('/reject', (req, res, next) => {
  mediaManager.rejectMedia(req.body.id, req.user.admin_id);
  res.status(400);
  res.send({success: "true"});
});

module.exports = router;
