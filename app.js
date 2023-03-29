const express = require('express')
const app = express()
const {check, validationResult} = require('express-validator')
require('dotenv').config()

const RecommendController = require('./controllers/recommendController')
const PornstarController = require('./controllers/PornstarController')

app.get('/', async (req, res) => {
  res.json({
    result: 'ok',
  })
})

app.get('/fanza_wrapper_api/recommend', async (req, res) => {
  const response = await new RecommendController().get()
  res.json(response)
})

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

  async (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()) {
      res.status(400).json(
        {
          status: 400,
          messages: errors.errors.map((e) => {
            return {
              param: e.param,
              message: e.message
            }
          })
        }
      )
      return
    }

    const response = await new PornstarController().get()
    res.json(response)
  }
)

app.listen(process.env.API_PORT || 80)