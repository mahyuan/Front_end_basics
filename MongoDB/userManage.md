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
## db.createUser()
## db.updateUser()
## db.dropUser()
## db.dropAllUser()
## db.getUser()
## db.getUsers()
## db.grantRolesToUser()
## db.removeUser()
## db.revokeRolesFromUser()
## passwordPrompt()

