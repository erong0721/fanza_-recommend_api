const models = require('../models')

class PornstarController {

  async get(param = {}) {
    const res = await models.Pornstar.select(param)

    return {
      row: res.map((item) => {
        return {
          id: item.id,
          name: item.name,
          ruby: item.ruby,
          bust: item.bust,
          cup: item.cup,
          waist: item.waist,
          hip: item.hip,
          height: item.height,
          birthday: item.birthday,
          blood_type: item.blood_type,
          hobby: item.hobby,
          prefectures: item.prefectures,
          imageURL_small: item.imageURL_small,
          imageURL_large: item.imageURL_large,
          listURL_digital: item.listURL_digital,
          listURL_monthly_premium: item.listURL_monthly_premium,
          listURL_mono: item.listURL_mono,
          listURL_rental: item.listURL_rental,
        }
      }) || []
    }
  }
}

module.exports = PornstarController