# ajax

## XMLHttpRequest 对象

先创建一个XMLHttpRequest对象实例
```javascript
function reqListener() {
	console.log(111)
}

let oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "https://mhynet.cn", true);
oReq.send();
```

open(method, path, async) 方法有三个参数，第三个参数的值决定通过XMLHttpRequest生成的请求以异步模式还是同步模式获取数据, false为同步，true为异步
使用异步模式的话,当数据完全请求回来以后,会执行一个指定的回调函数, 在执行请求的同时,浏览器会正常的执行其他事务的处理.
```javascript
oReq.send(null)
```

send() 方法参数null表示GET请求不需要请求实体

```js
if (request.status === 200) {
  console.log(request.responseText);
}
```

```js
var oReq = new XMLHttpRequest();
oReq.open("GET", "http://www.mozilla.org/", true);
oReq.onreadystatechange = function (oEvent) {
  if (oReq.readyState === 4) {
    if (oReq.status === 200) {
      console.log(oReq.responseText);
    } else {
      console.log("Error", oReq.statusText);
    }
  }
};
oReq.send(null);
```
第三行为onreadystatechange事件句柄指定了回调函数,函数在每次执行时,检查请求是否结束(请求状态为4),如果是的话,判断请求是否成功(HTTP状态吗是否为200),如果是的话,输出页面源码,如果请求出现了错误,输出错误信息.

第十二行发送该请求.onreadystatechange事件句柄指定的回调函数会在每次请求状态发生改变时执行.