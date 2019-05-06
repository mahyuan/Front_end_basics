# XSS 攻击
跨站脚本攻击 (Cross-site scripting) 简称： XSS， 是一种网站代码注入式的攻击方式。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。

> Cross-site scripting的英文首字母缩写本应为CSS，但因为CSS在网页设计领域已经被广泛指层叠样式表（Cascading Style Sheets），所以将Cross（意为“交叉”）改以交叉形的X做为缩写。但早期的文件还是会使用CSS表示Cross-site scripting。

## 检测方式
通常一些方法可以检测网站是否有正确处理特殊字符
- ><script>alert(document.cookie)</script>
- ='><script>alert(document.cookie)</script>
- "><script>alert(document.cookie)</script>
- <script>alert(document.cookie)</script>
- <script>alert (vulnerable)</script>
- %3Cscript%3Ealert('XSS')%3C/script%3E
- <script>alert('XSS')</script>
- <img src="javascript:alert('XSS')">
- <img src="http://888.888.com/999.png" onerror="alert('XSS')">
- <div style="height:expression(alert('XSS'),1)"></div>（这个仅于IE7(含)之前有效）

## 攻击手段和目的
攻击者使被攻击者在浏览器中执行脚本后，如果需要收集来自被攻击者的数据（如cookie或其他敏感信息），可以自行架设一个网站，让被攻击者通过JavaScript等方式把收集好的数据作为参数提交，随后以数据库等形式记录在攻击者自己的服务器上。

常用的XSS攻击手段和目的有：

- 盗用cookie，获取敏感信息。
- 利用植入Flash，通过crossdomain权限设置进一步获取更高权限；或者利用Java等得到类似的操作。
- 利用iframe、frame、XMLHttpRequest或上述Flash等方式，以（被攻击）用户的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作。
- 利用可被攻击的域受到其他域信任的特点，以受信任来源的身份请求一些平时不允许的操作，如进行不当的投票活动。
- 在访问量极大的一些页面上的XSS可以攻击一些小型网站，实现DDoS攻击的效果。

## 漏洞的防御和利用
### 过滤特殊字符
避免XSS的方法之一主要是将用户所提供的内容进行过滤，许多语言都有提供对HTML的过滤：
- PHP的htmlentities()或是htmlspecialchars()。
- Python的cgi.escape()。
- ASP的Server.HTMLEncode()。
- ASP.NET的Server.HtmlEncode()或功能更强的Microsoft Anti-Cross Site Scripting Library
- Java的xssprotect (Open Source Library)。
- Node.js的node-validator。

### 使用HTTP头指定类型
很多时候可以使用HTTP头指定内容的类型，使得输出的内容避免被作为HTML解析。如在PHP语言中使用以下代码：
```php
<?php
   header('Content-Type: text/javascript; charset=utf-8');
?>
```
即可强行指定输出内容为文本/JavaScript脚本（顺便指定了内容编码），而非可以引发攻击的HTML。

参考文件:
- [跨站脚本](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)
- [前端安全系列(1)：如何防止XSS攻击](https://segmentfault.com/a/1190000016551188)
