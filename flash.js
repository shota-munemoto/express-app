const connectFlash = require('connect-flash')()

const flash = () => (req, res, next) =>
  connectFlash(req, res, () => {
    const render = res.render
    res.render = function() {
      res.locals.flash = req.flash()
      render.apply(res, arguments)
    }
    next()
  })

module.exports = flash
