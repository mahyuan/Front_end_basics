# ssi 模块

ssi模块可以使nginx处理文件内容，按配置文件对文件进行拼接

- ssi
语法： ssi [on | off]
默认值： ssi off
作用域： http, server, location

- ssi_silent_errors
语法： ssi_silent_errors [on | off]
默认值： ssi_silent_errors off
作用域： http, server, location

在处理ssi文件出错时不输出错误提示 "[an error occurred while processing the directive] "

- ssi_types
语法: ssi_types mime-type [mime-type ...]
默认值: ssi_types text/html
作用域: http, server, location

- ssi命令

```html
<!--# command parameter1=value1 parameter2=value2 -->
```
支持ssi的命令有：
```
block
include
SSI
```
更多内容参考 https://www.nginx.cn/doc/standard/httpssi.html

```conf
server {
  listen 80;
  server_name localhost;

  root /home/www;
  index index.html;
  location / {
    ssi on; # 默认off
  }
}
```

```html
<!-- index.html -->
 <html>
      <!--# include file="head.html" -->
     <body>
         <h1>welcome to <a href="//doc.mhynet.cn">doc.mhynet.cn</a></h1>
         <!--# include virtual="foot.html"  -->
     </body>
 </html>
```

```html
<!-- head.html -->
<head>
<meta charset="uft-8">
<title>this is title</title>
<style>
h1 {
  color: #333;
}
div {
  color: green;
}
footer {
  color: blue;
}
</style>
</head>
```
```html
<!-- foot.html -->
<footer>
this is footer
</footer>
```

访问 http://localhost返回
```html
<html>
    <head>
<meta charset="uft-8">
<title>this is title</title>
<style>
h1 {
  color: #888;
}
a {
font-style: italic;
	text-decoration: line-through;
}
div {
  color: green;
}
footer {
  color: blue;
}
</style>
</head>

	<body>
		<h1>welcome to <a href="//doc.mhynet.cn">doc.mhynet.cn</a></h1>
		<footer>
 footer
</footer>

 	</body>
</html>

```
