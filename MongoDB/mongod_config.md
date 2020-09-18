## mongod config

mongod启动服务时可以使用选项参数，也可以指定配置文件


## /etc/mongod.conf

配置文件中使用auth自动开启auth鉴权

mongodb3配置文件：
```conf
port = 12345
dbpath = data
logpath = log/mongod.log
bind_ip = 127.0.0.1
verbose = vvvvv
fork = true
auth = true
```

mongodb4之后的版本配置文件格式:
```conf
# /etc/mongod.conf

# for documentation of all options, see:
#   http://docs.mongodb.org/manual/reference/configuration-options/

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

# Where and how to store data.
storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true
#  engine:
#  wiredTiger:

# how the process runs
processManagement:
  fork: true  # fork and run in background
  pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo

# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.
  #bindIp: 127.0.0.1  # Enter 0.0.0.0,:: to bind to all IPv4 and IPv6 addresses or, alternatively, use the net.bindIpAll setting.

#  tls:
 #     mode: requireTLS
  #    certificateKeyFile: /etc/ssl/mongodb/mongodb.pem


# 开启权限验证
security:
  authorization:  enabled

#operationProfiling:

#replication:

#sharding:

## Enterprise-Only Options

#auditLog:

#snmp:
```


## ~/.dbshell

类似于 .bash_history, ~/.dbshell保存了mongo shell中的操作指令
所以，为了保证安全，使用 db.auth时应该省略第二个参数password，使用提示符的方式输入密码，4.4之后的版本省略第二个参数后回自动调用提示符方式，4.2版本必须使用 `db.auth( <username>, passwordPrompt() )` 调用提示符
db.createUser同理，密码输入应该调用`passwordPrompt()`

## ~/.mongorc.js

启动mongo shell时， .mongorc.js会被自动执行，可以使用 mongo  --norc 选项禁用


