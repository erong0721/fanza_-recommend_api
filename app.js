const express = require('express')
const app = express()
const {check, validationResult} = require('express-validator')
require('dotenv').config()

const RecommendController = require('./controllers/recommendController')
const PornstarController = require('./controllers/pornstarController')

/**
 * ヘルスチェック.
 */
app.get('/', async (req, res) => {
  res.json({
    result: 'ok',
  })
})

/**
 * レコメンドAPI.
 */
app.get('/fanza_wrapper_api/recommend', async (req, res) => {
  try {
    const response = await new RecommendController().get()
    res.json(response)
  } catch (error) {
    res.status(500).json(
      {
        status: 500,
        message: error.message
      }
    )
  }
})

/**
 * AV女優取得API.
 */
app.get(
  '/fanza_wrapper_api/pornstar',
  check('name')
    .isLength({ max: 100 })
    .withMessage('max 100.'),
  check('bust_low')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('bust_high')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('cup')
    .isAlpha()
    .optional({ checkFalsy: true })
    .withMessage('alpha format.'),
  check('waist_low')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('waist_high')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('hip_low')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('hip_high')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('height_low')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('height_high')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('age_low')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('age_high')
    .isNumeric()
    .optional({ checkFalsy: true })
    .withMessage('numeric format.'),
  check('blood_type')
    .isIn([
      'A', 'B', 'O', 'AB'
    ])
    .optional({ checkFalsy: true })
    .withMessage('A, B, O, AB value.'),
  check('hobby')
    .isLength({ max: 100 })
    .withMessage('max 100.'),
  check('prefectures')
    .isLength({ max: 100 })
    .withMessage('max 100.'),
  check('limit')
    .isInt({ max: 100 })
    .optional({ checkFalsy: true })
    .withMessage('int format.'),
  check('offset')
    .isInt()
    .optional({ checkFalsy: true })
    .withMessage('int format.'),
  check('order')
    .isIn([
      'name', 'bust', 'waist', 'hip', 'height', 'birthday', 'id',
      '-name', '-bust', '-waist', '-hip', '-height', '-birthday', '-id'
    ])
    .optional({ checkFalsy: true })
    .withMessage('sort value.'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json(
        {
          status: 400,
          messages: errors.errors.map((e) => `${e.param}: ${e.msg}`)
        }
      )
      return
    }

    try {
      const response = await new PornstarController().get(req.query)
      res.json(response)
    } catch (error) {
      console.error(error)
      res.status(500).json(
        {
          status: 500,
          message: error.message
        }
      )
    }
  }
)

app.listen(process.env.API_PORT || 80)