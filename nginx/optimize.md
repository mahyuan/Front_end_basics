# nginx 架构及性能优化

## 性能优化
### 性能优化需要考虑的点
1.当前系统结构瓶颈，观察指标，压力测试
2.了解业务，接口业务类型、系统层次化结构
3.性能和安全

### ab接口压力测试工具
安装
```sh
yum install httpd-tools
```
使用
```sh
ab -n 2000 -c 2 http://127.0.0.1/
```
-n 总的请求次数
-c 并发数
-k 是否开启长连接


## 常见使用问题
- 多个server下相同域名的优先级

比如多个server下都配置了相同的域名mhynet.cn，哪个虚拟主机的优先级更高呢？
这种情况下，nginx -t 或 reload时会有warning，但是不影响检查和重启。

多个虚拟主机有相同域名时，优先使用最先读取到的配置。

- 多个location匹配优先级

|匹配字符 | 说明 |
|------- |-----|
|   =    | 进行普通字符精确匹配，也就是完全匹配 |
|  ^~    | 表示普通字符匹配，使用前缀匹配 |
| ~\~*   | 表示执行一个正则匹 |

~为区分大小写，~*为不区分大小写。^是前缀匹配。
前两个优先级最高，匹配到后不再向下查找，~\~*是正则匹配，匹配到后还会向下查找

- try_files使用

按顺序检查文件是否存在
```nginx
location / {
  try_files $uri $uri/  /index.html;
}

location / {
    try_files $uri $uri/ =404;
    index index.html;
}
```
`try_files $uri $uri/ /index.html`先根据`$uri`在root  路径下查找，如果没找到，就去`$uri/`目录下面找，如果还没找到， 就返回最后面的`/index.html`。

- alias和root
```nginx
location /request_path/image/ {
  root /opt/www/work;
}
```
root配置服务访问的根目录。
> web:   http://localhost/request_path/image/cat.png
> 服务器: /opt/www/work/request_path/image/cat.png

```nginx
location /request_path/image/ {
  alias /local_path/image/;
}
```
> web:   http://localhost/request_path/image/cat.png
> 服务器: /local_path/image/cat.png

- 获取用户真实ip

$remote_addr是访问当前服务器的客户端的ip, 如果客户端是代理，该变量的值为代理服务器的地址。
x-ford-for容易被篡改，很难获取到用户的真实ip。
可信的方案是设置x_real_ip请求头，会要求客户端发起请求是发送该信息。
  set x_real_ip=$remote_addr;
```nginx
location / {
  proxy_set_header    X-real-ip $remote_addr;
}
```

- 常见报错
413: Request Entity Too Larag
用户上传文件太大，client_max_body_size

502： bad gateway
后端无响应

504： Gateway Time-out
后端服务超时
