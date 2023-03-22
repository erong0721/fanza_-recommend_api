const axios = require('axios')
const client = axios.create({
  baseURL: 'https://api.dmm.com',
  responseType: 'json',
  timeout: 15000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})
client.interceptors.request.use(
  (request) => {
    request.params.api_id = process.env.FANZA_API_ID
    request.params.affiliate_id = process.env.FANZA_AFFILIATE_ID
    return request
  },
  (err) => {
    return Promise.reject(err.message)
  }
)

client.interceptors.response.use(
  (response) => {
    const data = response.data
    return data
  },
  (err) => {
    return Promise.reject(err.message)
  }
)

module.exports = client