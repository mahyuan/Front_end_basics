const Koa = require('koa')
const { PassThrough } = require('stream')

const app = new Koa()

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

app.use(async (ctx, next) => {
  if(ctx.path !== '/sse') {
    return next()
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
  let index = 0

  let timer = setInterval(() => {
    index++
    if(index <= 10) {
      stream.write(`data:${new Date()}-${index}\n\n`)
    } else {
      clearInterval(timer)
      stream.end(`data:数据已写完\n\n`)
    }
  }, 1000)
})

app.listen(8888, () => {
  console.log('listening http://localhost:8888');
})
