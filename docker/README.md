# docker 笔记

https://yeasy.gitbook.io/docker_practice/

```
docker run -itd --name mongo -v db-volume:/data/db  -p 27017:27017 mongo --auth
docker exec -it mongo mongo admin


```

修改用户权限：
```


```



```bash
docker run -itd  --name mongo \
    -p 27017:27017 \
    -v db-volume:/data/db \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=@38xg12g23SA \
    mongo


docker run -tid --name mongo \
    -p 27017:27017 \
    -v db-volume:/data/db \
    mongo -auth
```


resources

```
docker run -itd --name mongo -v db-volume:/data/db  -p 27017:27017 mongo --auth

docker exec -it mongo mongo admin
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

