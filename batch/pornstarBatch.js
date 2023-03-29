const PornstarApi = require('../apis/pornstarApi')
const fs = require('fs')
const connection = require('../libs/mysql.client')
const OFFSET_TMP = './tmp/offset.log'
require('dotenv').config()

const main = async () => {
  console.log('Start.', new Date())
  // offset
  let offset = 1;
  try {
    offset = Number(fs.readFileSync(OFFSET_TMP, 'utf-8'))
  } catch (error) {
    //特に何もしない
  }

  const param = { hits: 100, offset: offset }
  console.log('param', param)
  const res = await new PornstarApi().execute(param)
  if (!res.result) {
    // API呼び出し数上限に達した場合
    throw new Error('No Response.')
  }

  if (res.result.result_count === 0) {
    // 取得件数が0件の場合、offset初期化
    console.log('res.result.result_count === 0')
    offset = 1
  } else {
    // 登録処理
    const con = await connection()
    for await (actor of res.result.actress) {
      const sql = `
        INSERT INTO pornstars
          (id, name, ruby, bust, cup, waist, hip, height, birthday, blood_type, hobby, prefectures, imageURL_small, imageURL_large, listURL_digital, listURL_monthly_premium, listURL_mono, listURL_rental)
        VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          ruby = VALUES(ruby),
          bust = VALUES(bust),
          cup = VALUES(cup),
          waist = VALUES(waist),
          hip = VALUES(hip),
          height = VALUES(height),
          birthday = VALUES(birthday),
          blood_type = VALUES(blood_type),
          hobby = VALUES(hobby),
          prefectures = VALUES(prefectures),
          imageURL_small = VALUES(imageURL_small),
          imageURL_large = VALUES(imageURL_large),
          listURL_digital = VALUES(listURL_digital),
          listURL_monthly_premium = VALUES(listURL_monthly_premium),
          listURL_mono = VALUES(listURL_mono),
          listURL_rental = VALUES(listURL_rental)
      `
      const values = [
        actor.id || '',
        actor.name || '',
        actor.ruby || '',
        actor.bust || '',
        actor.cup || '',
        actor.waist || '',
        actor.hip || '',
        actor.height || '',
        actor.birthday || '',
        actor.blood_type || '',
        actor.hobby || '',
        actor.prefectures || '',
        actor.imageURL?.small || '',
        actor.imageURL?.large || '',
        actor.listURL?.digital || '',
        actor.listURL?.monthly_premium || '',
        actor.listURL?.mono || '',
        actor.listURL?.rental || '',
      ]
      const [result] = await con.execute(sql, values)
    }
    await con.end()
    offset += 100
  }

  fs.writeFileSync(OFFSET_TMP, offset.toString(), 'utf-8')
  console.log('End.', new Date())
}


main();