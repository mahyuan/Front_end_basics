# mongodb学习笔记
macx下安装
```sh
sudo brew install mongodb
```
创建数据库存储目录
```sh
sudo mkdir -p /data/db
```
先启动mongodb服务器, 默认数据库目录即为 /data/db
```sh
sudo mongod
# 如果没有创建全局路径 PATH，需要进入以下目录
cd /usr/local/mongodb/bin
sudo ./mongod
```
然后再打开一个终端启动mongodb
```sh
mongo
# 如果没有创建全局路径 PATH，需要进入以下目录
cd /usr/local/mongodb/bin
./mongo
```
如果你的数据库目录不是/data/db，可以通过 --dbpath 来指定。

linux下安装方式根据版本不同，有好几种， 家里ubuntu 18.04虚拟机上还没安装好，这个整理好了再说


创建数据库
如果存在则切换，不存在则创建
```
use DATABASE_NAME
```
显示所有数据库
```
show dbs
```
发现刚刚创建的数据库没有有显示出来，可以插入数据
```
db.runoob.insert({"name":"mhyuan"})
```
然后执行`show dbs`发现刚刚创建的数据库显示出来了

删除数据库
以下命令删除的是当前的数据库，如果要删除非当前数据库需要先使用`use DATABASE_NAME`命令切换过去，然后执行以下命令
```
db.dropDatabase()
```
创建集合
```
db.createCollection(name, optipon)
```
name: 集合名称
options： 可选参数对象，有以下选项
	capped: 布尔 (可选)， 如果为true则创建固定集合，是指有固定大小的集合，当达到最大值时会自动覆盖最早的数据， 当该值为true时，必须指定size参数
	autoIndexId: 布尔 （可选）如果为true，则自动在_id字段创建索引，默认为false
	size: 数值 （可选） 固定集合指定一个最大值， 单位是字节
	max: 数值 （可选） 固定集合中包含的文档的最大数量

查看集合
查看当前数据库的已有集合
```
show collections
```
eg:
```
db.createCollection("my_test_coll1", { capped: true, autoIndexId: true, size: 6142800, max : 10000 })
```
在mongodb中也可以通过直接插入数据创建集合
```
db.my_test_coll2.insert({"name": "mhyuan", "age": 22})
```
删除集合
```
db.COLLECTION_NAME.drop()
```
如果删除成功返回true，否则返回false

插入文档
BSON是一种类json的一种二进制形式的存储格式,简称Binary JSON。mongodb中所有存储在集合中的数据都是BSON结构。
```
db.COLLECTION_NAME.insert(document)
```
eg:
```
db.col.insert({title: 'MongoDB 教程',
    description: 'MongoDB 是一个 Nosql 数据库',
    by: 'mhy',
    url: 'http://www.mhynet.cn',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
})
```
可以将数据定义成一个变量，然后插入
```
document=({title: 'MongoDB 教程',
    description: 'MongoDB 是一个 Nosql 数据库',
    by: 'mhy',
    url: 'http://www.mhynet.cn',
    tags: ['mongodb', 'database', 'NoSQL'],
    likes: 100
});
```
然后
```
db.col2.insert(document)
```
也可以执行
```
db.col.save(document)
```
如果不知道_id字段则效果和insert一样，如果指定了_id，则会更新该_id的数据

更新文档
mongodb使用updata()和save()方法更新数据
update()方法用于更新已存在的文档
```
db.collection.update(
	<query>,
	<update>,
	{
		upsert: <boolean>,
		multi: <boolean>,
		writeConcern: <document>
	}
)
```
参数说明：
query: update的查询条件，类似于SQL update 的where后面的
update: update的对象和一些更新的操作符（如$,$inc...），也可以理解为SQL update 查询内set后面的
upsert: 可选， 如果不存在update的记录，是否插入数据， true为插入， 默认为false
multi: 可选， mongodb默认为false，只更新找到的第一条记录，如果这个参数为true，就把按条件查出来的多条记录全部更新
writeConcern: 可选，抛出异常的级别
这里列一个更新数据的例子：
```
db.col.insert({'title: 'mhyuan'})
db.col.find()
db.col.update({'title':'mhyuan'},{$set:{'title':' He's learning MongoDB'}})
db.col.find()
```
save()方法
save方法通过传入的文档来替换已有文档
```
db.collection.save(
	<document>,
	{
		writeConcern: <document>
	}
)
```
参数说明：
document: 文档数据
writeConcern: 可选， 抛出异常的级别


在3.2版本开始，MongoDB提供以下更新集合文档的方法：

db.collection.updateOne() 向指定集合更新单个文档
db.collection.updateMany() 向指定集合更新多个文档

删除文档
remove() 方法有用于删除集合中的所有数据， 执行remove之前先执行find方法判断执行条件是否正确
```
db.collection.remove(
	<query>,
	<justOne>
)
```
2.6版本以后：
```
db.collection.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)
```
```
db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)
```
参数说明：
query :（可选）删除的文档的条件。
justOne : （可选）如果设为 true 或 1，则只删除一个文档。
writeConcern :（可选）抛出异常的级别。

删除所有数据
```
db.collecation.remove({})
```

新方法
现在官方推荐使用`deleteOne()` 和 `deleteMany()`方法
删除集合下全部文档
```
db.inventory.deleteMany({})
```
删除status="A"的全部文档
```
db.inventory.deleteMany({ status: "A" })
```
删除status="D"的一个文档
```
db.inventory.deleteOne({status: "D"})
```

查询文档
查询文档使用`find()`方法
```
db.collection.find(query, projection)
```
参数说明：
query： 可选参数， 查询他条件
projection： 可选，使用投影操作符指定返回的键。查询时返回文档中所有键值，只需省略该参数即可（默认省略）。
如果你需要以易读的方式来读取数据，可以使用`pretty()` 方法，语法格式如下：
```
db.col.find().pretty()
```
`pretty()`方法以格式化的方式来显示所有文档。
```
 db.col.find().pretty()
 {
        "_id" : ObjectId("56063f17ade2f21f36b03133"),
        "title" : "MongoDB 教程",
        "description" : "MongoDB 是一个 Nosql 数据库",
        "by" : "菜鸟教程",
        "url" : "http://www.runoob.com",
        "tags" : [
                "mongodb",
                "database",
                "NoSQL"
        ],
        "likes" : 100
}
```
除了 find() 方法之外，还有一个 findOne() 方法，它只返回一个文档。


