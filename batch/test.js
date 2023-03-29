const models = require('../models')
require('dotenv').config()

const main = async () => {
  console.log('Start.', new Date())
  const all = await models.Pornstar.select()
  models.sequelize.close()
  console.log(all)
  console.log('End.', new Date())
}

main()