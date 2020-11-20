## CORS

全称“跨域资源共享 ”(Cross-origin resource sharing)
允许浏览器跨域访问资源，发出XMLHttpRequest请求， 克服ajax只能同源使用的限制。

实现CORS通信的关键是服务器，浏览器发现ajax请求跨域时会多出一次附加的请求，只要服务端实现了CORS接口，就可以跨域通信。

### 简单请求

简单请求：
- 使用以下方法之一： get, head, post； 除了被用户代理自动设置的首部字段如connection,user-agent等，允许认为的设置的字段有：
Accept, Accept-Language, Content-Language, Content-Type(需要额外限制),DPR,downlink, save-data, viewport-with, with
- content-type的值仅限于以下三个之一：text/plain, multipart/form-data, application/x-www-form-urlencoded
- 请求中没有使用ReadableStream对象

浏览器会直接发送CORS请求，在头信息中整洁一个origin字段，表示请求来着哪个源（协议+域名+端口）。

Requset header:
```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

服务器根据这个值，决定是否同意这次请求。
如果orgin知道的源，不在许可范围内，服务器会返回一个正常的http响应，浏览器发现，这个回应(response)的头信息没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，这种错误时无法通过状态码识别的，因为hppt回应的状态码可能是200。
如果origin在许可的范围内，服务器返回的响应，会多出以下几个信息字段：

Response Header:
```
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar
Content-Type: text/html; charset=utf-8
```
在CORS请求时，XMLHttpRequest对象的getResonseHeader() 方法只能拿到 6个基本字段
Cache-Control、Content-Type、Content-Language、Expires、Last-Modified、Pragma。
如果想拿到其他字段，就必须服务端在Access-Control-Expose-Headers中指定

#### withCredentials属性

CORS请求默认不发送coolie和http认证信息，如果要把cookie发送到服务器，服务器和前端都得同意，服务器在response header中添加
```
Access-Control-Allow-Credentials: true
```
前端在ajax请求中打开withCredentials属性
```js
var xhr = new XMLHttpRequest()
xhr.withCredientials = true
```

如果要发送cookie， Access-Control-Allow-Origin不能设置为星号* , 必须是明确的、与网页一致的域。

### 非简单请求

#### 预检请求
非简单请求，比如请求方法是put, post, 活动delete，或者content-type字段的类型是application/json

非简单请求的CORS请求，会在正式请求之前，发送一次http查询请求，被称之为预检抢 （preflight）。

比如以下请求会发送预检请求：
```js
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
```

预检请求如下：

```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```
预检请求的方法是OPTIONS，必须包含三个请求头： Origin、Access-Control-Request-Method、Access-Control-Request-Headers。
预检通过后，服务端返回响应回返回前面前面说过的三个请求头允许跨域，否则返回正常的http响应，浏览器会根据这三个响应头进行同源策略的检查。
```
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
```
预检请求之后，浏览器会正式发送请求。

CORS与JSONP的使用目的相同，但是CORS比JSONP更强大，JSONP只支持get请求，jsonp的优势在于支持旧版浏览器以及不支持cors的网站请求。



## koa 服务CORS

```js
const Koa = require('koa')
const app =  new Koa()
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin)
  ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.set('Access-Control-Allow-Headers', 'Origin,X-Request-With,Content-Type,Accept')

  if(ctx.method === 'OPTIONS') {
    ctx.status = 204
    return
  }
  await next()
})

app.listen(8888, () => {
  console.log('listening http://localhost:8888');
})
```

[阮一峰博客](http://www.ruanyifeng.com/blog/2016/04/cors.html)
