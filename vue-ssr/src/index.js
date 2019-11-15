const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const app = new Vue({
  template: `<div>hello</div>`
});

/* renderer.renderToString(app, (err, html) => {
  if(err) throw err;

  console.log(html);
}); */

renderer
  .renderToString(app)
  .then(html => {
    console.log(html);
  }).catch(err => {
    console.error(err);
  });



