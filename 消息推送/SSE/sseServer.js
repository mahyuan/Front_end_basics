const Koa = require('koa')
const { PassThrough } = require('stream')
const crypto = require('crypto')

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

  let timer = null
  const stream = new PassThrough()
  stream.on('close', (event) => {
    console.log('[stream closed event]');
    clearInterval(timer)
    stream.end()
  })
  stream.on('data', () => {
    // console.log('[on data event]');
  })
  ctx.status = 200
  ctx.body = stream
  let index = 0

  timer = setInterval(() => {
    index++
    const data = getRandomData()
    if(index <= 10) {
      stream.write(`data: ${JSON.stringify(data)}\n\n`)
    } else {
      clearInterval(timer)
      const emptyData = {
        code: 1,
        data: {
          date: new Date().toUTCString(),
          msg: 'no more data'
        }
      }
      stream.end(`data:${JSON.stringify(emptyData)}\n\n`)
    }
  }, 1000)
})

app.listen(8888, () => {
  console.log('listening http://localhost:8888');
})

function getRandomData() {
  // let randomNum =  (Math.random() * 100).toFixed()
  // let hash = crypto.createHash('sha256').update(randomNum).digest('hex')
  let hash = crypto.randomBytes(10).toString('hex')
  console.log('hash', hash);
  return {
    code: 0,
    data: {
      hash: hash,
      date: new Date().getTime()
    }
  }
}
