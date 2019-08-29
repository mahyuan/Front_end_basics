# nginx使用场景

## 静态资源web服务
非服务器动态运行生成的文件，如图片、视频、文件，浏览器渲染文件（html,css,js）等
- CDN：（内容分发网络（Content Distribution Network））

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

## 代理服务



## 负载均衡调度器SLB


## 动态缓存
