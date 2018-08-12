// https://www.npmjs.com/package/koa-router

import Koa from 'koa';
import Router from 'koa-router';
import { createContext } from 'vm';

/**
 * koa-router
 * 	Router
 * 		new Router
 * 			.get|put|post|patch|delete|del => Router
 * 			.routes => function
 * 			.use([path], middleware) => Router
 * 			.prefix(prefix) => Router
 * 			.allowedMethods([options]) => function
 * 			.redirect(source, destination, [code]) => Router
 * 			.route(name, params, [options]) => Layer | false
 * 			.url(name, params, [options]) => String | Error
 * 			.param(param, middleware) => Router
 *
 *
 */

let app = new Koa();
let router = new Router();

router.get('/', (createContext, next) => {
	// ctx.router avaiable
});

app
	.use(router.routes())
	.use(router.allowedMethods());

//
router
	.get('/', (createContext, next) => {
		ctx.body = 'Hello World';
	})
	.post('/users', (ctx, next) => {
		// ...
	})
	.put('/users/:id', (ctx, next) => {
		// ...
	})
	.del('/users/:id', (ctx, next) => {
		// ..
	})
	.all('/users/:id', (ctx, next) => {
		// ..
	});


// Named routes
router.get('user', '/users/:id', (ctx, next) => {
	// ..
});
router.url('user', 3);
//  => "/users/3"


