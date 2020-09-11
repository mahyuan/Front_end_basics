# node 连接 redis

[redis官方命令](https://redis.io/commands)

## docker 安装 redis
```bash
docker pull redis:latest
docker images

docker run -itd --name redis -p 6379:6379 redis

docker exec -it redis /bin/bash

# docker run -itd --name mongo -p 27017:27017 mongo --auth
# docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```

客户端打开redis：
```bash
redis-cli
``


## ioredis

https://github.com/luin/ioredis#readme
ioredis 8.1k star, 支持集群

```js
```

## node-redis

https://github.com/NodeRedis/node-redis
node-redis 13.1k star, 官方库， 4.0以前版本原生不支持promsie，可以使用node内置的库`util.promisify`（node.js >= v8），
eg:
```js
const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

getAsync.then(console.log).catch(console.error);
```
