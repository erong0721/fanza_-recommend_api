const models = require('../models')

class SnsController {

  async get(param = {}) {
    const sns = await models.Sns.select(param)

    return {
      row: [...new Set(sns.map((s) => s.name))].map((name) => {
        return {
          name: name,
          twitter: sns.find((o) => o.name == name && o.type == 'twitter')?.url,
          instagram: sns.find((o) => o.name == name && o.type == 'instagram')?.url,
        }
      }) || []
    }
  }
}

module.exports = SnsController