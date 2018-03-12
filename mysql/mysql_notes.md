# MySQL笔记

登录：
mysql -uroot -p

参数：
-D, --database=name 打开指定数据库
--detailmiter=name 指定分隔符
-h, --host=name 服务器
-p, --password[=name] 密码
-P, --port=# 端口号 （-P 大写的P）
--prompt=name 设置提示符
-u, --user=name 用户名
-V, --version 输出版本信息且退出

退出:
exit; quit; \q;

修改提示符:
登录的时候指定： mysql -uroot --prompt \h -p
登录后指定：
语法： prompt 提示符
参数：
\D 完整的日期；
\d 当前数据库
\h 服务器名称
\u 当前用户

常用命令：
1.显示当前服务器版本：
    select version();
2.显示当前日期时间:
    select now();
3.显示当前用户：
    select user();

语句规范：
1.关键字和函数名大写
2.数据库名称、表名称、字段名称小写
3.SQL语句必须以分号结尾


- 创建数据库
create {database | schema} [if not exists] db_name [default] character set [=] charset_name;
- 查看创建数据库的信息：
show create database db_name;
- 修改数据库
alter {database | schema} [db_name] [default] character set [=] charset_name;
- 删除数据库
drop {database | schema} [if exists] db_name;

## 数据类型
- 整型 无符号位是有符号位的2倍
 - tinyint -128~127,0-255 无符号位：2^8-1 1字节
 - smallint  2^16-1 2字节
 - mediumint 2^24-13字节
 - int 2^32-1 4字节
 - bigint 2^64-1 8字节

- 浮点型
 - float[M, D] 单精度  （M是数字总位数，D是小数点后面的位数）
 - double[M,D] 双精度

- 日期时间型
 - year (存储需求:) 1
 - time 3
 - date 3
 - datetime 8
 - timestamp 4

- 字符型
 - char(M) M个字节 0<M<=255 （定长，不足的位数用0补齐）
 - varchar(M) L+1个字节，其中 L<M && 0<M<=65535 （变长，字符多长存多长）
 - tinytext L +1 个字节，其中L<2E8
 - text L+2字节，其中L<2E16
 - mediumtext
 - longtext
 - enum('value1', 'value2', ...) 1或2个字节，取决于枚举值的个数（最多65535个值）
 枚举类型，从几个选项里面选择，如性别：男，女，保密
 - set('value1', 'value2', ...) 集合类型，从选项中选择任意（多）个选项

## 数据表操作
- 选择数据库
打开数据库后，使用`use`命令选择数据表。
use db_name;
- 查看打开的数据库
select database();
- 创建数据表
create table [if not exists] table_name (
    column_name data_type,
    ...
)

```sh
create table tb1(
    id int unsigned primary key auto_inscrement,
    username varchar(20),
    salary float(8,2)
);
```
- 查看数据表
show tables [from db_name] [like 'pattern' | where expr];
- 查看数据表结构 -列
show columns from tbl_name;
- 插入记录 -行
inset [into] tbl_name [(col_name,...)] values(val,...);
省略col_name时需要给所有的字段赋值。
- 记录查找
select expr,... from tbl_name;
(expr ----表达式）

## 约束
1.保证数据的完整性和一致性
2.约束分为表级约束和列级约束
3.约束类型包括：
 3.1 not null 非空约束
 3.2 primary key 主键约束
 3.3 unique key 唯一约束
 3.4 default 默认约束
 3.5 foreign key 外键约束

## 空值与非空
- null 字段可以为空
- not null 字段禁止为空
默认为null

## 自动编号 auto_increment
自动编号，必须与主键组合使用
默认情况下，起始值为1，增量为1

## 主键约束 primary_key
每张表只能有一个主键
主键保证记录的唯一性
主键自动为not null
auto_increment必须和主键一起使用,但主键不一定和auto_increment一起使用

## 唯一约束 unique key
唯一约束保证记录的唯一性
唯一约束的字段可以为空值
每张表可以保存多个唯一约束

## 默认值 default
插入记录时，如果没有明确为字段赋值，则自动赋予默认值
```sh
create table tb(
    id smallint unsigned auto_increment primary key,
    sex enum('男','女', '保密') default '保密'
);
```
## 外键约束 foreign key
保证数据的一致性和完整性
实现一对多或一对一关系

外键约束的要求：
1.父表和子表必须使用相同的存储引擎，禁止使用临时表
2.数据表的存储引擎必须为InnoDB
3.外键列和参照列必须具有相似的数据类型。其中数字的长度或是否有符号位必须相同。而字符的长度则可以不同。
4.外键列和参照列必须创建索引，如果外键列不存在索引的话，MySQL将自动创建索引。（参照列没有索引才自动创建索引，而外键列没有索引的话不自动创建索引）

如果存储引擎不是InnoDB，可以修改存储引擎，在配置文件my.ini中修改以下自段：
```ini
default-storage-engine=INNODB
```
实例：
```sh
create table provinces(
    id smallint unsigned primary key auto_increment,
    pname varchar(20) not null
);

create table users(
    id smallint unsigned primary key auto_icrement,
    username varchar(10) not null,
    pid smallint unsigned,
    foreign key(pid) references provinces (id)
);
```
## 查看索引
show indexes from users;
指定了主键和外键时会自动创建索引

## 外键约束的参照操作
- cascade：
 从父表删除或更新且自动删除或更新子表中匹配的行
- set null：
  从父表删除或更新行，并设置子表的外键列为null。 如果使用该选项，必须保证子列表没有指定的not null。
- restrict：
拒绝对父表的删除或更新操作
- no action：
标准SQL的关键字，在MySQL中与restrict相同
 ```sh
create table provinces(
    id smallint unsigned primary key auto_increment,
    pname varchar(20) not null
);

create table users(
    id smallint unsigned primary key auto_icrement,
    username varchar(10) not null,
    pid smallint unsigned,
    foreign key(pid) references provinces (id) on delete cascade
);
```
上面代码和之前的区别是在最后一行多出了`on delete cascade`字段，表示删除父表时子表也删除。

##表级约束和列级约束
对一个数据列建立的约束，称为列级约束；
对多个数据列建立的约束，称为表级约束；
列级约束就可以在列定义时声明，也可以在列定以后声明；
表级约束只能在列定以后声明。
实际开发中表级约束很少。

## 修改数据表
- 添加单列
alter table tbl_name add [column] col_name column_definition [first | after col_name];
- 添加多列
alter table tbl_name add [column] (col_name column_definition, ...);
区别： 添加多列不能指定添加位置，只能添加到所有列的最后。
- 删除列
alter table tbl_name drop [column] col_name;
altet table tbl_name drop [column] col_name1, drop col_name2,add (col_name3 column_definition);
可以删除多列，中间用逗号分隔，也可以同时添加列。

- 添加主键
alter table tbl_name add [constraint [symbol] primary key [index_type] (index_col_name, ...)];

- 添加唯一约束
alter table tbl_name add [constraint [symbol]] unique [index | key] [index_name] [index_type] (index_col_name,...);

- 添加外键约束
alter table tbl_name add [constraint [symbol]] foreign key [index_name] (index_col_name, ...) reference_definition;





























































































