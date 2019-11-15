// const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const originUrl = 'https://bing.ioliu.cn/?p=';
let isFirstReq = true
let count = null;

(function() {
  if (count === null) {
    getRequest(originUrl, isFirstReq)
  }

})()

function getRequest(url, isFirstReq) {
  https.get(url, function(res) {
    var html = '';
    res.on('data', function(data) {
      html += data;
    })

    res.on('end', () => {
      var chapter  = crawlerChapter(html);
      printInfo(chapter)
    })
  }).on('error', (err) => {
    console.log('err', err);
  })
}

function crawlerChapter(html) {
  const $ = cheerio.load(html,  {
    normalizeWhitespace: true,
    xmlMode: true
  });
  const data = [];
  const card = $('.item');
  const

  card.map(function(node) {
    const item = $(this);
    const desc = item.find('.description h3').text();
    const img = item.find('img.progressive__img').attr('src');
    const calendar = item.find('.calendar em').text();
    const view = item.find('.view em').text();
    const heart = item.find('.heart em').text();
    const download_path = item.find('.download').attr('href');
    const download = item.find('.download em').text();
    data.push({
      desc: desc,
      img: img,
      calendar: calendar,
      view: parseInt(view),
      heart: parseInt(heart),
      download: parseInt(download),
      download_path: download_path
    })
    // console.log('---title--', title)
  })
  fs.writeFile(path.resolve('./log/res.json'), JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('save res to log');
  });


}

function printInfo(data) {

}
