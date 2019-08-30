# nginx使用场景

## 静态资源web服务
非服务器动态运行生成的文件，如图片、视频、文件，浏览器渲染文件（html,css,js）等
- CDN：（内容分发网络（Content Distribution Network））

### 压缩
```
#配置语法
# 文件读取
# 除了sendfile外，模块 --with0file-aio可以异步读取文件
Syntax: sendfile on | off;
Default: sendfile off;
Context: http, server, location, if in location


# tcp_nopush， 在sendfile开启时，提高网络包的传输效率，把多个包整合，一次性发出去
Syntax: tcp_nopush on | off;
Default: tcp_nopush off;
ContextL http, server, location

# tcp_nodelay 在keepalive连接下，提高网络包的传输实时性
Syntax: tcp_nodelay on | off;
Default: tcp_nodelay on;
Context: http,server,location

# 传输压缩
Syntax: gzip on | off;
Default: gzip off;
Context: http,server,location, if in location

# 配置压缩比率, 但是压缩会消耗服务器性能
Syntax: gzip_comp_level level;
Default: gzip_comp_level 1;
Context: http,server,location

# http版本
Syntax: gzip_http_version 1.0 | 1.1;
Default: gzip_http_version 1.1;
Context: http,server,location
```
**拓展nginx压缩模块**
http_gzip_static_module模块预读gzip功能
http_gunzip_module模块应用支持gunzip压缩方式，不支持gzip时可以替换为这中压缩方式

**注意**
使用gzip的时候必须要在gzip_types 中添加需要压缩的文件的类型

```
gzip on;
gzip_http_version 1.1;
gzip_comp_level 9;

gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
```

### 浏览器缓存
浏览器无缓存：
浏览器请求 ---> 无缓存 ---> 请求web服务器 ---> 请求响应 -> 呈现
浏览器有缓存：
浏览器请求 ---> 有缓存 --->  校验通过 ---> 呈现

- 校验过期机制
校验是否过期： Expires, Cache-Control(max-age)  Expires用于http1.0， Cache-Control用于http1.1（max-age定义了多久后过期）
协议中Etag头信息验证: Etag
Last-Modified头信息验证: Last-Modified

Etag和Last-modified类似，使用客户端的Last-modified时间与服务器上文件的最新更改日期进行比对，如果不一致就返回新的文件。一致的话，返回304，不一致就返回200

- 缓存配置: 添加 Cache-Control、Expries头
```
Syntax:   expires [modified] time;
          expires epoch | max | off;
Default:  expires off;
Context:  http, server, location, if in location

```
expires设置会自动给response添加 Cache-Control: max-age= 请求头信息
但是request中浏览器会自动设置为： Cache-Control: max-age=0

### 跨域
Access-Control-Allow-Origin
```
Syntax:   add_header name value [always];
Default:  --
Context:  http, server, location, if in location
```

### 防盗链
nginx防盗链配置 http_refore模块
```
Syntax:
Default:
Context:
```



## 代理服务


## 负载均衡调度器SLB


## 动态缓存
