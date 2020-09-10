const request = require('request')
const cherrio = require( 'cheerio')
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events');
const MongodbClient = require('./mongo');

class Spider {
  constructor({ url = '', dir}) {
    this.url = url
    this.dir = dir
    this.currentPage = url.match(/\d+$/)[0]
    this.tag = this.url.replace(/https\:\/\/\w+\.\w+\//, '').replace(/\?.*/, '')
    this.Event = new EventEmitter()
    this.db = new MongodbClient()
    this.init()
    this.Event.on('finished', () => {
      console.log('--finished called--');
      this.getNext()
    })
  }
  init() {
    console.log('start load html', this.url);
    this.loadHtml(this.url, this.parseHtml)
  }

  getNext() {
    console.log('----start next----');
    this.currentPage = parseInt(this.currentPage) + 1
    this.url = this.url.replace(/\d+$/, this.currentPage)
    setTimeout(() => {
      this.init()
    }, 5000)
  }

  loadHtml(url, done) {
    done = done.bind(this)
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
          done(body)
        }
      }

    }
    console.log('---start request---');
    try {
      request(options, callback)

    } catch (error) {
      console.error('reuest error, retry then:');
      request(options, callback)
    }
  }

  parseHtml(html) {
    const $ = cherrio.load(html)
    const nodeList = Array.from($('.thumb')).map(item => {
      const id = $(item).attr('data-wallpaper-id')
      const thumb = $(item).find($('img.lazyload')).attr('data-src')
      const like =  $(item).find($('a.wall-favs')).text()
      const preview = $(item).find('a.preview').attr('href')
      const fullSrc = `https://wallhaven.cc/w/${id}`
      const full = `https://w.wallhaven.cc/full/ey/wallhaven-${id}.jpg`
      const wallRes = $(item).find('span.wall-res').text().split(/\s\x\s/g)
      const width = wallRes[0]
      const height = wallRes[1]
      return  {
        id,
        tag: this.tag,
        thumb,
        like,
        preview,
        width,
        height,
        full,
        fullSrc
      }
    })
    console.log('--get nodeList count:--', nodeList.length);
    this.dbSave(nodeList)
  }

  getPageCount(html) {
    /**
     <ul class="pagination" role="navigation"
                data-pagination="{&quot;total&quot;:379,&quot;current&quot;:1,&quot;url&quot;:&quot;https:\/\/wallhaven.cc\/hot?page=1&quot;}">
     */
    const $ = cherrio.load(html)
    const thumbListingPageNum = $(html).find($('.pagination')).attr('data-pagination')
    console.log('thumbListingPageNum', thumbListingPageNum);

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

  async dbSave(list = []) {
    if(list.length <= 0) return;

    // const Model = this.db.Thumb
    const newData = []
    for(let obj of list) {
      const existsList = await this.db.find({id: obj.id })
      if(Array.isArray(existsList) && existsList.length > 0) {
        console.log(`id: ${obj.id} had existsed`);
      } else {
        newData.push(obj)
      }
    }

    if(newData.length > 0) {
      console.log('insert new data of: ', newData.length);
      let result = await this.db.insertData(newData)
      result && this.Event.emit('finished')
    } else {
      console.log('no new data');
      this.Event.emit('finished')
    }


  }
}

const dir = '/Users/mhy/Pictures/spider'
// const url = "https://wallhaven.cc/hot?page=386" // 最大386页
const url = `https://wallhaven.cc/latest?page=1145`// 该分类一共13523页
// const url = 'https://wallhaven.cc/toplist?page=1' // 该分类一共135页

const spider = new Spider({url, dir})

