const express = require('express');
const router = express.Router();

router.get('/analytics', (req, res) => {
    res.render('analytics');
});

module.exports = router;