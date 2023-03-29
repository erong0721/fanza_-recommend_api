const { Model, Op } = require('sequelize')
const DEFAULT_LIMIT = 20
const DEFAULT_OFFSET = 0

module.exports = (sequelize, DataTypes) => {
  /**
   * PornstarModel.
   */
  class Pornstar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    /**
     * 検索.
     * @param {*} param パラメータ
     * @returns 検索結果
     */
    static async select(param = {}) {
      const data = await this.findAll({
        attributes: [
          'id',
          'name',
          'ruby',
          'bust',
          'cup',
          'waist',
          'hip',
          'height',
          'birthday',
          'blood_type',
          'hobby',
          'prefectures',
          'imageURL_small',
          'imageURL_large',
          'listURL_digital',
          'listURL_monthly_premium',
          'listURL_mono',
          'listURL_rental',
          [sequelize.literal(`YEAR(CURRENT_DATE()) - YEAR(STR_TO_DATE(birthday, '%Y-%m-%d'))`), 'age'],
        ],
        where: createWhere(param),
        limit: Number(param.limit) || DEFAULT_LIMIT,
        offset: Number(param.offset) || DEFAULT_OFFSET,
        order: createOrder(param),
      })
      return data
    }
  }

  /**
   * Where整形.
   * @param {*} param パラメータ
   * @returns where option
   */
  const createWhere = (param) => {
    const option = {}
    if (param.name) {
      option[Op.or] = {
        name: {
          [Op.like]: `%${param.name}%`,
        },
        ruby: {
          [Op.like]: `%${param.name}%`,
        },
      }
    }
    if (param.bust_low) {
      option.bust = {
        [Op.gte]: param.bust_low,
      }
    }
    if (param.bust_high) {
      option.bust = {
        ...(option.bust || {}),
        [Op.lte]: param.bust_high,
      }
    }
    if (param.cup) {
      option.cup = {
        [Op.eq]: param.cup,
      }
    }
    if (param.waist_low) {
      option.waist = {
        [Op.gte]: param.waist_low,
      }
    }
    if (param.waist_high) {
      option.waist = {
        ...(option.waist || {}),
        [Op.lte]: param.waist_high,
      }
    }
    if (param.hip_low) {
      option.hip = {
        [Op.gte]: param.hip_low,
      }
    }
    if (param.hip_high) {
      option.hip = {
        ...(option.hip || {}),
        [Op.lte]: param.hip_high,
      }
    }
    if (param.blood_type) {
      option.blood_type = {
        [Op.eq]: param.blood_type,
      }
    }
    if (param.hobby) {
      option.hobby = {
        [Op.like]: `%${param.hobby}%`,
      }
    }
    if (param.prefectures) {
      option.prefectures = {
        [Op.like]: `%${param.prefectures}%`,
      }
    }
    if (param.age_low) {
      option.age_low = sequelize.literal(`YEAR(CURRENT_DATE()) - YEAR(STR_TO_DATE(birthday, '%Y-%m-%d')) >= ${param.age_low}`)
    }
    if (param.age_high) {
      option.age_high = sequelize.literal(`YEAR(CURRENT_DATE()) - YEAR(STR_TO_DATE(birthday, '%Y-%m-%d')) <= ${param.age_high}`)
    }
    return option
  }

  const createOrder = (param) => {
    const order = param.order
    if (!order) {
      return [['id', 'ASC']]
    }
    const s = order.split('-')
    const sort = s.length == 2 ? 'DESC' : 'ASC'
    const key = s.slice(-1)[0]
    return [[key, sort]]
  }

  /**
   * DB定義.
   */
  Pornstar.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        len: [0, 255],
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    ruby: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    bust: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    cup: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    waist: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    hip: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    height: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    birthday: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    blood_type: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    hobby: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    prefectures: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 255],
      }
    },
    imageURL_small: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000],
      }
    },
    imageURL_large: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000],
      }
    },
    listURL_digital: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000],
      }
    },
    listURL_monthly_premium: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000],
      }
    },
    listURL_mono: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000],
      }
    },
    listURL_rental: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 1000],
      }
    }
  }, {
    sequelize,
    modelName: 'Pornstar',
    timestamps: false,
  })
  return Pornstar
}