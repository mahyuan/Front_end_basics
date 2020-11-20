### SSE 服务器发送事件

Server-Sent Events
服务器发送事件的API是EventSource接口，这是HTML5新增的特性

EventSource支持CORS，但目前还没有写入标准。
```js
const eventSource = new EventSource('http://www.abc.com/sse')
```

如果发送事件的脚本不同源，应该创建一个新的包含URL和options参数的EventSource对象。
```js
const eventSource = new EventSource('//www.abc.com/sse', { withCredentials: true})
```

成功初始化一个事件源后，可以监听message事件添加事件处理程序接收消息
```js
eventSource.onmessage = function(event) {
  const data = event.data
  // ...
}

```

当不通过http/2时，SSE会受到最大连接数的限制，http/2同一时间内最大连接数由服务器和客户端之间协商，默认100


## 服务器端发送事件流

服务器应该是要`text/event-stream`的mime类型响应。每个通知以文本块形式发送，以一对换行符结尾。
假设接口为 `/sse`

```js
const Koa = require('koa')
const { PassThrough } = require("stream");
const app = new Koa()

app.use(async (ctx, next) => {
  if(ctx.path !== '/sse/') {
    return await next()
  }

  ctx.request.socket.setTimeout(0)
  ctx.req.socket.setNoDelay(true)
  ctx.req.socket.setKeepAlive(true)
  ctx.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  })

  const stream = new PassThrough()
  ctx.status = 200
  ctx.body = stream

  setInterval(() => {
    stream.write(`data:${new Date()}\n\n`)
  }, 1000)
})

app.use(ctx => {
  ctx.status = 200
  ctx.body = 'ok'
})
app.listen(8888, () => {
  console.log('Listener 8888')
})
```
可以配合CORS:
```js
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
```

[server-sent_events](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/Using_server-sent_events)
[EventSource](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/EventSource)
