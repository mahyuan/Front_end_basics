
nginx 日志类型

error_log 
access_log


```
error_log /var/log/nginx/error.log warn;


//日志格式 mian 和下面的access_log 后面的 main 对应
log_mormat main '$remote_addr - $remote_user [$time_local] "$request"'
				'$status $body_bytes_sent "$http_referer"'
				'"$http_user_agent" "$http_x_forwarded_for"';

access_log /var/log/nginx/access.log main;
```
NGINX配置的格式中 $ 表示变量

