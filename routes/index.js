var express = require('express');
const isAuthenticated = require('./is-authenticated')

var router = express.Router();

/* GET home page. */
router.get('/', isAuthenticated, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
