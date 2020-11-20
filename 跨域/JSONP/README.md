# JSONP 跨域

JSONP方式跨域曾经是非常流行的一种跨域方式，在cors大行其道的现在，JSONP方式任然在某些情况下非常便利


JSONP跨域方式的原理与CORS不同，CORS使用了特定的http请求头告诉浏览器该请求是安全的;
JSONP的原理是利用了script标签跨域加载不同域资源的特性。使用JSONP需要与服务端确定一个回调函数，该函数作为script标签src链接的参数传给后端，后端使用该参数作为方法名并调用，传入数据，浏览器在加载完数据后回立即执行该回调函数。


```js
var script = document.createElement('script')
script.src = 'http://www.example.com/userInfo?callback=handler'
function handler(resp) {
  const data = JSON.parse(resp)
  // ....
}
document.body.inserBefore(script, document.body.firstChild)
```
服务端传回的数据：
```js
const Koa = require("koa");
const fs = require("fs");
const app = new Koa();
app.use(async (ctx, next) => {
    if (ctx.path === "/api/jsonp") {
      const { cb }= ctx.query
      const data = {
        username: 'jack',
        age: 22,
        city: 'BJ'
      }
      ctx.body = `${cb}(${JSON.stringify(data)})`;
      return;
    }
});
app.listen(8080);
```

jquery封装的JSONP：
```js
$.ajax({  
  url: "http://localhost:8080/api/jsonp",
  dataType: "jsonp",    
  type: "get",  
  data: {      
    msg: "hello"  
  },   
   jsonp: "cb",   
  success: function(data) {    
    console.log(data);  
  }  
});
```

