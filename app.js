const express = require('express')
const app = express()
require('dotenv').config()

const RecommendController = require('./controllers/recommendController')

app.get('/', async (req, res) => {
  res.json({
    result: 'ok',
  })
})

app.get('/api/recommend', async (req, res) => {
  const response = await new RecommendController().get()
  res.json(response)
})

app.listen(80)