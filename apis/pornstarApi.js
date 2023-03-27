const client = require('../libs/fanza.client')

/**
 * @link https://affiliate.dmm.com/api/v3/actresssearch.html
 */
class PornstarApi {
  constructor() {
    this.path = '/affiliate/v3/ActressSearch'
    this.param = {
      output: 'json',
    }
  }

  // TODO バリデーション
  async execute(param = {}) {
    return await client.get(this.path, { params: { ...this.param, ...param } })
  }
}
module.exports = PornstarApi