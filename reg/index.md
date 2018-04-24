```js
reg.replace(/(\d{5})\d*(\d{4})/, "$1*******$2")
mobile.replace(/(\d{3})\d*(\d{4})/, "$1****$2"
```


```js
'ababf'.replace(/(ab){1,2}/, '√'); // √f
'abbbf'.replace(/ab{1,2}/, '√'); // √bf
'fdsabab'.replace(/(ab){1,2}$/, '√'); // fds√  
'ababsdf'.replace(/^(ab){1,2}/, '√');  //√sdf
'a cat, a fat cat'.replace(/\b/, '#'); // '#a cat, a fat cat'
' a cat , a dog '.replace(/cat|dog/, '#'); //' a # , a dog '  只匹配第一个

```
