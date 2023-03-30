const { Model, Op } = require('sequelize')
const DEFAULT_LIMIT = 2000
const DEFAULT_OFFSET = 0
module.exports = (sequelize, DataTypes) => {
  class Sns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async select(param = {}) {
      const data = await this.findAll({
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
    if (param.names) {
      option.name = {
        [Op.or]: param.names,
      }
    }
    if (param.name) {
      option.name = {
        [Op.like]: `%${param.name}%`,
      }
    }
    if (param.type) {
      option.type = {
        [Op.eq]: param.type,
      }
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

  Sns.init({
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sns',
    timestamps: false,
  })
  return Sns
}