const models = require('../models')

class PornstarController {

  async get(param = {}) {
    const pornstar = await models.Pornstar.select(param)
    const names = pornstar.map((p) => p.name)
    const sns = await models.Sns.select(
      {
        names: names,
        limit: names.length * 2, // 2つのSNSが存在するため
      }
    )

    return {
      row: pornstar.map((item) => {
        const s = sns.filter((s) => s.name == item.name)
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
          age: item.get('age'),
          blood_type: item.blood_type,
          hobby: item.hobby,
          prefectures: item.prefectures,
          imageURL_small: item.imageURL_small,
          imageURL_large: item.imageURL_large,
          listURL_digital: item.listURL_digital,
          listURL_monthly_premium: item.listURL_monthly_premium,
          listURL_mono: item.listURL_mono,
          listURL_rental: item.listURL_rental,
          twitter: s.find((o) => o.type == 'twitter')?.url,
          instagram: s.find((o) => o.type == 'instagram')?.url,
        }
      }) || []
    }
  }
}

module.exports = PornstarController