# fanza_wrapper_api

FANZAのWeb APIのWrapper API。

## SetUp

```bash
# 環境に応じて環境変数を編集
cp .env.sample .env
```

| ENV | VAL|
| :---:   | :---:   |
| API_PORT | APIのPort|
| FANZA_API_ID | FANZAアプリID|
| FANZA_AFFILIATE_ID | FANZAアフィリエイトID|
| MYSQL_HOST | MYSQLホスト名|
| MYSQL_DB | MYSQL DB名|
| MYSQL_USER | MYSQLユーザー名|
| MYSQL_PASSWORD | MYSQLパスワード|

```bash
# node.js@16.x setup済みと仮定
node install -g yarn pm2
yarn install
pm2 start app.js
```

https://pm2.keymetrics.io/

## Batch

FANZAの情報をWeb API経由でDBに格納。
高頻度でアクセスするとアクセス上限数に引っかかるため、ローカルストレージに格納する。

### SetUpda

database.json編集

```config/config.json
{
  "development": {
    "username": "DBユーザー",
    "password": "DBパスワード"
    "database": "fanza",
    "host": "DBホスト名",
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "DBユーザー",
    "password": "DBパスワード"
    "database": "fanza",
    "host": "DBホスト名",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "DBユーザー",
    "password": "DBパスワード"
    "database": "fanza",
    "host": "DBホスト名",
    "dialect": "mysql",
    "logging": false
  }
}
```

https://sequelize.org/

```bash
# DB作成
yarn db:create
# テーブル作成
yarn db:migrate
```

#### AV女優取り込みバッチ

##### 実行コマンド

```bash
node batch/pornstarBatch.js
```

FANZA APIは連続実行するとレスポンスを返却しなくなるため、実行頻度を考慮する必要がある。

下記は5分置きに実行する例
```cron
*/5 * * * * cd ~/fanza_recommend_api; node batch/pornstarBatch.js >> /var/log/fanza_recommend_api/pornstarBatch.log 2>&1
```

 - 前回実行時のOffsetをキャッシュしているため、実行ごとに異なるoffset（違う実行結果）を返却するようになっている。
 - 全女優を取得したら、最初から検索し直し、変更があった女優情報を更新する
 - 削除されたAV女優対応はできていない
