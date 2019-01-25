# mongodb中的索引

## 索引种类
- _id索引： _id索引是绝大多数数据库默认建立的唯一索引
- 单建索引：单键索引是最普通的索引，单键索引不会自动创建
- 多键索引：多键索引和单键索引创建形式相同，区别在于字段的值，单键的值是单一的值，如数字、字符串等，多键索引的值具有多个值，如数组
- 复合索引：当查询条件不只有一个时，需要建立复合索引
- 过期索引：在一段时间后会过期的索引，在索引过期后，相应的数据会被删除，适合存储一些在一段时间后失效的数据如用户的登录信息、存储的日志的等
- 全文索引：对字符串与字符串数组创建全文可搜索的索引，适用情况：
- 地理位置索引


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

全文索引适用情况，
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

地理位置索引






