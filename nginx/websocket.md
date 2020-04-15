# nginx websocked 配置

## websocket
websocket实现在http连接的基础上，并通过http中的的`Upgrade`协议头将连接从http升级到websocket。这样就可以实现多次双向通讯，直到连接被关闭。
```
Upgrade: websocket
```

## map 配置
通过map进行变量中内容映射后赋值

systax: map string $variable {...}
default: --
context: http

例如：
```nginx
http {
  map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
  }
}

```
以上配置，如果客户端的请求头`$http_upgrade`是否有值，如果没有值，则会给变量`$connection_upgrade`赋值为`updrade`, 如果客户端发送过来的`$http_upgrade`的值为空，则给`$connection_upgrade`赋值为close。


