/**
 * 在node服务中
 */
const express = require('express');
const Vue = require('vue');
const fs = require('fs');
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer();
const server = express();
const root = require('../config').root;
const filePath = path.join(root, 'src/template')

server.get('*', (req, res) => {
  console.log('root', root);
  console.log('cwd', process.cwd());
  const app = new Vue({
    data: {
      url: req.url
    },
    // template: `<div>hello, {{ url }} </div>`
    template: fs.readFileSync(path.join(filePath, 'index.template.html'), 'utf-8')
  });

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }

    res.end(`
      <!DOCTYPE>
      <html>
        <head>
          <title>hello</title>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `)
  })
});

server.listen(9111);
