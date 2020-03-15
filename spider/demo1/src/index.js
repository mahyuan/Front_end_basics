const request = require('request')
const cherrio = require( 'cheerio')
const fs = require('fs')
const  path = require('path')

let dxyUrl = 'https://ncov.dxy.cn/ncovh5/view/pneumonia?from=timeline&isappinstalled=0'

function init() {
  request(dxyUrl, (err, res, body) => {
    fs.writeFile(path.resolve(__dirname, 'data', 'dxy.html'), body, function() {
      const window = {}
      console.log('保存完了');
      const $ = cherrio.load(`${body}`)

      eval($('#getListByCountryTypeService2').html())
      eval($('#getTimelineService').html())
      eval($('#getIndexRumorList').html())
      eval($('#getAreaStat').html())
      eval($('#getWikiList').html())
      eval($('#getEntries').html())
      eval($('#getStatisticsService').html())



      const getListByCountryTypeService2 = JSON.stringify(window.getListByCountryTypeService2)
      const getTimelineService = JSON.stringify(window.getTimelineService)
      const getIndexRumorList = JSON.stringify(window.getIndexRumorList)
      const getAreaStat = JSON.stringify(window.getAreaStat)
      const getEntries = JSON.stringify(window.getEntries)
      const getWikiList = JSON.stringify(window.getWikiList)
      const getStatisticsService = JSON.stringify(window.getStatisticsService)


      writeFile('getListByCountryTypeService2.json', getListByCountryTypeService2)
      writeFile('getTimelineService.json', getTimelineService)
      writeFile('getIndexRumorList.json', getIndexRumorList)
      writeFile('getAreaStat.json', getAreaStat)
      writeFile('getWikiList.json', getWikiList)
      writeFile('getEntries.json', getEntries)
      writeFile('getStatisticsService.json', getStatisticsService)
    })
  })
}

function writeFile(filename, data) {
  fs.writeFile(path.resolve(__dirname, 'data', filename), data, function() {
    console.log(`${filename} write end`);
  })
}

init()

