# docker 笔记

https://yeasy.gitbook.io/docker_practice/



resources

```
docker run -itd --name mongo -v db-volume:/data/db  -p 27017:27017 mongo --auth

docker exec -it mongo mongo admin
db.createUser({ user:'admin',pwd:'1234565',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
db.auth('admin', '123456')

db.createUser({ user:'root',pwd:'123456',roles:[ { role:'root', db: 'admin'}]});
db.createUser({ user:'dbAdmin',pwd:'123456',roles:[ { role:'dbAdmin', db: 'admin'}]});
```


 3.角色类型：
内建类型（read, readWrite, dbAdmin, dbOwner, userAdmin）
自定义类型：将各种小权限进行组合，创景新的角色类型
```js
db.createUser({user: 'mhy', pwd: '12345', customData: '示例'， roles: [{role: 'userAdmin', db: 'admin'}, {role: 'read', db: 'test'}]})
```

## MongoDB用户角色

1.数据库角色
- read
- readWrite
- dbAdmin
- dbOwner
- userAdmin

2.集群角色
- clusterAdmin
- clusterManager

3.备份角色
- backup
- restore

4.其他特殊权限
- DBAdminAnyDatabase

`createRole`创建角色

