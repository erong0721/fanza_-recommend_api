const client = require('../libs/fanza.client')

/**
 * @link https://affiliate.dmm.com/api/v3/itemlist.html
 */
class RecommendApi {
  constructor() {
    this.path = '/affiliate/v3/ItemList'
    this.param = {
      site: 'FANZA',
      service: 'digital',
      floor: 'videoa',
      hits: 10,
      output: 'json',
    }
  }

  async execute() {
    return await client.get(this.path, { params: this.param })
  }
}
module.exports = RecommendApi