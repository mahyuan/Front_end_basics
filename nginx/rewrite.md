# rewrite规则

配置语法：
```
Syntax: rewrite regex replacement [flag];
Default: --
Context: server, location, if

write ^(.*)$ /pages/maintain.html break;
```

pcretest命令可以检测nginx rewrite正则

flag:
- last  停止rewrite检测
- break 停止rewrite检测
- redirect  返回302临时重定向，地址栏会显示跳转后的地址
- permanent 返回301永久重定向，地址栏会显示跳转后的地址

last和break的区别： 都会停止检测，区别是：last在匹配到后会进行rewrite，然后重新进行一次请求，而break会停止请求。


正则表达式：
符号 | 含义
-----|-----
. | 除空白外的所有字符
( ) | 用于匹配括号之间的内容，通过$1, $2 调用

```nginx
location / {
  rewrite ^/article-(\d+)-(\d+)-(\d+)\.html /articel/$1/$2/articel_$3.html break;
  if ($http_user_agent ~ MSIE) {
    rewrite ^(.*) /msie/$1 break;
  }

  if ( !-f $request_filename)  {
    rewrite ^/(.*)$  http://www.mhynet.cn/$1 redirect;
  }
}
```

- rewrite规则优先级
执行server块的rewrite指令
执行location匹配
执行选定的location块的rewrite指令

