const express = require('express')
const localPassport = require('../local-passport')

const router = express.Router()

router.get('/new', (req, res) => {
  res.render('session/new')
})

router.post('/destroy', (req, res) => {
  req.logout()
  res.redirect('/session/new')
})

router.post(
  '/',
  localPassport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/session/new'
  })
)

module.exports = router
