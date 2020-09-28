# user management methods

[mongodb文档](https://docs.mongodb.com/manual/reference/method/js-user-management/)

| Name	|  Description |
|-------|------|
| db.auth() |	Authenticates a user to a database. |
| db.changeUserPassword() |	Changes an existing user’s password. |
| db.createUser() |	Creates a new user. |
| db.dropUser() |	Removes a single user. |
| db.dropAllUsers() |	Deletes all users associated with a database. |
| db.getUser() |	Returns information about the specified user. |
| db.getUsers() |	Returns information about all users associated with a database. |
| db.grantRolesToUser() |	Grants a role and its privileges to a user. |
| db.removeUser() |	Deprecated. Removes a user from a database. |
| db.revokeRolesFromUser() |	Removes a role from a user. |
| db.updateUser() |	Updates user data. |
| passwordPrompt() |	Prompts for the password as an alternative to specifying passwords directly in various  |mongo shell user authentication/management methods.

## db.auth()

db.auth方法用于连接到mongo shell之后进行授权。

db.auth方法在4.0， 4.2， 4.4 版本前后都有一些变更，但是都支持明文方式输入密码：
```sh
db.auth(<username>, <password>)
```
也支持对象方式：
```sh
db.auth( {
   user: <username>,
   pwd: passwordPrompt(),   // Or "<cleartext password>"
   mechanism: <authentication mechanism>,
   digestPassword: <boolean>
} )
```

差异：
- 4.2 之后支持提示符方式
```sh
db.auth( <username>, passwordPrompt() )
```
- 4.4之后省略password参数时会自动使用提示符方式，不必传入passwordPrompt()
```
> db.auth('admin')
Enter password:
```

- 注：
mongo命令支持选项进行授权：
```sh
mongo --username <username> --password  --authenticationDatabase test --authenticationMechanism SCRAM-SHA-256
```
选项参考文档： https://docs.mongodb.com/manual/reference/program/mongo/#cmdoption-mongo-authenticationmechanism

## db.changeUserPassword()

```sh
db.changeUserPassword(<username>, <password>)
```
<password>可以是明文密码，也可以是passwordPrompt() 提示符方法（4.2版本之后才支持）。类似于 .bash_history，mongo shell也有专门记录操作命令的文件，一般是在 ~/.dbshell文件中，如果使用明文输入密码，密码有暴露的风险.

## db.createUser()

```sh
db.createUser(user) # user 是一个文档
```
user如下：
```js
{
  user: "<name>",
  pwd: passwordPrompt(),      // Or  "<cleartext password>"
  customData: { <any information>},
  roles: [
    {role: "<role>", db: "<database>"} | "<role>",
    ...
  ]
}
```
以上字段基本上都是必选的，除此之外还有 `authenticationRestrictions`、 `mechanisms`、 `passwordDigestor`， 用于设置加密方式，校验方式等。
`customData`对象内可以写任意合法的json数据，通常用于描述性说明。
`roles`是一个数组，其内容可以是`{db: 'dbname', role: 'roleName'}`格式的对象，也可以是单个role的名称，不知道db时默认该角色适用于其他数据库，为通用权限.
eg
```sh
use products
db.createUser( {
    user: "accountAdmin01",
    pwd: passwordPrompt(),  // Or  "<cleartext password>"
    customData: { employeeId: 12345 },
    roles: [ { role: "clusterAdmin", db: "admin" },
            { role: "readAnyDatabase", db: "admin" },
            "readWrite"] },
  { w: "majority" , wtimeout: 5000 } )
```

权限校验方面也可以进行配置，如以下用户限制该用户只能在IP地址192.0.2.0连接到IP地址198.51.100.0时进行身份验证。
```
use admin
db.createUser(
   {
     user: "restricted",
     pwd: passwordPrompt(),      // Or  "<cleartext password>"
     roles: [ { role: "readWrite", db: "reporting" } ],
     authenticationRestrictions: [ {
        clientSource: ["192.0.2.0"],
        serverAddress: ["198.51.100.0"]
     } ]
   }
)
```

## db.updateUser()

```
db.updateUser(
  "username",
  {
    pwd: passwordPrompt(),  // Or  "<cleartext password>"
    customData: {},
    roels: []
  }
)
```

注意createUser和updateUser的语法差异。

## db.dropUser()

db.dropUser用于删除用户。
```
db.dropUser(username)
```

## db.dropAllUser()

删除当前数据库所有用户时可以使用：
```
use production
db.dropAllUser()
```

## db.getUser()

查看用户：
```
db.getUser(username)
```

## db.getUsers()

```
db.getUsers()
db.getUsers({ filter: { mechanisms: "SCRAM-SHA-256" } })
```

## db.grantRolesToUser()

为用户授予权限

```
db.grantRolesToUser('username', [<role> | {db: 'dbname', role: 'readWrite'}])
db.grantRolesToUser('username', ['readWrite', 'dbAdmin'])
db.grantRolesToUser('username', [{role: 'readWrite', db: 'admin'}])
```
```js
"roles" : [
    { "role" : "assetsReader",
      "db" : "assets"
    },
    { "role" : "read",
      "db" : "stock"
    },
    { "role" : "readWrite",
      "db" : "products"
    }
]
```

## db.revokeRolesFromUser()

和 grantRolesToUser功能相反，取消用户的授权

```
db.revokeRolesFromUser('username', [<roles>])
```
语法与grantRolesToUser相同。



## db.removeUser()

删除用户
```
use producton
db.removeUser('user1')
```

## passwordPrompt()

用户密码提示符输入。


