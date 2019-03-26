# jade 模板引擎

## 命令行用法

```sh
jade [options] file
-P pretty 输出格式化的html文件
-w watch 开启热更新

jade -w -P ./temp.jade
```
语法：
1.标签属性用括号括起来，用等号连接属性名和属性值 空格连接标签内容
2.使用缩进控制标签父子关系
3.使用标签后加一个点然后折行缩进来展示大段多行文本,如下，如果文本中含有html标签，则可以使用原生的标签即可
div.
  1.222
  2.333
  3.444
  5.ddsf
  6.bb<strong>b</strong>
```
或者全部使用缩进方式来显示多行文本中含有标签的语境, 前面需要加符号”|“表示这是文本
```jade
div
  |  1.222
  strong 2.333
  | 3.444
  | 5.ddsf
  6.bb<strong>b</strong>
```
注释：
当行注释加双斜线
```jade
// span.hee hee
h3 hello
//- #id.classname
h3 块注释
//-
  p
    hello
    world
```
申明变量
```jade
//- 申明
- var jade = "jade var"
//- 使用
#{jade}
```
命令行传递数据
```sh
# 使用 --obj选项 加数据，数据必须用引号括起来，可以传json对象
jade temp.jade -P -w  --obj '{"name": "jade demo", "desc": "learning jade template language, demo"}'
# 读取Json文件
jade temp.jade -P -w  -O data.json
```
jade里面变量读取数据
```jade
//- 转义
- var data = '<script>alert(1)</script>'
p #{data}
//- 不转义
p !{data}
//
p= data

p!= data
p \#{data}
p \!{data}
```
