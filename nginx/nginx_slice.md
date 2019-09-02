# 大文件分片请求

每个子请求收到的数据都会形成一个独立文件，一个请求断了，其他请求不受影响

但是，当文件很大或者slice很小的时候，可能导致文件描述符耗尽等情况
- 配置语法
```
Syntax: slcie size;
Default: slice 0;
Context: http, server, location
```
http_slice_module模块


