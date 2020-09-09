const request = require('request')
const cherrio = require( 'cheerio')
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events');
const MongodbClient = require('./mongo')

class Spider {
  constructor({ url = '', dir}) {
    this.url = url
    this.dir = dir
    this.nodeList = []
    this.imgList = []
    this.Event = new EventEmitter()
    this.db = new MongodbClient()
    this.init()
  }
  init() {
    this.loadHtml(this.url, this.parseHtml)
  }

  loadHtml(url, done) {
    callback = callback.bind(this)
    const options = {
      url: url,
      headers: {
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36"
      },
      Connection:'keep-alive',
      Referer: this.url
    }
    const callback = (err, res, body) => {
      if(err) {
        console.error('err', err);
      }

      if(res.statusCode === 200) {
        done(body)
      }
    }
    request(options, callback)
  }

  parseHtml(html) {
    const $ = cherrio.load(html)
    this.imgList = Array.from($('.thumb img')).map(item => $(item).attr('data-src'))
    this.linkList = Array.from($('.thumb .preview')).map(item => $(item).attr('href'))
    console.log('imgList', this.imgList);
    console.log('linkList', this.linkList);

    this.loadThumb(this.imgList)
    this.loadFullThumb(this.linkList)
  }

  loadFullThumb(list = []) {
    if(Array.isArray(list)) {
      for(let href of list) {
        this.loadHtml(href, this.parseFullThumb)
      }
    }
  }

  parseFullThumb(html) {
    const $ = cherrio.load(html)
    const data = $('#wallpaper').data()
    /*
    {
      cfsrc: 'https://w.wallhaven.cc/full/lm/wallhaven-lm5djp.jpg',
      wallpaperId: 'lm5djp',
      wallpaperWidth: 2446,
      wallpaperHeight: 4008
    }
    */
    if(typeof data === 'object' && 'cfsrc' in data)  {
      const imgSrc = data.cfsrc
      const arr = imgSrc.split('/')
      const fileEnd = arr[arr.length - 1].replace(/[\s\S]*\-/, '')
      const filename = `${data.wallpaperWidth}x${data.wallpaperHeight}-${fileEnd}`
      let filepath = path.join(this.dir, 'full', filename)
      this.loadFile(imgSrc, filepath)
    }
  }

  loadThumb(list = []) {
    if(Array.isArray(list)) {
      for(let src of list) {
        let arr = src.split('/')
        let filepath = path.join(this.dir, 'thumb', arr[arr.length - 1])
        this.loadFile(src, filepath)
      }
    }
  }

  /**
   * @param data 数据
   * @param filepath 存储路径
   */
  loadFile(src, filepath) {
    const isFileExists = fs.existsSync(filepath)
    if(!isFileExists) {
      request.get(src)
        .on('error', (err) => {
          console.error(err);
        })
        .pipe(fs.createWriteStream(filepath))
    } else {
      console.log('file exists:', filepath);
    }
  }
}

const dir = '/Users/mhy/Pictures/spider'
// https://wallhaven.cc/hot?page=3
const url = `https://wallhaven.cc/latest?page=1`

const spider = new Spider({url, dir})

