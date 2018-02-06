const express = require('express')
const localPassport = require('../local-passport')

const router = express.Router()

router.get('/new', (req, res) => {
  res.render('session/new', { csrfToken: req.csrfToken() })
})

router.post('/destroy', (req, res) => {
  req.logout()
  res.redirect('/session/new')
})

router.post(
  '/',
  localPassport.authenticate('local', {
    successRedirect: '/',
    successFlash: true,
    failureRedirect: '/session/new',
    failureFlash: true
  })
)

module.exports = router
