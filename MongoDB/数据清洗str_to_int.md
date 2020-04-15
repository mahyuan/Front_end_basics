https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/

- $type: 类型

Type	Number	Alias	Notes
Double	1	“double”
String	2	“string”
Object	3	“object”
Array	4	“array”
Binary data	5	“binData”
Undefined	6	“undefined”	Deprecated.
ObjectId	7	“objectId”
Boolean	8	“bool”
Date	9	“date”
Null	10	“null”
https://docs.mongodb.com/manual/reference/operator/query/type/index.html

```
db.getCollection('video_info').find({}).sort({view_count: -1}).limit(50)
db.video_info.find().sort({collection: 1}).limit(20)

db.video_info.find({like: {$type: 2}}).forEach(function(x) {
    x.like = Number(x.like)
    db.video_info.save(x)
})

db.getCollection('product').find({'deal' : { $type : 2 }}).forEach(function(x) {
    x.deal = NumberInt(x.deal);
    db.getCollection('product').save(x);
})
db.video_info.find().sort({like: -1})
db.video_info.find({_id: ObjectId('5e81a4a5cd6041ec4e009054')})
db.video_info.find({_id: ObjectId('5e81a4a5cd6041ec4e009054')}).forEach(function(x) {
    x.like = NumberInt(x.like)
    db.video_info.save(x)
  })



db.video_info.find({_id: ObjectId('5e81a4a5cd6041ec4e009054')}).forEach(function(x) {
    x.like = NumberInt(x.like)
    db.video_info.save(x)
  })
```
