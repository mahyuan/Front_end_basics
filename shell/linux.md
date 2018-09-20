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

ls 命令的选项详解
-a
-l (lang) (ll)
-d 查看目录属性
-h  人性化显示文件大小
-i 显示inode

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
-s 生成软连接
