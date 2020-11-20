# XMLHttpRequest

XMLHttpRequest对象最开始是微软提出的一个接口，后来W3C将它写进了标准
> [https://www.w3.org/TR/XMLHttpRequest/](https://www.w3.org/TR/XMLHttpRequest/)
> [https://xhr.spec.whatwg.org/](https://xhr.spec.whatwg.org/)

## XMLHttpRequest标准分为Level1 和Level2

XMLHttpRequest Level 1主要存在以下缺点：

- 受同源策略的限制，不能发送跨域请求；
- 不能发送二进制文件（如图片、视频、音频等），只能发送纯文本数据；
- 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；

那么Level 2对Level 1 进行了改进，XMLHttpRequest Level 2中新增了以下功能：

- 可以发送跨域请求，在服务端允许的情况下；
- 支持发送和接收二进制数据；
- 新增formData对象，支持发送表单数据；
- 发送和获取数据时，可以获取进度信息；
- 可以设置请求的超时时间；

```js
function ajax(method = "GET", ur) {
  const formData = new FormData();
  formData.append('username', 'bob');
  formData.append('id', '3123123');

  const xhr = new XMLHttpRequest();
  xhr.timeout = 3000;
  xhr.responseType = 'json';
  xhr.open(method, url, true); // 采用异步
  xhr.onload = (e) => {
     // this : xhr
    if(this.status === 200 || this.status === 304) {
      console.log(this.responseText);
    }
  }
  xhr.ontimeout = function(e) {

  }
  xhr.onerror = function(e) {

  }
  xhr.onprogress = function(e) {

  }

  xhr.send(formData);
}

```

## 设置request header

在发送ajax请求时，可能需要设置请求头如`content-type`、`connection`、`cookie`、`accept-xxx`等，
xhr提供了`xhr.setRequestHeader`方法允许我们修改请求头。

语法：
```
setRequestHeader(DOMString header, DOMString value)
```
- 第一个参数header名大小写不敏感
- content-type的默认值和具体发送的数据类型有关
- setRequestHeader必须位于open方法之后，send方法之前
- setRequestHeader可以调用多次，最终的值不会采用覆盖的方式，而是采用追加的方式。
```js
var client = new XMLHttpRequest();
client.open('GET', 'demo.cgi');
client.setRequestHeader('X-Test', 'one');
client.setRequestHeader('X-Test', 'two');
// 最终request header中"X-Test"为: one, two
client.send();
```

## 获取response header

`getAllResponseHeaders`和`getResponseHeader(DOMString header)`

W3C标准中对这两个方法有限制，客户端无法获取response中的Set-Cookie，Set-Cookie2这两个字段 。
跨域方面客户端获取的字段仅限于Cache-Control,Content-Language,Content-Type,Expires,Last-Modified,Pragma, Access-Control-Expose-Headers

## 指定xhr.response的数据类型

```
xhr.responseType
```
支持的类型有：text, document,json,blob,arrayBuffer等

获取response数据，responseType，responseXML，response

设置请求超时时间
xhr.timeout
默认为0，即不设置超时，单位毫秒

发送同步请求: open方法第三个参数async, 默认为true，即异步，设置同步需要显示设置为true。

获取上传、下载速度
在onprogress事件回调event对象上有totalSize, position, langthComputable （javascript高级程序设计）
loaded, total（MDN）
chrome87版本浏览器打印出的属性有: langthComputable, total, loaded, percent

实际开发中以loaded和total为准


https://segmentfault.com/a/1190000004322487#articleHeader13
