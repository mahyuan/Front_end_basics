const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const MongoClient = require('./mongo')
const client = new MongoClient()
const EventEmitter = require('events');
const Event = new EventEmitter()

Event.on('update', handler)

function  init() {
  // 获取数据条数
  client.Thumb.countDocuments().exec((err, result) => {
    if(err) console.error(err);
    console.log('count: ', result)
    loop(result)
  })

}
function loop(total) {
  // 7896
  const limit = 10
  const len = Math.ceil(total / limit)

  for(let i in new Array(len).fill(1)) {
    client.Thumb
      .find().skip(parseInt(i) * limit).limit(100)
      .exec((err, result) => {
        if(err) console.error(`find err with: ${i}`, err);

        // console.log(`---result of i:${i}-----`, result)
        Event.emit('update', result)
      })

    // client.Thumb
    //   .find({}, {'_id': 1, 'id': 1, 'thumb': 1, 'fullSrc': 1}, { skip: parseInt(i) * limit, limit: limit })
    //   .exec((err, result) => {
    //     if(err) console.error(`find err with: ${i}`, err);

    //     console.log(`---result of i:${i}-----`, result)
    //     Event.emit('update', result)
    //   })
  }
}

function handler(data) {
  console.log('----update----')
  if(Array.isArray(data)) {
    data.forEach(item => {
      // const fullSrc = `https://wallhaven.cc/w/${id}`
      // https://w.wallhaven.cc/full/ey/wallhaven-eyje7k.jpg
      const fullSrc = item.fullSrc

      const full = `https://w.wallhaven.cc/full/ey/wallhaven-${item.id}.jpg`

      client.Thumb.update({'id': { $eq: item.id }}, { $set: {'full': full }}).exec((err, result) => {
        if(err) console.error(`update err with id: ${item._id}`, err);
        console.log('update success:', result)
      })

    })

  }
  client.Thumb.update()
}
init()
