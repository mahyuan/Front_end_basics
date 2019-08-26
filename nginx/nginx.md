Nginx 是一个开源且改性能、可靠的http中间件、代理服务

其他http服务：
apache：httpd
微软
google： GWS（google web server）

优势：
采用IO多路复用epoll模型
多进程多线程处理模式
非阻塞模式
负载均衡
开源


## 配置文件
```
/etc/nginx/nginx.conf
/etc/nginx/conf.d/default.conf
```
1.6.2版本的配置文件在
```
/usr/local/webserver/nginx/conf
```

## 安装编译参数查看
```
nginx -V
# centos输出
nginx version: nginx/1.6.2
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-36) (GCC)
TLS SNI support enabled
configure arguments: --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35

# mac OS 输出
nginx version: nginx/1.15.6
built by clang 10.0.0 (clang-1000.11.45.5)
built with OpenSSL 1.0.2p  14 Aug 2018 (running with OpenSSL 1.0.2s  28 May 2019)
TLS SNI support enabled
configure arguments: --prefix=/usr/local/Cellar/nginx/1.15.6 --sbin-path=/usr/local/Cellar/nginx/1.15.6/bin/nginx --with-cc-opt='-I/usr/local/opt/pcre/include -I/usr/local/opt/openssl/include' --with-ld-opt='-L/usr/local/opt/pcre/lib -L/usr/local/opt/openssl/lib' --conf-path=/usr/local/etc/nginx/nginx.conf --pid-path=/usr/local/var/run/nginx.pid --lock-path=/usr/local/var/run/nginx.lock --http-client-body-temp-path=/usr/local/var/run/nginx/client_body_temp --http-proxy-temp-path=/usr/local/var/run/nginx/proxy_temp --http-fastcgi-temp-path=/usr/local/var/run/nginx/fastcgi_temp --http-uwsgi-temp-path=/usr/local/var/run/nginx/uwsgi_temp --http-scgi-temp-path=/usr/local/var/run/nginx/scgi_temp --http-log-path=/usr/local/var/log/nginx/access.log --error-log-path=/usr/local/var/log/nginx/error.log --with-debug --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_degradation_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-ipv6 --with-mail --with-mail_ssl_module --with-pcre --with-pcre-jit --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module
```


## 配置
-----|----
user | 设置nginx服务的系统使用用户，默认为nginx用户，不用设置
-----|----
worker_processes | 工作进程数（和CPU个数一致就行）
error_log | nginx 错误日志
pid | nginx服务启动时候的pid
events worker_connections | 每个进程允许最大连接数
events use | 工作进程数

常用命令
```
nginx
nginx -c /usr/local/webserver/nginx/conf/nginx.conf
nginx -s reload
nginx -s stop
```

```
http {
  include mime.types;
  default_type  application/octet-stream;

  server {
    listen 8081;
    server_name  127.0.0.1;
    index index.html index.htm index.php;
    location / {
      root /Users/mhy/work/ushareit-web-vue/shareit-horoscope/dist/;
      # root /usr/local/var/www/;
      index index.html index.htm;
    }

    error_page 500 501 502 503 404 /50x.html;
    location = /tox.html {
      root /usr/local/var/www/html;
    }
  }

  server {
    listen 80;
    server_name localhost;

    location / {
      root /usr/share/nginx/html;
      index index.html index.htm;
    }

    error_page 500 502 503 504 /50x.html;
    location = /tox.html {
      root /usr/share/nginx/html;
    }
  }

}
```

## 虚拟主机配置
在同一个nginx上运行多套单独服务
1.基于主机的多ip方式
2.基于端口的配置方式
3.基于多个Host名称方式（多域名方式）
### 基于主机的多ip方式
多网口多ip方式
```
网卡1 ---- ip1 (192.168.1.1)
网卡2 ---- ip1 (192.168.1.2)
```
单网卡多ip
```
     ---- IP1 （192.168.1.1）
网卡1
     ---- IP2 （192.168.1.2）
```
单网卡多IP在配置nginx前需要添加未使用的Ip 到网卡
```
[root@hwsrv-539295 ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether fa:16:3e:91:02:21 brd ff:ff:ff:ff:ff:ff
    inet 104.168.175.34/24 brd 104.168.175.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 2607:5501:3000:1138::2/48 scope global
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:fe91:221/64 scope link
       valid_lft forever preferred_lft forever


ip a add 192.168.1.133/24 dev eth0
```
配置
```
server {
  listen 192.168.1.1:80;
  server_name localhost;
  location / {
    root /opt/app1/;
    index index.html index.htm;
  }
}

server {
  listen 192.168.1.2:80;
  server_name localhost;
  location / {
    root /opt/app2/;
    index index.html index.htm;
  }
}
```

### 基于端口的配置方式
```
http://192.168.1.1:80 ---- listen: 80
http://192.168.1.1:81 ---- listen: 81
http://192.168.1.1:82 ---- listen: 82
```
需要检查端口是否在使用
```
ss --luntp
```
配置
```
server {
  listen 80;
  server_name localhost;
  location / {
    root /opt/app1/;
    index index.html index.htm;
  }
}

server {
  listen 81;
  server_name localhost;
  location / {
    root /opt/app2/;
    index index.html index.htm;
  }
}
```

### 基于多个Host名称方式（多域名方式）
```
http://1.mhy.com ---- 1.mhy.com
http://2.mhy.com ---- 2.mhy.com
```
#### 配置
如果多个域名都解析到同一台机器的话，需要在hosts中进行解析
```
server {
  listen 80;
  server_name 1.mhy.com;
  location / {
    root /opt/app1/;
    index index.html index.htm;
  }
}
server {
  listen 80;
  server_name 2.mhy.com;
  location / {
    root /opt/app2/;
    index index.html index.htm;
  }
}
```


## 日志
日志存储目录
```
/var/logs
```
nginx 日志类型：
error_log
access_log

```
error_log /var/log/nginx/error.log warn;

//日志格式 mian 和下面的access_log 后面的 main 对应
# log_format 命名为main
log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                  '$status $body_bytes_sent "$http_referer" '
                  '"$http_user_agent" "$http_x_forwarded_for"';

access_log  logs/access.log  main; # 使用main格式的log_format
```
NGINX配置的格式中 $ 表示变量

## nginx变量
http请求变量-- arg_PARAMETER、http_HEADER、sent_http_HEADER
内置变量--nginx内置的
自定义变量---自己定义


## nginx模块
官方模块 和 第三方模块



