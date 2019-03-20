# http

## 浏览器输入Url之后发生了什么
1.redirect跳转
2.app cache 应用缓存
2.dns查找，域名解析
3.创建TCP链接
4.发送请求
5.接收响应

6.解析响应体
7.生成DOM树
8.计算DOM树上的CSS属性
9.根据CSS属性对元素逐个进行渲染，得到内存中的位图
10.一个可选的步骤是对位图进行合成，会极大地增加后续回执的速度
11.合成之后，再绘制到界面上

## 网络模型
应用层 => 传输层 => 网络层 => 数据链路层 =>  物理层 => （客户端）
物理层 => 数据链路层 => 网络层 => 传输层 => 应用层 =>  （服务端）

## TCP三次握手
避免超时引起的资源浪费

## URI
Uniform Resource Identifier 统一资源标志符
用来标识互联网的资源
## URL
Uniform Resource Locator 统一资源定位符
```
http://user:pass@host.com:80/path?query=string#hash
```

## URN
永久统一资源定位符，资源移动之后还能找到


## 报文形式
请求报文
```
<!-- 起始行：  -->
GET /test/hi.txt HTTP/1.0
<!-- 首部 -->
Accept: text/*
Accept-Language: en
```
响应报文
```
<!-- 起始行 -->
HTTP/1.0 200 ok
<!-- 首部 -->
Content-type: text/plan
Content-length: 12
<!-- 首部与主体之间有一个空行 -->
<!-- 主体 -->
hi! I'am message!
```

## http方法
- get
- post
- put
- delete
- options
- head

## http 状态码

- 1xx: 临时回应，客户端请继续
- 2xx: 请求成功
 - 200: 请求成功

- 3xx: 请求的目标有变化，希望客户端进一步处理
 - 301&302: 永久性和临时性跳转
 - 304：客户端缓存没有更新

- 4xx: 客户端请求错误
 - 304： 无权限
 - 404： 请求的页面不存在

- 5xx: 服务端请求错误
 - 500: 服务端错误
 - 503: 服务端暂时性错误

## http Head
可以使用 curl / wget发送请求，查看请求
```bash
curl -v http://127.0.0.1:9999
```
### Request Header
|Request Header|归定|
|----|----|
|Accept |浏览器接受的格式|
|Accept-Encoding|浏览器接受的编码方式|
|Accept-Language|浏览器接受的语言，用于服务端判断多语言|
|Cache-Control|控制缓存的时效性|
|Connection|连接方式，如果是keey-alive, 且服务端支持，则会复用链接|
|Host|http访问的域名|
|if-Modified-Since|上次访问时的更改时间，如果服务器认为此时间没有更新，则会给出304响应 |
|if-None-Match|上次访问时使用的E-tag, 通常是页面的信息摘要，这个比更改时间准确一些|
|User-Agent|客户端标识|
|Cookie|客户端存储的cookie字符串，用于权限验证|

### Response Header
|Response Header|规定|
|-----------|-------------|
|Cache-Control|缓存控制，用于通知各级缓存保存的时间，例如max-age=0,表示不需要缓存|
|Connection|连接类型，keep-alive表示复用链接|
|Content-Encoding|内容编码方式，通常是gzip|
|Content-Length|内容的长度，有利于浏览器判断内容是否已经结束|
|Content-Type|内容类型，所有请求网页的都是text/html|
|Date|当前服务器时间|
|ETag|页面的信息摘要，用于判断是否需要重新到服务器取回页面|
|Expires|过期时间，用于判断下次请求是否需要到服务端取回页面|
|Keep-Alive|保持连接不断时需要的一些信息，例如：timeout=5,max=100|
|Last-Modified|页面上次更新时间|
|Server|服务端软件的类型，如：nginx等|
|Set-Cookie|设置cookie，可以存在多个|
|Via|服务端的请求链路，对一些调试场景至关重要|

eg:
```
GET /api/admin/?page_index=1&page_size=10 HTTP/1.1
Host: localhost:9999
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36
Referer: http://localhost:9999/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8,la;q=0.7,ko;q=0.6,en;q=0.5
Cookie: Test-Token=x0Yjg5NTQ3MT23dDJjYxs23S; language=zh;

HTTP/1.1 200 OK
X-Powered-By: Express
date: Wed, 20 Mar 2019 09:51:14 GMT
content-type: application/json;charset=UTF-8
transfer-encoding: chunked
connection: close
Vary: accept-encoding
content-encoding: gzip

{"code": 0,"msg": "","data":[]}
```
