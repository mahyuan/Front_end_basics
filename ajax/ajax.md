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

```javascript
if (request.status === 200) {
  console.log(request.responseText);
}
```

```javascript
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

## 监测进度
XMLHttpRequest 提供了各种在请求被处理期间发生的事件以供监听。这包括定期进度通知、 错误通知，等等。

支持 DOM 的 progress 事件监测之于 XMLHttpRequest 传输，遵循 Web API 进度事件规范 : 这些事件实现了 ProgressEvent 接口。


```javascript
var req = new XMLHttpRequest();

req.addEventListener("progress", updateProgress, false);
req.addEventListener("load", transferComplete, false);
req.addEventListener("error", transferFailed, false);
req.addEventListener("abort", transferCanceled, false);

req.open();

...

// progress on transfers from the server to the client (downloads)
function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = evt.loaded / evt.total;
    ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  alert("The transfer is complete.");
}

function transferFailed(evt) {
  alert("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
  alert("The transfer has been canceled by the user.");
}
```
注意： 你需要在请求调用 open() 之前添加事件监听。否则 progress 事件将不会被触发

progress 事件同时存在于下载和上传的传输。
下载相关事件在 XMLHttpRequest 对象上被触发，就像上面的例子一样。
上传相关事件在 XMLHttpRequest.upload 对象上被触发，像下面这样：

```javascript
var req = new XMLHttpRequest();

req.upload.addEventListener("progress", updateProgress);
req.upload.addEventListener("load", transferComplete);
req.upload.addEventListener("error", transferFailed);
req.upload.addEventListener("abort", transferCanceled);

req.open();
```
progress 事件在使用 file: 协议的情况下是无效的。

使用 loadend 事件可以侦测到所有的三种加载结束条件（abort、load、error）：

```javascript
req.addEventListener("loadend", loadEnd, false);

function loadEnd(evt) {
  alert("The transfer finished (although we don't know if it succeeded or not).");
}
```

## 提交表单和上传文件

XMLHttpRequest 的实例有两种方式提交表单：

- 使用 AJAX
- 使用 FormData API
第二种方式（ 使用 FormData API ）是最简单最快捷的，但是缺点是被收集的数据不是字符串形式的。
第一种方式反而是最复杂的但也是最灵活和最强大。

### 只使用 XMLHttpRequest
在大多数用例中，提交表单时即便不使用 FormData API 也不会要求其他的 API。唯一的例外情况是，如果你要上传一个或多个文件，你需要额外的 FileReader API。

提交方法简介：
一个 html <form> 可以用以下四种方式发送：

- 使用 POST 方法，并设置 enctype 属性为 application/x-www-form-urlencoded (默认)
- 使用 POST 方法，并设置 enctype 属性为 text/plain
- 使用 POST 方法，并设置 enctype 属性为 multipart/form-data
- 使用 GET 方法（这种情况下 enctype 属性会被忽略）
现在，我们提交一个表单，它里面有两个字段，分别被命名为 foo 和 baz。如果你用 POST 方法，那么服务器将会接收到一个字符串类似于下面三种情况之一，其中的区别依赖于你采用何种编码类型：

- 方法: POST;
- 编码类型: application/x-www-form-urlencoded (default):
```js
Content-Type: application/x-www-form-urlencoded

foo=bar&baz=The+first+line.&#37;0D%0AThe+second+line.%0D%0A
```
- 方法: POST;
- 编码类型: text/plain:
```js
Content-Type: text/plain

foo=bar
baz=The first line.
The second line.
```
- 方法: POST;
- 编码类型: multipart/form-data:
```js
Content-Type: multipart/form-data; boundary=---------------------------314911788813839

-----------------------------314911788813839
Content-Disposition: form-data; name="foo"

bar
-----------------------------314911788813839
Content-Disposition: form-data; name="baz"

The first line.
The second line.

-----------------------------314911788813839--
```
相反的，如果你用 GET 方法，一个像下面这样的字符串将被简单的附加到 URL：
```js
?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
```


## 跨站的 XMLHttpRequest
现代浏览器可以通过执行 WebApps 工作小组通过的 Access Control for Cross-Site Requests 标注来支持跨站请求。只要服务器端的配置允许您从您的 Web 应用发送请求，就可以使用 XMLHttpRequest 。  否则，会抛出一个 INVALID_ACCESS_ERR 异常

## 绕过缓存
一般地，如果缓存中有相应内容， XMLHttpRequest 会试图从缓存中读取内容。绕过缓存的方法见下述代码：
```js
var req = new XMLHttpRequest();
req.open('GET', url, false);
req.channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
req.send(null);
```
Note: This approach will only work in Gecko-based software, as the channel attribute is Gecko-specific.

或者还有一个跨浏览器兼容的方法，就是给 URL 添加时间戳。请确保你酌情地添加了 "?" or "&" 。例如，将：

```js
http://foo.com/bar.html
```
改为

```js
http://foo.com/bar.html?12345
```
以及将

```js
http://foo.com/bar.html?foobar=baz
```
改为

```js
http://foo.com/bar.html?foobar=baz&12345
```
因为本地缓存都是以 URL 作为索引的，这样就可以使每个请求都是唯一的，也就可以这样来绕开缓存。

你也可以用下面的方法自动更改缓存：
```js
var req = new XMLHttpRequest();
req.open("GET", url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), false);
req.send(null); 
```

##安全性

要启用跨站脚本，推荐的做法是对 XMLHttpRequest 的响应使用 the Access-Control-Allow-Origin 的 HTTP 头。





