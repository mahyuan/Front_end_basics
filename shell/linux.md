# linux

## 文件格式
-rw-r-r--
```
一共有10位，第一位是文件类型，后面没三位代表一组
每三位一组， 相同权限的为一组，依次为：u 所有者, g所属组, o其他人
- 文件类型 (- 文件  d 目录  l 软连接文件)
rw-  r-- r--
u 所有者  g所属组  o其他人
r read  w write x 执行(excute)
eg:
-rw-r--r--   1       root    wheel     515B  7 13  2015     afpovertcp.cfg
类型 权限		1引用计数	所属root 所属组root 文件大小  最后修改时间       文件名
```

### chmod
两种设置方法，一种是数字，一种是符号。
- 数字方式
r:4; w:2; x:1

```
chmod 777 shell.sh # 统一授权方式，使用三位数字代表权限，每一位代表一个组，三个组都授权为7（rwx）
chmod u+x shell.sh # 给u组增加权限x
# 数字0 ~ 7代表含义
0: ---   000
1: --x   001
2: -w-   010
3: -wx   011
4: r--   100
5: r-x   101
6: rw-   110
7: rwx   111
```
可以看出规律，每一组的权限按照从左到右的排序依次是rwx,按三个二进制位排序，哪一位为一就代表该位有权限

ls 命令的选项详解
-a
-l (lang) (ll)
-d 查看目录属性
-h  人性化显示文件大小
-i 显示inode

- 符号方式
> chmod [u|g|o|a] [+|-|=] [r|w|x] 文件或目录

eg:
```sh
chmod a-x /root/test
```

### chown
改变文件属住和属组

> chown [-R] 参数
> chown [-R]... [所有者][:[组]] 文件...

eg:
```sh
chown -R mhy:mhy ~/.ssh
```
把`.ssh`的所有者和组都改成了mhy


选项：
-R 或 --recursive 递归处理，该文件夹下所有子目录和文件都一起处理
--reference=<参考文件或目录>   把指定文件或目录的拥有者与所属群组全部设成和参考文件或目录拥有者与所属群组相同

参数：
用户：组   指定所有者和所属组， 当省略组，仅改变所有者
文件      文件列表，可使用shell通配符改变多个
```sh
chown -R mhy /home/mhy/*
```
### chgrp
更改文件属组

> chmod [-R] 数组名 文件名


## 文件处理命令
> mkdir -p [目录名]
-p 递归创建（先建立上一级目录）
```sh
cd ~  (当前用户的家目录，如果是root用户，则是在/root， 其他用户家目录在/home/username)
cd .
cd ..
cd - #进入上一次目录
```
- 相对路径和绝对路径
```sh
pwd
# 下面的命令都需要接文件路径，统一用 [path] 代替
rmdir  #删除空白目录，如果有子文件则无法删除，不常用
rm [path] #删文件或目录
rm -rf [path] #强制删除目录
rm -r [path] #删除目录 # 会有确认提示
rm -f [path] #强制删除，不会提示
```
- cp  复制文件或目录
> cp [选项] 需要复制的路径  目标位置

```sh
cp -r [path] #复制目录
cp -p [path] #连带文件属性复制
cp -d [path] #若源文件是链接文件则复制链接属性
cp -a [path] #相当于 -pdr
```

> mv [源文件位置] [目标位置]

### 常用目录
系统命令目录
```sh
/bin
/sbin
/usr/bin
/usr/sbin
sbin下只有root权限可以执行， 其他两个所有不需要root

/boot 启动目录
/etc 默认配置文件目录
/lib 函数库
/media 挂载移动盘
/mnt 挂载磁盘
/sys /proc  内存相关的目录
/tmp 临时目录
/usr 系统软件资源目录
	/usr/bin 系统命令(普通用户)
	/usr/sbin 系统命令(root)
/var 系统相关的文档内容
```
## 链接命令(link)
>ln -s [原文件]] [目标文件]

-s 生成软连接 不带s则生成 硬链接

### 硬链接：
 - 拥有相同的i节点和存储block块，可以看成是同一个文件
 - 可通过i节点识别
 - 不能跨分区
 - 不能针对目录使用
 - 删除一个，另一个还在（通过i节点识别）

### 软链接：
 - 类似windows的快捷方式
 - 软链接有自己的i节点和block块，数据只保存在原文件的文件名和i节点，并没有实际的文件数据
 - lrwx-----  第一个l表示软链接
 - 修改原文件，改任何一个的都会改变，
 - 删除原文件，软链接不能使用（硬链接不影响使用）
 - 删除软链接可以使用原文件
 - 软链接的权限777，但是实际权限是原文件的权限
 - 创建软链接时原文件必须写绝对路径

### 查看i节点
```sh
ls -i
```

## 文件搜索命令

- 文件搜索命令: locate
- 文件搜索命令: find
- 命令搜索命令: whereis, which
- 字符串搜索命令: grep

### locate
```
locate 文件名
```
在后台数据库按文件名搜索，速度快, locate命令搜索的数据库是 `/var/lib/locate`，
每天更新一次，所有新建文件后可以强制更新该数据库：
```sh
updatedb
```
或者
```sh
locate locate
```

 - 只能按文件名搜索
 - 配置文件: /etc/updatedb.conf
 - 配置里面的选项是不搜索的文件系统
 - MAC系统和linux系统的locate有差异

### whereis (where), which
- whereis 查看执行位置和帮助文档位置

选项：
 - -b 只查找可执行文件
 - -m 之查找帮助文件

- which 查看命令的可执行位置和别名

**只能查外部安装的命令，需要执行文件的命令**

搜索依赖于环境变量 $PATH

### find
文件搜索命令, 很强大
> find [搜索范围] [搜索条件]

eg:
```sh
find / -name nginx.conf
find ~/.ssh -name config
```
避免大范围搜索，很消耗系统资源。
find是在系统中搜索符合条件的文件名，如果需要匹配，使用通配符匹配，通配符是完全匹配.

- 通配符：
```sh
* 匹配任意内容
? 匹配任意一个字符
[] 匹配任意一个中括号内的字符
```

选项：
 - -name  按名称
 - -iname 不区分大小写按名称
 - -user  按所有者搜索
 - -nouser 查找没有所有者的文件（内核文件没有所有者，u盘的数据可能没有所有者，windows文件没有所有者）
 - -mtime 查找限定时间前修改的文件 默认是天

eg：
```sh
find /var/log/ -mtime +10 #查找10天前修改的文件
```
 - -10 10天内
 - 10 10天当天
 - +10 10天前
 - -atime 文件访问时间
 - -ctime 改变文件属性
 - -mtime 修改文件内容

```sh
find / -size 25k #查找文件大小是25kb的文件
```
 - —25 小于25kb
 - 25kb 等于25kb
 - +25kb 大于25kb
```sh
find / -size +25k -a -50k # 大于25k 且 小于50k
find / -size -25k -o +50k # 小于25k 或 大于50k

find / -size 25k -exec ls -lh {} \; #查找，并显示详细信息
```
查找到的文件执行后面的操作 -exec:
```sh
-exec ... {} \;  #标准格式
find . -inum 262422 #查找i节点是262422的文件
# k字节小写， M字节大写
ls -i 文件名
```

### grep命令
在指定文件中搜索字符串
> grep [选项] 字符串 文件名

选项：
 - -i 忽略大小写
 - -v 排除指定字符串， 取反搜索

eg:
```sh
grep "size" file_name
grep "size" file1 file2 file3  #多文件搜索

# 标记匹配颜色 --color=auto 选项：
grep "size" file_name --color=auto

# 使用正则表达式 -E 选项：
grep -E "[1-9]+"
# 或
egrep "[1-9]+"

# 只输出文件中匹配到的部分 -o 选项：
echo this is a test line. | grep -o -E "[a-z]+\."
```

### grep 和 find 区别
 - find 在系统中搜索文件名，通配符匹配， 通配符是*完全匹配*
 - grep 在文件中搜索字符串，可以使用正则匹配，正则是*包含匹配*

## 帮助命令
### man
 man 命令
- 查看有哪些级别:
man -f 命令  == whatis 命令
- 查看指定级别:
man -5 passwd
man -4 null
man -8 ifconfig
- 查看所有含有命令关键词的信息:
man -k 命令

### 其他帮助命令
- 选项帮助: --help
命令帮助选项
- shell内部命令： help
获取shell内部的帮助，shell有自带的一些命令，比如cd,help
可以通过whereis cd 确定是否是shell内部命令，看可执行文件
help cd #command not found: help
- info

## 压缩命令
- 常营压缩格式：
```
.zip  .gz  .bz2
.tar.gz  .tar.bz2
```
**linux文件不区分后缀名，但是压缩文件为了区分文件类型和压缩类型，必须要在后缀中写清楚格式**
按压缩格式来记命令

### zip
- 压缩文件：
> zip 压缩文件名  源文件

- 压缩目录“
> zip -r 压缩文件名  源目录

- 解压缩：
> unzip 压缩文件

### gzip
- 压缩为.gz格式文件，源文件会消失：
> gzip 源文件
- 压缩为.gz格式，源文件保留：
> gzip -c 源文件 > 压缩文件

eg：
```sh
gzip -c a.js > a.js.gz
```
实际上是把源文件输出到新的文件

- 压缩目录
压缩目录实际上是把目录内的文件全部压缩
> gzip -r 目录

压缩目录下所有子文件，但是不能压缩目录

- 解压缩文件
> gzip -d 压缩文件
> gunzip 压缩文件

- 解压缩目录
> gunzip -r 压缩目录

### .bz2 （不能压缩目录）
压缩文件：
> bzip2 文件名
> bzip2 -k 文件名

解压缩文件：
 - -k 保留压缩文件

> bzip2 -d 压缩文件
> bunzip2 压缩文件

**上面三个压缩命令只有zip可以压缩没有了， gzip压缩目录实际上是压缩了目录内的文件，bz2直接回报错，可以用tar命令打包，然后再压缩**

### 打包命令 tar
tar命令可以打包也可以解压缩，功能非常强大，选项很多，可以查看相关[文档](http://man.linuxde.net/tar)，这里总结一下用的比较多的情况。
> tar 选项 参数

选项：
 - -c 或 --create: 打包，建立新的备份文件
 - -C <目录>: 大写C后面跟一个目录，可以解压到指定的目录下
 - -f 指定打包后的文件名
 - -x 或 --extract 或 --get: 从备份文件中还原文件
 - -v 或 --verbose: 显示过程
 - -z 或 --gzip 或 --ungzip: 通过`gzip`指令处理备份文件
 - -Z 或 --compress 或 --uncompress: 通过`compress`指令处理备份文件
 - -r: 添加文件到已压缩的文件
 - -u: 添加改变了和现有的文件到已经存在的压缩文件
 - -j: 支持bzip2(即bz2格式)解压文件
 - -k: 保留原有文件不被覆盖
 - -m: 保留文件不被覆盖
 - -p: 保留原文件权限
 - --exclude=<范本样式>: 排除符合范本样式的文件，可以是文件名，也可以加通配符
 - -N <日期格式> 或 --newer=<日期格式>: 只将较指定日期更新的文件保存在备份文件里

还有一些不常用的选项，这里不列举了。

#### 常见使用实例:
- 打包
> tar 选项 包名 源文件

```sh
tar -cvf log.tar log180922.log #仅打包，不压缩
tar -zcvf log.tar.gz log180922.log #打包后，以gzip压缩
tar -jcvf log.tar.bz2 log180922.log #打包后，以bzip2压缩
```
选项 `-f` 需要制定打包后的文件名，如果没有选项，则打包格式为`tar 源文件`， 所以包名必须在源文件名的前面因为选项与它的参数之间不能有其它的对象(可以有其他选项)。这样写就比较清楚了：
```sh
tar -f 包名 -cv 源文件名
```
打包后的包名可以随便取，但是为了自己或者其他人能识别文件类型最好加上后缀。
 - .tar: 包
 - .tar.gz 或 .tar.tgz: gzip压缩包
 - .tar.bz2: bzip压缩包

- 打包多个文件：
源文件名用空格连接， 如果要压缩则添加压缩类型选项-z或-j。
```sh
tar -cvf totle.tar linux.md shell.md string.sh
```
- 备份文件时排除部分文件
```sh
tar --exclude scf/service -zcvf scf.tar.gz scf/*
```
- 文件备份下来，并且保存其权限：
```sh
tar -zcvpf log31.tar.gz log2014.log log2015.log log2016.log
```
- 只将tar内的部分文件解压出来：
```sh
tar -zxvf /opt/soft/test/log30.tar.gz log2013.log
```
- 在文件夹当中，比某个日期新的文件才备份：
```sh
tar -N "2012/11/13" -zcvf log17.tar.gz test
```

- 解压
```sh
tar -zxvf vim.tar.gz
```

- 查看包里面内容不解压：
选项：
 - -t 查看包里面内容不解压

查看包内有哪些文件时，必须加 -t选项， 因为后面跟的是包名，所有 -f 选项也需要加上， -v选项可以看到文件的详细信息(效果类似ls 和 ls -la)。
需要注意的一点是，如果-f选项和其他选项写在一起，如 -zcvf， -f选项必须写在最后，因为-f选项后面必须跟包名。
查看包细节-z和-j选项加上与非貌似没有区别。
eg:
```sh
tar -tvf vim.tar.gz
```

**总结**
> 压　缩：tar -jcv -f filename.tar.bz2 要被压缩的文件或目录名称
> 查　询：tar -jtv -f filename.tar.bz2
> 解压缩：tar -jxv -f filename.tar.bz2 -C 欲解压缩的目录





**Linux最常用的压缩格式是.tar.gz和.tar.bz2**

## Linux的关机和重启命令
- shutdown [选项] 时间
选项：
 -c 取消前一个挂机命令
 -h 关机
 -r 重启
时间：
	now 立即执行
eg:
	shutdown -h 2:33 # 2:32 关机
	shutdown -r now
shutdown 命令可以正确保持关机前的文件，比较安全
**以下命令关机不安全**
- halt
- poweroff
- init 0
重启：
- reboot
- init 6
reboot 是比较安全的重启方式
退出登录：
- logout

## 挂载命令
查询系统中挂载的点：
mount
依据/etc/fstab文件自动挂载：
mount -a

挂载命令格式：
mount [-t 文件系统] [-o 特殊选项] 设备文件名 挂载点
选项：
 -t 文件系统：eg:ext3,ext4, ios9660....
 -o 特殊选项：可以指定挂载的额外选项
挂载光盘(先要插入光盘或者虚拟机导入iso镜像):
1.建立挂载点：
mkdir /mnt/cdrom/
2.挂载光盘
mount -t iso9660 /dev/cdrom/ /mnt/cdrom/
3.简写（默认的文件系统）
mount /dev/sr0 /mnt/cdrom
4.卸载命令：
umount 设备名或挂载点
umount /mnt/cdrom
5.挂载U盘:
fdisk -l # 查看U盘设备文件名
mount -t vfat /dev/sdb1 /mnt/ust/

## 远程登录y用户信息查看
- w
`w` 命令查看系统远程登录用户信息，包括系统资源
- who
`who` 命令查看系统远程登录用户信息，功能和w命令类似，不过没有系统资源信息
- last
last命令默认是读取`/var/log/wtmp`文件的数据。
命令输出： 用户名  登录终端 登录ip 登录时间 退出时间(在线时间)
- lastlog
查询所有用户的最后一次登录
