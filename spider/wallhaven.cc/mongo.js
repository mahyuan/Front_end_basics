const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const dbName = 'wallhaven'
// const url = 'mongodb://localhost:27017/wallhaven'
// const url = 'mongodb://admin:123456@localhost:27017'
// dburl = 'mongodb://{user}:{password}@{host}:{port}'


class MongoDb {
  constructor(/* {url, username, password } */) {
    this.url =  'mongodb://localhost:27017/wallhaven'
    // const dbName = 'wallhaven'
    // this.dbName = dbName
    // this.username = username
    // this.password = password
    this.db = mongoose.connect(this.url)
    this.Thumb = null
    this.initModel()
  }

  initModel() {
    const thumbSchema =  new Schema({
      id: String,
      tag: String,
      thumb: String,
      fullSrc: String,
      full: String,
      width: String,
      height: String,
      like: String,
      created: { type: Date, default: Date.now },
      updated: { type: Date, default: Date.now },
    })
    this.Thumb = mongoose.model('Thumb', thumbSchema, 'thumb')
  }
  insertData(data) {
    return new Promise((resolve, rejcet) => {
      if(Array.isArray(data)) {
        this.Thumb.insertMany(data, {}, (err, res) => {
          if(err) throw err
          console.log('insert array successfull');
          resolve(res)
        })

      } else {
        this.Thumb.create(data, {}, (err, res) => {
          if(err) throw err
          console.log('insert data successfull', res);
          resolve(res)
        })
      }

    })
  }

  find(filter = {}) {
    return new Promise((resolve, rejcet) => {
      this.Thumb.find(filter).exec((err, result) => {
        if(err) {
          console.error(e);
        }
        resolve(result)
      })
    })
  }

  update(filter, data) {
    this.Thumb.update(filter, data, (err, result) => {
      if(err) console.error(err);
    })
  }

  remove(filter) {
    this.Thumb.remove(filter, (err, result) => {
      if(err) console.error(err);
    })
  }
}

module.exports = MongoDb
