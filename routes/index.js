const express = require('express')
const isAuthenticated = require('./is-authenticated')

const router = express.Router()

/* GET home page. */
router.get('/', isAuthenticated, (req, res, _) => {
  res.render('index', { csrfToken: req.csrfToken(), title: 'Express' })
})

module.exports = router
