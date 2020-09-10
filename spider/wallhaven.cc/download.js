const path = require('path')
const fs = require('fs')
const cherrio = require( 'cheerio')
const request = require('request')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const MongoClient = require('./mongo')
const client = new MongoClient()
const EventEmitter = require('events');
const { nextTick } = require('process')
const { resolve } = require('bluebird')
const Event = new EventEmitter()
Event.on('update', updateHandler)

let index = 203
let total = 0
const dir = '/Users/mhy/Pictures/spider'
const query = {tag: { $eq: 'hot' }}

getTotalCount()
function getTotalCount() {
  client.Thumb.countDocuments(query).exec((err, result) => {
    if(err) console.error(err);
    console.log('count: ', result)
    total = result
    loop()
  })
}

function next() {
  index += 1
  loop()
}
function loop() {
  console.log(`----current index is : ${index}---`)
  client.Thumb
    .find(query).skip(index).limit(1)
    .exec((err, data) => {
      if(err) console.error(`find err with: ${i}`, err);

      if(Array.isArray(data)) data = data[0];

      const detailSrc = data.fullSrc
      loadHtml(detailSrc)
    })

}

function loadHtml(url) {
  const options = {
    method: 'GET',
    url: url,
    headers: {
      'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
    },
    timeout: 20000,
    Connection:'keep-alive',
    Referer: this.url
  }
  const callback = (err, res, body) => {
    if(err) {
      console.error('err', err);
    } else {
      console.log('---load html---', res.statusCode);
      if(res.statusCode === 200) {
        parseFullThumb(body)
      } else {
        next()
      }

    }

  }
  console.log('---start request---');
  request(options, callback)
}


function parseFullThumb(html) {
  const $ = cherrio.load(html)
  const dom = $('#wallpaper')
  const src = $(dom).attr('src')
  const id = $(dom).attr('data-wallpaper-id')
  const width = $(dom).attr('data-wallpaper-height')
  const height = $(dom).attr('data-wallpaper-width')

  const arr = src.split('/')
  const fileEnd = arr[arr.length - 1].replace(/[\s\S]*\-/, '')
  const filename = `${width}x${height}-${fileEnd}`
  const filepath = path.join(dir, 'full_hot', filename)

  const query = {
    id: id,
    full: src,
    width: width,
    height: height
  }

  loadFile(src, filepath)

  Event.emit('update', query)

}

function updateHandler(data) {
  console.log('---updatehandler---', data);
  client.Thumb
    .updateOne({id: { $eq: data.id }}, { full: data.full })
    .exec((err, result) => {
      if(err) {
        console.error('--update err --', err);
      }
      console.error('--update src --', result);
    })
}

/**
 * @param data 数据
 * @param filepath 存储路径
 */
function loadFile(src, filepath) {
  console.log('--start download file--', src);
  console.log('--filepath--', filepath);
  const isFileExists = fs.existsSync(filepath)

  if(!isFileExists) {
    request.get({
        url: src,
        headers: {
          "Keep-Alive": "max=5000"
        }
      })
      .on('error', (err) => {
        console.error(err);
      })
      .pipe(fs.createWriteStream(filepath))
      .on('close', () => {
        next()
      })
    } else {
      console.log('file exists:', filepath);
      next()

  }
}

