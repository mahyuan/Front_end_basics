/**
 * 在node服务中
 */
const express = require('express');
const Vue = require('vue');
const fs = require('fs');
const path = require('path');
const server = express();
const root = require('../config').root;
const filePath = path.join(root, 'src/template')

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync(path.join(filePath, 'index.html'), 'utf-8')
});

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      msg: 'vue ssr',
      url: req.url
    },
    template: `<div>{{msg}}</div>`
  });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    console.log('html', html);
    res.end(html)
  })
});

server.listen(9111);
console.log('server listen on: http://127.0.0.1:9111')
