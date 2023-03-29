const puppeteer = require('puppeteer')
const models = require('../models')
const { setTimeout } = require('timers/promises')
require('dotenv').config()

const main = async () => {
  console.log('Start.', new Date())
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // twitter
  // https://www.talenttwit.com/cat/13_0/
  // https://www.talenttwit.com/cat/13_29/
  const talenttwit = 'https://www.talenttwit.com/cat/13_[NO]/'
  const _twit = []
  const twit = []
  for await (i of [...Array(30)].map((_, i) => i)) {
    await setTimeout(1000)
    await page.goto(talenttwit.replace('[NO]', i))
    const res = await page.$$eval('body > div.wrapper > div > a', list => list.map(data => data.href))
    _twit.push(res)
  }
  for await (t of _twit.flat()) {
    await setTimeout(1000)
    await page.goto(t)
    const name = await page.$eval('body > div.wrapper > div > h2:nth-child(2)', item => item.textContent.replace('ツイッター', '').replace('(AV女優)', ''))
    const url = await page.$eval('body > div.wrapper > div > div:nth-child(3) > a', item => item.href)
    twit.push({
      type: 'twitter',
      name: name,
      url: url,
    })
  }
  await models.Sns.bulkCreate(twit)

  // https://www.talentinsta.com/cat/13_0/
  // https://www.talentinsta.com/cat/13_4/
  const talentinsta = 'https://www.talentinsta.com/cat/13_[NO]/'
  const _insta = []
  const insta = []
  for await (i of [...Array(5)].map((_, i) => i)) {
    await setTimeout(1000)
    await page.goto(talentinsta.replace('[NO]', i))
    const res = await page.$$eval('body > div.wrapper > div > p > a', list => list.map(data => data.href))
    _insta.push(res)
  }
  for await (t of _insta.flat()) {
    await setTimeout(1000)
    await page.goto(t)
    const name = await page.$eval('body > div.wrapper > div > h2:nth-child(2)', item => item.textContent.replace('インスタグラム', ''))
    const url = await page.$eval('body > div.wrapper > div > div:nth-child(3) > a', item => item.href)
    insta.push({
      type: 'instagram',
      name: name,
      url: url,
    })
  }
  await models.Sns.bulkCreate(insta)

  await browser.close()
  console.log('End.', new Date())
}


main()