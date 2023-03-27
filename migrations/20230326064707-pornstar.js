'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('pornstar', {
    id: { type: 'string', primaryKey: true },
    name: 'string',
    ruby: 'string',
    bust: 'string',
    cup: 'string',
    waist: 'string',
    hip: 'string',
    height: 'string',
    birthday: 'string',
    blood_type: 'string',
    hobby: 'string',
    prefectures: 'string',
    imageURL_small: {type: 'string', length: 1000},
    imageURL_large: {type: 'string', length: 1000},
    listURL_digital: {type: 'string', length: 1000},
    listURL_monthly_premium: {type: 'string', length: 1000},
    listURL_mono: {type: 'string', length: 1000},
    listURL_rental: {type: 'string', length: 1000},
  });
};

exports.down = function(db) {
  return db.dropTable('pornstar');
};

exports._meta = {
  "version": 1
};
