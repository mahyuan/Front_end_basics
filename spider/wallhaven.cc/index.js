const request = require('request')
const cherrio = require( 'cheerio')
const fs = require('fs')
const  path = require('path')
const dir = '/Users/mhy/Pictures/spider'

let url = `https://wallhaven.cc/latest?page=1`

function init(url) {
  loadHtml(url, parseHtml)
}

function loadHtml(url, callback) {
  request(url, (err, res, body) => {
    if(err) {
      console.error('err', err);
    }

    if(res.statusCode === 200) {
      callback(body)
    }
  })
}

function parseHtml(html) {
  const $ = cherrio.load(html)
  let imgList = Array.from($('.thumb img')).map(item => $(item).attr('data-src'))
  let linkList = Array.from($('.thumb .preview')).map(item => $(item).attr('href'))
  console.log('imgList', imgList);
  console.log('linkList', linkList);
  loadThumb(imgList)
  loadFullThumb(linkList)
}
function loadFullThumb(list = []) {
  if(Array.isArray(list)) {
    for(let href of list) {
      loadHtml(href, parseFullThumb)
    }
  }
}

function parseFullThumb(html) {
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
    let filename = arr[arr.length - 1].replace(/[\s\S]*\-/, '')
    filename = `${data.wallpaperWidth}x${data.wallpaperHeight}-${filename}`
    let filepath = path.join(dir, 'full', filename)
    loadFile(imgSrc, filepath)
  }
}

function loadThumb(list = []) {
  if(Array.isArray(list)) {
    for(let src of list) {
      let arr = src.split('/')
      let filepath = path.join(dir, 'thumb', arr[arr.length - 1])
      loadFile(src, filepath)
    }
  }
}

/**
 * @param data 数据
 * @param filepath 存储路径
 */
function loadFile(src, filepath) {
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

init(url)
