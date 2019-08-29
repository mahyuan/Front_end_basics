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

# ubuntu
configure arguments: --prefix=/etc/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --pid-path=/var/run/nginx.pid --lock-path=/var/run/nginx.lock --http-client-body-temp-path=/var/cache/nginx/client_temp --http-proxy-temp-path=/var/cache/nginx/proxy_temp --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp --http-scgi-temp-path=/var/cache/nginx/scgi_temp --user=nginx --group=nginx --with-compat --with-file-aio --with-threads --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_mp4_module --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-mail --with-mail_ssl_module --with-stream --with-stream_realip_module --with-stream_ssl_module --with-stream_ssl_preread_module --with-cc-opt='-g -O2 -fdebug-prefix-map=/data/builder/debuild/nginx-1.16.1/debian/debuild-base/nginx-1.16.1=. -fstack-protector-strong -Wformat -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -fPIC' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -Wl,--as-needed -pie'


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

```
➜  nginx sudo vi /etc/hosts
➜  nginx sudo vi nginx.conf
➜  nginx sudo nginx -tc /etc/nginx/nginx.conf
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
➜  nginx sudo nginx -s reload
```
## nginx变量
http请求变量-- arg_PARAMETER、http_HEADER、sent_http_HEADER
内置变量--nginx内置的
自定义变量---自己定义


## nginx模块
官方模块 和 第三方模块
- sub_status
nginx的客户端状态
```
#编译选项：
--with-http_stub_status_module

# 配置语法：
synatx: stub_status;
default: ---
context: server, location

# 配置
  # stub_status;
  location /mystatus {
      stub_status;
  }
```
在浏览器中打开 http://localhost/mystatus即可看到nginx的状态
```
Active connections: 2
server accepts handled requests
 137 137 374
Reading: 0 Writing: 1 Waiting: 1
```

- random_index
在目录中选择一个随机的主页
```
# 编译选项
--with-http_random_index-module

# 语法
Syntax: random_index on | off;
Default: random_index off;
Context: location

# 配置
location / {
  root /usr/local/var/www/random;
  random_index on;
  # index index.html index.htm;
}
```
需要注意的是，该模块不识别隐藏文件

- sub_module
http内容替换，response内容替换
```
# 编译选项
--with-http_sub_module

# 语法1, 把string 替换为 replacement， 位置可以选择http,server 或 locaiton
Syntax: sub_filter string replacement;
default: --
Context: http, server, location

# 语法2， 用于服务端与浏览器端校验服务器的内容是否有更新，有更新返回最新内容，用于缓存场景
Syntax: sub_filter_last_modified on | off;
Default: sub_filter_last_modified off;
Context: http, server, location

# 语法3，匹配第一个还是匹配所有的
Syntax: sub_filter_once on | off;
Default: sub_filter_once on;
Context: http, server, location
```

## nginx请求限制模块
连接频率限制 -- limit_conn_module
请求频率限制 -- limit_req_module

### 连接频率限制
```
Syntax: limit_conn_zone key zone=name:size;
Default: --
Context: http

Syntax: limit_conn zone number;
Default: --
Context: http, server, location

http {
  limit_conn_zone $binary_remote_addr zone=conn_zone:1m;
  server {
    listen      80;
    server_name localhost;

    location / {
      limit_conn conn_zone 1;
    }
  }
}
```

### 请求频率限制
```
Syntax: limit_req_zone key zone=name:size rate=rate;
Default: --
Context: http
其中size单位可以为m(兆)，rate单位可以为r/s

Syntax: limit_req zone=name [burst=number] [nodelay];
Default: --
Context: http,server,location

http {
  limit_req_zone $binary_remote_addr zone=req_zone:1m rate=1r/s;
  server {
    listen      80;
    server_name localhost;

    location / {
      # limit_req zone=req_zone burst=3 nodelay;
      # limit_req zone=req_zone;
      limit_req zone=req_zone;
    }
  }
}
```

## 访问控制
基于IP的访问控制   -- http_acess_module
基于用户的信任登录  -- http_auth_basic_module

### http_acess_module
```
Syntax: allow address | CIDR | unix: | all;
Default: --
Context: http, server, locaton, limit_except

Syntax: deny address | CIDR | unix: | all;
Default: --
Context: http, server, locaton, limit_except

其中，CIDR: 网段

server {
  listen      80;
  server_name localhost;

  deny 192.168.1.1;
  deny 192.168.1.1/24; # ip段
  allow all;

  location / {
    root /usr/local/www;
    index index.html index.htm;
  }
}
```
**access_module局限性**
是根据remote_addr（ip地址）来限制的，对于经过代理的访问是无效的。
**解决方案**
- 采用x_forwarded_for
http_x_forwarded_for=Client IP, Proxy(1)Ip, Proxy(2)Ip (记录整个过程中的ip地址)
但是该请求头会被修改
- 结合geo模块
- 通过http自定义变量传递
把客户端的remote_addr携带在该变量上

### http_auth_basic_module
```
Syntax: auto_basic string | off;
Default: auth_basic off;
Context: http,server,location,limit_except

Syntax: auth_basic_user_file file; # 该文件存储用户名和密码信息
Default: --
Context: http,server,location,limit_except


location / {
  root /user/local/www;
  index index.html index.htm;
  auth_basic "Auth access test!input your passeard!";
  auth_basic_user_file /usr/local/www/auth_conf;
}
```
需要使用 htpasswd模块生成密码
```
htpasswd -c <path> <user>
```
**access_module局限性**
用户信息需要依赖文件方式；操作管理机械，效率低下
**解决方案**
- nginx结合LUA实现高效验证
- nginx结合LDAP打通，利用nginx-auth-ldap模块

