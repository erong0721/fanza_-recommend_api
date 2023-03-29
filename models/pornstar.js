const { Model, Op } = require('sequelize')
const DEFAULT_LIMIT = 20
const DEFAULT_OFFSET = 0

module.exports = (sequelize, DataTypes) => {
  class Pornstar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static async select(param = {}) {
      const option = {}
      if (param.name) {
        option.name = {
          [Op.like]: `%${param.name}%`,
        }
        option.ruby = {
          [Op.like]: `%${param.name}%`,
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
      const data = await this.findAll({
        where: option,
        limit: Number(param.limit) || DEFAULT_LIMIT,
        offset: Number(param.offset) || DEFAULT_OFFSET,
      })
      return data
    }

  }
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