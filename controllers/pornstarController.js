const RecommendApi = require('../apis/recommendApi')
const {check, validationResult} = require('express-validator')

class PornstarController {

  async get() {
    const res = await new RecommendApi().execute()
    return {
      row: res?.result?.items?.map((item) => {
        return {
          title: item.title,
          review: item.review,
          URL: item.URL,
          affiliateURL: item.affiliateURL,
          imageURL: item.imageURL,
          sampleImageURL: item.sampleImageURL,
          sampleMovieURL: item.sampleMovieURL,
          prices: item.prices,
        }
      }) || []
    }
  }
}

module.exports = PornstarController