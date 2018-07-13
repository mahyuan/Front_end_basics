## CORS 

全称“跨域资源共享 ”(Cross-origin resource sharing)
允许浏览器跨域访问资源，发出XMLHttpRequest请求， 克服ajax只能同源使用的限制。

实现CORS通信的关键是服务器，浏览器发现ajax请求跨域时会多出一次附加的请求，只要服务端实现了CORS接口，就可以跨域通信。


```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```


[阮一峰博客](http://www.ruanyifeng.com/blog/2016/04/cors.html)