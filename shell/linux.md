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
-rw-r--r--   1 root  wheel   515B  7 13  2015 afpovertcp.cfg
权限				1引用计数	所属root 所属组root 文件大小 最后修改时间  文件名
```
### chmod
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

### chown
改变文件所有者
chown [选项] 参数
选项：
-R 或 --recursive 递归处理
--reference=<参考文件或目录>   把指定文件或目录的拥有者与所属群组全部设成和参考文件或目录拥有者与所属群组相同

参数：
用户：组   指定所有者和所属组， 当省略组，仅改变所有者
文件      文件列表，可使用shell通配符改变多个

chown -R mhy /home/mhy/*

## 文件处理命令
mkdir -p [目录名]
-p 递归创建（先建立上一级目录）
cd ~  (当前用户的家目录，如果是root用户，则是在/root， 其他用户家目录在/home/username)
cd .
cd ..
cd - 进入上一次目录

相对路径和绝对路径

pwd
rmdir 删除空白目录，如果有子文件则无法删除，不常用

rm 删文件或目录
rm -rf  强制删除目录
rm -r 删除目录， 会有确认提示
rm -f 强制删除，不会提示

cp 复制文件或目录
cp [选项] 需要复制的路径  目标位置
cp -r 复制目录
cp -p 连带文件属性复制
cp -d 若源文件是链接文件则复制链接属性
cp -a 相当于 -pdr

mv [源文件位置] [目标位置]

### 常用目录
系统命令目录
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

## 链接命令(link)
ln -s [原文件]] [目标文件]
-s 生成软连接 不带s则生成 硬链接

### 硬链接：
	拥有相同的i节点和存储block块，可以看成是同一个文件
	可通过i节点识别
	不能跨分区
	不能针对目录使用
	删除一个，另一个还在（通过i节点识别）
### 软链接：
	类似windows的快捷方式
	软链接有自己的i节点和block块，数据只保存在原文件的文件名和i节点，并没有实际的文件数据
	lrwx-----  第一个l表示软链接
	修改原文件，改任何一个的都会改变，
	删除原文件，软链接不能使用（硬链接不影响使用）
	删除软链接可以使用原文件
	软链接的权限777，但是实际权限是原文件的权限
	创建软链接时原文件必须写绝对路径
查看i节点：
`ls -i`

## 文件搜索命令
- 文件搜索命令: locate
- 文件搜索命令: find
- 命令搜索命令: whereis, which
- 字符串搜索命令: grep

### locate
```
locate 文件名
```
在后台数据库按文件名搜索，速度快, locate命令搜索的数据库是 `/var/lib/locate`
每天更新一次，所有新建文件后可以强制更新该数据库：
```
updatedb
```
或者  `locate locate`

只能按文件名搜索
配置文件: /etc/updatedb.conf
配置里面的选项是不搜索的文件系统
MAC系统和linux系统的locate有差异

### whereis (where), which
whereis 查看执行位置和帮助文档位置
选项：
-b 只查找可执行文件
-m 之查找帮助文件
which 查看命令的可执行位置和别名
**只能查外部安装的命令，需要执行文件的命令**
搜索依赖于环境变量 $PATH

### find
文件搜索命令, 很强大
find [搜索范围] [搜索条件]
eg:
find / -name nginx.conf
find ~/.ssh -name config
避免大范围搜索，很消耗系统资源
find是在系统中搜索符合条件的文件名，如果需要匹配，使用通配符匹配，通配符是完全匹配
通配符：
```
* 匹配任意内容
? 匹配任意一个字符
[] 匹配任意一个中括号内的字符
```
选项：
-name  按名称
-iname 不区分大小写按名称
-user  按所有者搜索
-nouser 查找没有所有者的文件（内核文件没有所有者，u盘的数据可能没有所有者，windows文件没有所有者）
-mtime 查找限定时间前修改的文件 默认是天
eg：
find /var/log/ -mtime +10 #查找10天前修改的文件
-10 10天内
10 10天当天
+10 10天前
-atime 文件访问时间
-ctime 改变文件属性
-mtime 修改文件内容

find / -size 25k #查找文件大小是25kb的文件
—25 小于25kb
25kb 等于25kb
+25kb 大于25kb

find / -size +25k -a -50k # 大于25k 且 小于50k
find / -size -25k -o +50k # 小于25k 或 大于50k

find / -size 25k -exec ls -lh {} \; #查找，并显示详细信息

查找到的文件执行后面的操作 -exec:
-exec ... {} \;  #标准格式

find . -inum 262422 #查找i节点是262422的文件
k字节小写， M字节大写
ls -i 文件名

### grep命令
在指定文件中搜索字符串
grep [选项] 字符串 文件名
-i 忽略大小写
-v 排除指定字符串， 取反搜索
eg:
grep "size" file_name
grep "size" file1 file2 file3  #多文件搜索

标记匹配颜色 --color=auto 选项：
grep "size" file_name --color=auto

使用正则表达式 -E 选项：
grep -E "[1-9]+"
或
egrep "[1-9]+"

只输出文件中匹配到的部分 -o 选项：
echo this is a test line. | grep -o -E "[a-z]+\."

### grep 和 find 区别
find 在系统中搜索文件名，通配符匹配， 通配符是*完全匹配*
grep 在文件中搜索字符串，可以使用正则匹配，正则是*包含匹配*

