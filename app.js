const express = require('express')
const app = express()
const { check } = require('express-validator')
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
    .withMessage('name is max 100.'),
  check('bust_low')
    .isNumeric()
    .withMessage('bust_low is number.'),
  check('bust_high')
    .isNumeric()
    .withMessage('bust_high is number.'),
  check('cup')
    .isAlpha()
    .withMessage('cup is alpha.'),
  check('waist_low')
    .isNumeric()
    .withMessage('waist_low is number.'),
  check('waist_high')
    .isNumeric()
    .withMessage('waist_high is number.'),
  check('hip_low')
    .isNumeric()
    .withMessage('hip_low is number.'),
  check('hip_high')
    .isNumeric()
    .withMessage('hip_high is number.'),
  check('height_low')
    .isNumeric()
    .withMessage('height_low is number.'),
  check('height_high')
    .isNumeric()
    .withMessage('height_high is number.'),
  check('age_low')
    .isNumeric()
    .withMessage('age_low is number.'),
  check('age_high')
    .isNumeric()
    .withMessage('age_high is number.'),
  check('blood_type')
    .isIn([
      'A', 'B', 'O', 'AB'
    ])
    .withMessage('blood_type is A,B,O,AB.'),
  check('hobby')
    .isLength({ max: 100 })
    .withMessage('hobby is max 100.'),


  async (req, res) => {
    const response = await new PornstarController().get()
    res.json(response)
  }
)

app.listen(process.env.API_PORT || 80)