const RecommendApi = require('../apis/recommendApi')

class RecommendController {

  async get() {
    const res = await new RecommendApi().execute()
    return res.result.items.map((item) => {
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
    })
  }
}

module.exports = RecommendController