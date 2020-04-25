# 模块
## secure_link_module模块
用于防盗链的加强

制定并允许检查请求的链接的真实性以及保护资源免遭未经允许的访问
限制链接生效周期

```nginx
Syntax: secure_link expression;
Default:--
Context: http, server, location

Syntax: secure_link_md5 expression;
Default:--
Context: http, server, location
```
eg:
http://mhynet.cn/md5=12312s123sd123123&expires=12312312313
```nginx
location / {
  secure_link         $arg_md5,$arg_expires;
  secure_link_md5     "$secure_link_expires$uri  mhyerxer"; # mhyerxer 是加密的key

  if ($secure_link = "") {
    return 403;
  }

  if($secure_link = "0") {
    return 410;
  }
}
```

## goip 模块，读取地域信息
有第三方模块：[ngx_http_geoip2_module](https://github.com/leev/ngx_http_geoip2_module)

这里使用默认模块。
[文档](http://nginx.org/en/docs/http/ngx_http_geoip_module.html)
属于内置模块，使用yum 安装。

安装：
```sh
yum install nginx-module-geoip
```
默认安装的位置位于/etc/nginx/modules目录。

然后在nginx.conf中加载进去, 位于http 块的外面。
```nginx
load_module  "modules/ngx_http_geoip_module.so";
load_module   "modules/ngx_stream_geoip_module.so";
user  nginx;
worker_processes 1;
```
需要安装地域信息的数据。

使用
```nginx
http {
  geoip_country       /etc/nginx/geoip/GeoIp.dat;
  geoip_city          /etc/nginx/geoip/GeoLiteCity.dat;
  geoip_proxy         192.168.100.2/24;
  geoip_proxy_recursive on;
}
```
上面配置中的geoip_country和geoip_city 后面的选项是数据文件，可以下载到本地，然后引入。
geoip模块有几个常用的内置变量，可以在nginx中使用:
[文档地址](http://nginx.org/en/docs/http/ngx_http_geoip_module.html)
```nginx
server {
  if ($geoip_country != "US") {
    return 403;
  }

  location /myip {
    default_type  text/plain;
    return 200 "$remote_addr $geoip_country_name $geoip_country_code $geoip_city";
  }
}
```




