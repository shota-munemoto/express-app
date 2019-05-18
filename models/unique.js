const unique = (modelName, attributeName) => async (value, next) => {
  const Model = require('../models')[modelName]
  const query = { [attributeName]: value }
  const model = await Model.findOne({ where: query, attributes: ['id'] })
  if (model) {
    next(`${modelName} ${attributeName} is already in use`)
  } else {
    next()
  }
}

module.exports = unique
