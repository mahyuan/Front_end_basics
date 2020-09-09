# 爬虫

## 使用docker安装mongo
```sh
docker pull mongo
docker run -itd --name mongo -p 27017:27017 mongo --auth
docker exec -it mongo mongo admin
# 创建一个名为 admin，密码为 123456 的用户。
# db.createUser({ user:'admin',pwd:'123456',roles:[ { role:'userAdminAnyDatabase', db: 'admin'}]});
# 尝试使用上面创建的用户信息进行连接。
# db.auth('admin', '123456')

# 连接地址：
# mongodb://localhost:27017/spider

mongo 127.0.0.1/dbmame -uadmin -p

```


