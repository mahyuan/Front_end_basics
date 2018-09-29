# shell字符串操作

shell字符串操作（长度、读取、替换、 截取、连接、对比、删除、位置）

## 读取字符串变量
|表达式|含义|
|:---------------|:--------------|
|${var}        |   变量var的值，作用同$var      |
|${var-DEFAULT}|如果var没有被声明，就以$DEFAULT作为其值|
|${var:DEFAULT}|如果var没有被声明，或者其值为空，那么就以$DEFAULT作为其值|
|${var=DEFAULT}|如果var没有被声明，那么就以$DEFAULT作为其值|
|${var:=DEFAULT}|如果var没有被声明，或者其值为空，那么就以$DEFAULT作为其值|
|${var+OTHER}|如果var声明了，那么其值就是$OTHER,否则为null字符串|
|${var:+OTHER}|如果var被设置了，那么其值就是$OTHER,否则就为null字符串|
|${var?ERR_MSG}|如果var没被声明，那么久答应$ERR_MSG|
|${var:?ERR_MSG}|如果var没被设置，那么久答应$ERR_MSG|
|||
|${!varprefix*}|匹配之前所有以varprefix开头进行声明的变量|
|${!varprefix@}|匹配之前所有以varprefix开头进行声明的变量|

## 字符串操作
|表达式|含义|
|:---------------|:--------------|
|${#string}|$String的长度|
|${string:position}|在$string中，从$position位置开始*提取*子字符串|
|${string:position:length}|在$string中，从$position位置开始*提取*长度为$length的子字符串|
|||
|${string#substring}|从变量$string*开头*，*删除最短匹配*$substring的子串|
|${string##substring}|从变量$string开头，*删除最长匹配*$substring的子串|
|${string%substring}|从变量$string*结尾*，*删除最短匹配*$substring的子串|
|${string%%substring}|从变量$string的*结尾*，*删除最长匹配*$substring的子串|
|||
|${string/substring/replacement}|使用$replacement，来*替换* *第一个* 匹配的$substring|
|${string//substring/replacement}|使用$replacement，来替换 *所有* 匹配的$substring|
|${string/#substring/replacement}|如果$string的*前缀*匹配$substring，那么就用$replacement来替换匹配到的$substring|
|${string/%substring/replacement}|如果$string的*后缀*匹配$substring，那么就用$replacement来替换匹配到的$substring|

> $substring可以是正则表达式

关于*字符串位置*方面，必须从第一个字符开始或者从最后一个字符开始，可以这样记忆，`#`在左边，`%`在右边

*长度*：
获取字符串长度除了使用`${#变量}`，还有其他方法，比如:`wc -l`等。

*截取*：
截取字符串格式： `${变量:position:length}`, 其中`:position`是必须的，表示从左边开始的位置, `:length`是可选项，表示需要截取的长度，如果要截取到末尾则不加该选项。

*删除*
截取子串使用`#`或`%`确定开始位置，一个`#`或`%`表示最短匹配，两个表示最长匹配
- ${变量名#substring正则表达式}从字符串开头开始配备substring,删除匹配上的表达式。
- ${变量名%substring正则表达式}从字符串结尾开始配备substring,删除匹配上的表达式。
- 注意：${test##*/},${test%/*} 分别是得到文件名，或者目录地址最简单方法。

*替换*：
`${变量/查找/替换值}`,  一个`/`表示替换第一个， `//`表示替换所有， `/`需要加转义符.
如果需要确定前后位置，可以在`/`后面加`#`或`%`表示。


