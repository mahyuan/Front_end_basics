# nginx平滑升级

1.新老版本nginx安装目录结构一致
2.老版本备份  nginx -> nginx.old, nginx启动目录文件会自动备份
3.重启进程采用reload的方式
nginx 采用reload方式重启可以避免正在访问的用户访问异常，升级后relaod重启，先升级master进程，然后新访问的用户由升级后的master进程产生新版本的work进程，旧版本的work进程在用户访问完成后会自动退出，新版本逐步接管nginx的进程

- 了解现有nginx的安装
- 按照原有的编译参数重新编译新版本
- reload服务

centos 7 使用 yum安装的nginx默认是在

使用 `rpm -qa nginx` 和 `rmp -ql nginx`查看安装位置
使用`nginx -V`查看nginx的编译参数和版本

如默认安装的nginx-16.1版本的编译参数为:
```
--prefix=/usr/share/nginx
--sbin-path=/usr/sbin/nginx
--modules-path=/usr/lib64/nginx/modules
--conf-path=/etc/nginx/nginx.conf
--error-log-path=/var/log/nginx/error.log
--http-log-path=/var/log/nginx/access.log
--http-client-body-temp-path=/var/lib/nginx/tmp/client_body
--http-proxy-temp-path=/var/lib/nginx/tmp/proxy
--http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi
--http-uwsgi-temp-path=/var/lib/nginx/tmp/uwsgi
--http-scgi-temp-path=/var/lib/nginx/tmp/scgi
--pid-path=/run/nginx.pid
--lock-path=/run/lock/subsys/nginx
--user=nginx
--group=nginx
--with-file-aio
--with-ipv6
--with-http_ssl_module
--with-http_v2_module
--with-http_realip_module
--with-stream_ssl_preread_module
--with-http_addition_module
--with-http_xslt_module=dynamic
--with-http_image_filter_module=dynamic
--with-http_sub_module
--with-http_dav_module
--with-http_flv_module
--with-http_mp4_module
--with-http_gunzip_module
--with-http_gzip_static_module
--with-http_random_index_module
--with-http_secure_link_module
--with-http_degradation_module
--with-http_slice_module
--with-http_stub_status_module
--with-http_perl_module=dynamic
--with-http_auth_request_module
--with-mail=dynamic
--with-mail_ssl_module
--with-pcre
--with-pcre-jit
--with-stream=dynamic
--with-stream_ssl_module
--with-google_perftools_module
--with-debug
--with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong
--param=ssp-buffer-size=4 -grecord-gcc-switches -specs=/usr/lib/rpm/redhat/redhat-hardened-cc1 -m64 -mtune=generic'
--with-ld-opt='-Wl,-z,relro -specs=/usr/lib/rpm/redhat/redhat-hardened-ld -Wl,-E'
```

下载nginx安装包，然后解压，cd 进解压后的目录，执行
```sh
./configure
```
后面跟上前面`nginx -V`打印出来的编译参数，如果有第三方模块要添加，使用`--add-module=/path/to/module`添加第三方模块，等号后面是第三方模块的目录，可以统一放在`/opt`或者`/tmp`等目录。
执行完成，且没有报错后
执行
```sh
make && make install
```sh
然后重启
```
nginx -s reload
```

[参考](https://www.imooc.com/article/73175)
