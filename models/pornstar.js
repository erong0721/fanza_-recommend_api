'use strict';
const {
  Model
} = require('sequelize');
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
      try{
        const data = await this.findAll()
        return(data)
      }
      catch(e){
        console.error(e)
        return(false)
      }
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
  });
  return Pornstar;
};