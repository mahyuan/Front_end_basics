# rewrite规则

配置语法：
```
Syntax: rewrite regex replacement [flag];
Default: --
Context: server, location, if

write ^(.*)$ /pages/maintain.html break;
```

正则表达式：
符号 | 含义
-----|-----
. | 除空白外的所有字符
( ) | 用于匹配括号之间的内容，通过$1, $2 调用

```
if ($http_user_agent ~ MSIE) {
  rewrite ^(.*) /msie/$1 break;
}
```
