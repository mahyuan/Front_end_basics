const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const dbName = 'wallhaven'
const url = 'mongodb://localhost:27017/wallhaven'
// const url = 'mongodb://admin:123456@localhost:27017'
// dburl = 'mongodb://{user}:{password}@{host}:{port}'


class MongoDb {
  constructor({url, dbName, username, password}) {
    this.url = url
    this.dbName = dbName
    this.username = username
    this.password = password
    this.db = mongoose.connect(this.url)
    this.Thumb = null
    this.initModel()
  }

  initModel() {
    const thumbSchema =  new Schema({
      id: { type: Number, min: 1},
      name: { type: String, default: ''}
    })
    this.Thumb = mongoose.model('Thumb', thumbSchema, 'thumb')
  }
  insertData(data) {
    if(Array.isArray(data)) {
      this.Thumb.insertMany(data, {}, (err, res) => {
        if(err) throw err
        console.log('insert array successfull');
      })

    } else {
      this.Thumb.create(data, {}, (err, res) => {
        if(err) throw err
        console.log('insert data successfull', res);
      })
    }
  }

  find(filter = {}) {
    this.Thumb.find(filter).exec((err, result) => {
      if(err) {
        console.error(e);
      }
      console.log('find reuslt:', result);
    })
  }
}

export default MongoDb
