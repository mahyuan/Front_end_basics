const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');

let app = new Koa();
let router = new Router();
const main = ctx => {
    // ctx.response.body = {
    //     code: 0,
    //     msg: "hello"
    // }


    // if (ctx.request.accepts('xml')) {
    //     ctx.response.type = 'xml';
    //     ctx.response.body = '<data>Hello World</data>';
    // } else if (ctx.request.accepts('json')) {
    //     ctx.response.type = 'json';
    //     ctx.response.body = { data: 'Hello World' };
    // } else if (ctx.request.accepts('html')) {
    //     ctx.response.type = 'html';
    //     ctx.response.body = '<p>Hello World</p>';
    // } else {
    //     ctx.response.type = 'text';
    //     ctx.response.body = 'Hello World';
    // }

    if(ctx.request.path !== '/') {
        ctx.response.type = 'html';
        ctx.response.body = fs.createReadStream('./tmpl.html');
    } else {
        ctx.response.body = 'hello world!!!';
    }


}

router.get('/', main)
app
    .use( router.routes() )
    .use( router.allowedMethods() );

app.use(main);
app.listen(3000);

