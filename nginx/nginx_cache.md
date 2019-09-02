# nginx cache

使用nginx代理的场景中的缓存分为服务端缓存、客户端缓存和代理缓存。

## 代理缓存
代理缓存的配置项较多
- 基础配置
```
Syntax: proxy_cache_path path [levels=levels]
[use_temp_path=on|off] keys_zone=name:size [inactive=time]
[max_size=size] [mananger_files=number] [manager_sleep=time]
[manager_threshold=time] [loader_files=number]
[loader_slee=time] [loader_threshold=time] [purger=on|off]
[purger_files=number] [purger_sleep=time]
[purger_threshold=time]
Default: ---
Context: http
```
上面的配置，一行代表一项配置
- 缓存过期周期配置:
```
Syntax: proxy_cache_valid [code...] time; # code 是状态码
Deafult: --
Context:http, server, location
```
- 缓存的维度：
```
Syntax: proxy_cache_key string;
Default: proxy_cache_key $schema$proxy_host$request_uri;
Context: http, server, location
```

- 缓存清理
方式1： rm -rf 清理缓存目录
方式2： 第三方模块 ngx_cache_purge

- 让部分页面不缓存
```
Syntax: proxy_no_cache string ...;
Default: --
Context:
```

- 缓存命中分析
方式1： 通过设置response的头信息 Nginx-Cache
`add_header Nginx-Cache "$upstream_cache_status";`
状态：
MISS | 未命中，请求被传送到后台处理
----|-----
HIT | 缓存命中
EXPIRED | 缓存过期，请求被传送到后台处理
UPDATING | 正在更新缓存，将使用旧的应答
STALE | 后端得到火气的应答

方式2： 通过设置log_formate（在log_formate中添加参数 '"$upstream_cache_status"' ），打印日志分析
缓存命中率 = HIT次数 / 总请求次数
实现方式： 分析nginx的access日志
使用awk命令
```
awk '{if($NF=="\"HIT\""){hit++}}END{printf "%.2f",hit/NR}' /var/log/nginx/access.log
```


