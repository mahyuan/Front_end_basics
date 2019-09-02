# 代理
分为正向代理和反向代理
nginx可支持的代理协议
HTTP, Websocket, GRPC, ICMP/POP/IMAP,Https,RTMP

## 正向代理
为客户端服务， 代理服务完成请求
代理拦截客户端的请求，解析域名到域名下，完成请求的过程，把数据返回客户端
正向代理协议：
只支持http协议的代理，不支持Https

## 反向代理
为服务端服务
客户端自己解析dns到域名，访问到代理服务器
- http,https代理模块：
http_proxy： http server
fastcgi： php server
uwsgi: python server

- websocket和grpc代理模块：
http_server: scolet
grpc: GRPC server（go语言）

## 代理配置

反向代理配置语法：
```
Syntax: proxy_pass URL
Default: --
Context: location, if in location, limit_except
```
配置实例：
http://localhost:8000/uri/
https://192.168.1.1:800/uri/
http://unix:/tmp/backend.socket:/uro/';
```
location ~ /test_proxy.html$ {
  proxy_pass http://127.0.0.1:8080;
}

```

正向代理配置和反向代理一样：
```
locaiton / {
  if ($http_x_forwarded_for !~* "^116\.22\.23.23") {
    return 403;
  }
  root /usr/local/nginx/html;
  index index.html index.htm;
}
```
```
locaiton / {
  proxy_pass http://$http_host$request_uri;
}
```
跳转重定向:
```
Sysntax: proxy_redirect default;
proxy_redirect off; proxy_redirect redirect replacement;
Default: proxy_redirect default;
Context: http, server, location
```
头信息：
```
Syntax: proxy_set_hader field value;
Default: proxy_set_header Host %proxy_host;
         proxy_set_header Connection close;
Context: http, server, location
```
头信息拓展： proxy_hide_header, proxy_set_body

超时（代理到后端的超时）:
```
Syntax: proxy_connect_timeout time;
Default: proxy_connect_timeout 60s;
Context: http, server, location
```
拓展： proxy_read_timeout, proxy_send_timeout

**proxy相关的配置项非常多，可以查阅文档。**






