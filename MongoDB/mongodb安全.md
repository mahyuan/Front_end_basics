# mongodb安全楔子
按级别从高到低依次是：
1.最安全的是物理隔离： 不现实
2.网络隔离
3.防火墙隔离
4.用户名密码

用户名密码是安全最低的级别

- auth鉴权
配置文件中使用auth自动开启auth鉴权
```conf
port = 12345
dbpath = data
logpath = log/mongod.log
bind_ip = 127.0.0.1
verbose = vvvvv
fork = true
auth = true
```
1.创建用户
`createUser`语法（2.6之前的版本为addUser, 参数只有用户名和密码）
2.参数
```js
{
  user: '<name>',
  pwd: '<cleartext password>',
  customData: {<any information>},
  roles: [{role: "<role>", db: "<database>"}]
}
```
customData: 相当于描述
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


