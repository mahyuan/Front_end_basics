# mongodb安全楔子
按级别从高到低依次是：
1.最安全的是物理隔离： 不现实
2.网络隔离
3.防火墙隔离
4.用户名密码

用户名密码是安全最低的级别

##  auth鉴权

配置文件中使用auth自动开启auth鉴权
```conf
auth = true

dbpath = data
port = 12345
logpath = log/mongod.log
bind_ip = 127.0.0.1
verbose = vvvvv
fork = true
```

mongodb4之后的版本配置文件格式:

```conf
# /etc/mongod.conf
# 开启权限验证
security:
  authorization:  enabled
```

### 创建用户

`createUser`语法（2.6之前的版本为addUser, 参数只有用户名和密码）

- 参数
```js
{
  user: '<name>',
  pwd: '<cleartext password>',
  customData: {<any information>},
  roles: [{role: "<role>", db: "<database>"} | "<role>"]
}
```
customData: 相当于描述

- 角色类型：

内建类型（read, readWrite, dbAdmin, dbOwner, userAdmin）
自定义类型：将各种小权限进行组合，创景新的角色类型

```js
db.createUser({user: 'mhy', pwd: '12345', customData: '示例'， roles: [{role: 'userAdmin', db: 'admin'}, {role: 'read', db: 'test'}]})
```
createUser和updateUser用于新建和更新用户，

### MongoDB用户角色

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


### changeUserPassword

`db.changeUserPassword(username, password)`

### dropUsrer

[db.dropUser()](https://docs.mongodb.com/manual/reference/method/db.dropUser/)

使用mongo进入终端后
```sh
# 使用mongo登录后默认为test库，切换到admin库
use admin

# 登录
db.auth('admin', '123456')

# 创建用户root，roles可以直接设置为root，表示授予所有权限
db.createUser({ user:"root", pwd: "123456", roles:["root"] }

# 创建管理员用户admin, admin库权限userAdminAnyDatabase
db.createUser({ user:'admin',pwd:'1234565',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});

# 创建数据管理员用户dbAdmin，admin库 dbAdmin， 其他库 readWrite
db.createUser({ user:'dbAdmin',pwd:'123456',roles:[ { role:'dbAdmin', db: 'admin'}, 'readWrite']});

# 更新用户root，roles设置为root和userAdminAnyDatabase
db.updateUser("root", {  customData : { desc: '超级用户' }, pwd:'654321',  roles: [ "root", "userAdminAnyDatabase" ]} )

# 删除test库的用户,删除具有userAdminAnyDatabase权限的用户之前，一定要确认还有其他用户有该权限，不然无法新建用户了
use test
db.dropUser('testAdmin')
# db.dropUser("reportUser1", {w: "majority", wtimeout: 5000})
```

### updateUser

```sh
db.updateUser(username, update, writeConcern)
```
如果仅仅需要更新用户的权限，使用`db.grantRolesToUser() `或`db.revokeRolesFromUser() `，更新用户密码使用`db.changeUserPassword()`

db.changeUserPassword(username, password)
