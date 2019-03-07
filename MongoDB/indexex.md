# mongodb中的索引

## 索引种类
- _id索引： _id索引是绝大多数数据库默认建立的唯一索引
- 单建索引：单键索引是最普通的索引，单键索引不会自动创建
- 多键索引：多键索引和单键索引创建形式相同，区别在于字段的值，单键的值是单一的值，如数字、字符串等，多键索引的值具有多个值，如数组
- 复合索引：当查询条件不只有一个时，需要建立复合索引
- 过期索引：在一段时间后会过期的索引，在索引过期后，相应的数据会被删除，适合存储一些在一段时间后失效的数据如用户的登录信息、存储的日志的等
- 全文索引：对字符串与字符串数组创建全文可搜索的索引，适用情况：
- 地理位置索引: 将一些点的位置存储在mongodb中，创建索引后，可以按照位置来查询其他点


建立索引使用ensureIndex方法，参数为`{queryName: 1}`参数值可谓 1 或 -1，分别代表升序和降序
```js
db.dbname.ensureIndex({name: 1})
```
获取当前的索引信息,返回的是一个索引的数组，默认有一条_id的索引
```js
db.dbname.getIndexes()
```

多键索引可以使用多个参数进行查询：
```js
db.dbname.ensureIndex({x: 1, y:1})
```

过期索引创建, 需要第二个参数expireAfterSeconds，单位是秒。
过期索引字段的值必须是指定的时间类型，必须是ISODate或者ISODate数组，不能使用时间戳，否则不会自动删除，
如果指定了ISODate数组，则按照最小的时间进行删除，即数组里面最小的时间到了就删除。
删除时间不是精确到，因为删除需要时间，所以删除时间不是精确的。
```js
db.dbname.ensureIndex({x: 1}, {expireAfterSeconds: 10})
```

## 全文索引
```js
{author: '', title: '', article: ''}
```
创建全文索引：
```js
// 在key字段创建了全文索引
db.dbname.ensureIndex({key: 'text'})
// 在多个字段上创建了全文索引
db.dbname.ensureIndex({key_1: 'text', key_2: 'text'})
// key不再是某个具体的值，用$**代替集合中所有字段，创建一个包含所有字段的全文索引
db.dbname.ensureIndex({'$**': 'text'})
```
每个集合只允许创建一个全文索引。
使用全文索引，不在指定对应的Key。
```js
// 只查一个关键词
db.t1.find({'$text': {$search: 'hello'}})
// 查多个关键词用空格隔开，是或的关系
db.t1.find({'$text': {$search: 'hello world'}})
// 不包含某个关键词可以在前面加 -， 与的方式
db.t1.find({'$text': {$search: 'hello -world'}})  // 含有hello 且 不含有world的
// 多个关键词与的关系查询，必须使用引号包含起来，需要转义
db.t1.find({'$text': {$search: "\"hello\" \"world\""}})
```

全文索引相似度：
$meta操作符：`{score: {$meta: "textScore"}}`
写在查询条件后面可以返回返回结果的相似度。
与sort一起使用，可以达到很好的实用效果。
```js
db.t1.find({"$text": {$search: "aa bb cc"}}, {score: {$meta: "textScore"}})
db.t1.find({"$text": {$search: "aa bb cc"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})
```
 全文索引的使用限制：
每次查询只能指定一个$text；
$text查询不能出现在$nor查询中；
查询中如果包含了$text, hint不再起作用；
全文缩影还不支持中文

索引属性：
name指定：
```js
db.dbName.ensureIndex({param}, {param})
```
第二个参数是索引的属性，比较重要的属性：
名字，唯一性，稀疏性，是否定是删除
默认的索引名字是key_1或key_-1,如果有多个key时名字很不好看，所以可以在创建索引时指定名字。
名字，name指定
```js
db.collection.ensureIndex({author: 1}, {name: 'normoal_author'})
```
索引的唯一性，unique指定
```js
db.collection.ensureIndex({author: 1}, {unique: true})
```
稀疏性，sparse指定
```js
db.collection.ensureIndex({}, {sparse: true})
```
为不存在的字段是否创建索引
```js
db.t1.find({m: {$exists: true}})
```
是否定时删除，expireAfterSeconds指定

## 地理位置索引
子分类：
- 2d索引，用于存储和查找平面上的点
- 2dsphere索引，用于存储和查找球面上的点

查找方式：
1，查找距离某个点一定距离内的点
2.查找包含在某区域内的点

### 2d索引
2d索引的创建方式：
```js
db.collection.ensureIndex({w: '2d'})
```
位置表示方式：经纬度[经度，纬度]
取值范围：经度[-180， 180]， 纬度[-90，90]
```js
db.location.ensureIndex({'w': '2d'})
db.location.insert({w: [10, 20]})
```
查询方式：
(1): $near查询： 查询距离某个点最近的点, 默认返回100个，可以使用$maxDistance: 10限制距离
(2): $geoWithin查询： 查询某个形状内的点
```js
db.location.find({w: {$near: [10, 20]}})
db.location.find({w: {$near: [1, 0], $maxDistance:15}})
```
形状的表示：
1.$box: 矩形，使用`{$box: [ [<x1>, <y1>], [<x2>, <y2>] ]}`表示
2.$center: 圆形， 使用`{$center: [[<x1>, <y1>], r]}`表示
3.$polygon: 多边形， 使用`{$polygon: [[<x1>, <y1>], [<x2>, <y2>], [<x3>, <y3>]]}`表示
```js
db.location.find({w: {$geoWithin: {$box: [[0, 0], [3, 3]]}}})
db.location.find({w: {$geoWithin: {$center: [[0, 0], 10 ]} }})
db.location.find({w: {$geoWithin:  {$polygon: [[0, 0], [10, 10], [10, -10]] }}})
```
(3): geoNear查询：geoNear使用runCommand命令进行使用，常用使用如下
```js
db.runCommand(
  {
    geoNear: collectionName,
    near: [x, y],
    minDistance: (对2d索引无效)，
    maxDistance: 100,
    num: 10
  }
)
// eg:
db.runCommand({geoNear: 'location', near: [10, 10], maxDistance: 100, num: 1})
```

### 2dsphere索引
概念：球面地理位置索引
创建方式： `db.collection.ensureIndex({w: "2dsphere"})`
位置表示方式： GeoJSON: 描述一个点，一条直线，多边形等形状
格式： `{type: '', coordinates: [<coordinates>]}`
查询凡是与2d索引查询方式类似，支持$minDistance与$maxDistance， 还支持查询两个多边形的交叉点

## 索引构建情况分析
- 索引的好处：
加快索引相关的查询

- 索引的不好处：
增加磁盘空间消耗，降低写入性能

评判工具：
1.mongostat工具
2.profile集合
3.日志
4.explain分析

mongostat工具是MongoDB自带的运行状态的工具, 使用说明： `mongostat -h 127.0.0.1:12345`
具体情况可以查阅相关文档。

profile集合
db.system.profile.find().sort({$natural: -1}).limit(1)
profile集合一般在测试或上线后监控阶段使用，会影响系统性能，平时不建议使用

mongodb日志
启动Mongod时 `verbose = vvvvv`参数是关于日志的， v越多详细度越高

explain操作
```js
db.collection.find().explain()
```

## 索引总结
1.不同类型索引的创建和查询
2.如何评价当前系统的索引构建情况
3.如何优化mongodb的索引使用
4.全文索引的使用限制

