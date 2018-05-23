macx下安装
```sh
sudo brew install mongodb
```
创建数据库存储目录
```sh
sudo mkdir -p /data/db
```
先启动mongodb服务器, 默认数据库目录即为 /data/db
```sh
sudo mongod
# 如果没有创建全局路径 PATH，需要进入以下目录
cd /usr/local/mongodb/bin
sudo ./mongod
```
然后再打开一个终端启动mongodb
```sh
mongo
# 如果没有创建全局路径 PATH，需要进入以下目录
cd /usr/local/mongodb/bin 
./mongo
```
如果你的数据库目录不是/data/db，可以通过 --dbpath 来指定。




