## mongodb roles

document

[https://docs.mongodb.com/manual/reference/method/js-role-management/](https://docs.mongodb.com/manual/reference/method/js-role-management/)

| name   | desc |
|--------|-------|
|db.createRoles() | Create a role and specifies its privileges.|
|db.dropRole() | Deletes a user-defined role|
|db.dropAllRoles()  | Deletes all user-defined roles associatted with a database. |
|db.getRole() | Returns information for the specified role. |
|db.getRoles() | Returns information for all the user-defined roles in a database. |
|db.grantPrivilegesToRole() | Assigns privileges to a user-defined role. |
|db.revokePrivilegesFromRole() | Removes the specified privileges from a user-defined role. |
|db.grantRolesToRole() | 	Specifies roles from which a user-defined role inherits privileges. |
|db.revokeRolesFromRole() | Removes inherited roles from a role. |
|db.updateRole() | 	Updates a user-defined role. |

一般而言， mongodb内置的role够用了，在用户特别多的企业应用中可以根据业务实际情况自定义一些role
