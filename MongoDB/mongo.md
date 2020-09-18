## mongod 命令

常用的配置项有：
--config <filename>, -f <filename>
--auth
--noauth
--transitionToAuth
--fork
--verbose, -v
--port <port>
--bind_ip <hostnames|ipaddresses|Unix domain socket paths>
--logpath <path>
--keyFile <file>

## mongo 命令

### 连接mongo shell方式：

```sh
mongo
mongo <dbname>

mongo "mongodb://mongodb0.example.com:27017/testdb?tls=true"

mongo "mongodb://mongodb0.example.com.local:27017,mongodb1.example.com.local:27017,mongodb2.example.com.local:27017/?replicaSet=replA"

mongo --host mongodb0.example.com:27017 [additional options]

mongo --host mongodb0.example.com --port 27017 [additional options]

```

--port <port>
--host <hostname>
```sh
mongo mongodb1.example.net/test
mongo mongodb1/admin
mongo 10.8.8.10/test
# srv
# <replSetName>/<hostname1><:port>,<hostname2><:port>,<...>
mongodb+srv://server.example.com/?connectionTimeout=3000ms
```
--username <username>, -u <username>
--password <password>, -p <password>¶
```sh
mongo -u admin -p 123
mongo -u admin -p # 不指定password会使用提示符方式
```



--authenticationDatabase <dbname>
--authenticationMechanism <name>
Default: SCRAM-SHA-1


[TLS配置项较多，参考文档](https://docs.mongodb.com/manual/reference/program/mongo/#cmdoption-mongo-authenticationmechanism)
--tls  支持TLS/SSL方式
--tlsCAFile <filename>
--tlsCRLFile <filename>

