## https服务

### https服务介绍
http不安全，数据没有加密，会被中间人盗用，信息泄露，数据内容劫持，篡改

https: 会对数据进行加密，权限验证

对称加密： 加密密钥和解密密钥是一样的
非对称加密： 加密密钥和解密密钥不一样，即公钥和私钥

https: 同时用到了对称加密和非对称加密

客户端发起SSL连接，服务端发送CA签名证书给客户端，客户端对数字证书进行CA校验，只有校验成功则使用公钥加密，如果失败则停止绘画。
然后客户端发送对称密码（发送对称密码利用公钥加密）给服务端
利用对称秘钥传输数据。

通过CA签名证书，https避免了中间人的伪装攻击。

### https证书生成
生成秘钥和CA证书， 使用openssl命令，nginx使用https需要安装http_ssl_module模块， 使用以下命令检查是否安装了该模块：
```sh
nginx -V
# 打印的内容中有 --width-http_ssl_module
```
生成CA证书：
- 生成key秘钥
- 生成证书签名请求文件(csr文件)
- 生成证书签名文件（CA文件）

```sh
# 确认openssl安装，nginx安装了http_ssl_module模块
# rpm -qa | grep openssl

# 生成key， -idea 表示对称加密，-out key文件 1024是加密的位数，位数越大精度越高
openssl genrsa -idea -out mhynet.key 1024

# 使用刚才生成的key文件生成签名请求csr文件
openssl req -new -key mhynet.key -out mhynet.csr
# 执行过程中会要求输入一些信息，包括前一步命令的密码

# 生成签名证书，-days 选项填过期时间
openssl x509 -req -days 3650 -in mhynet.csr -signkey mhynet.key -out mhynet.crt
```
ssl证书已经生成好了。

### nginx配置ssl
语法：
```
Syntax: ssl on | off;
Default: ssl off;
Context: http, server

Syntax: ssl_certificate file;
Default: --
Context: http, server

Syntax: ssl_certificate_key file;
Default: --
Context: http, server
```
配置好以上三项，即可在nginx下搭建https服务。
以上三个选项中， ssl_certificate 填 crt或者pem文件， ssl_certificate_key填key文件。

对外的web服务，需要使用CA机构认证的证书，对内的服务可以使用以上步骤自己生成证书。

- 苹果要求的证书
  - 服务器所有连接使用TLS1.2以上版本(openssl 1.0.2)
  - https证书必须使用SHA256以上的哈希算法签名
  - https证书必须使用RSA 2048位或ECC 256位以上公钥算法
  - 使用向前加密技术

### https服务优化
- 激活keepalive长连接
- ssl_session_cache， ssl_session_time

ssl_protocols       TLSv1  TLSv1.1 TLSv1.2;
ssl_session_cache   shared:SSL:10m; # 10, 10兆
ssl_session_timeout 10m; # 10分钟





