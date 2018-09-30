#!/bin/bash
# 第一行告诉系统其后路径所指定的程序即是解释此脚本的shell程序
# 拓展名并不影响脚本执行，见名知意就好，一般为.sh
echo "hello mhy"


# 变量定义直接写变量名，自定义变量默认是当前程序的global(全局)变量，变量名和等号之间不能有空格, 因为 系统命令是空格连接的，会误以为是系统命令
# 命名规则和其他语言类似
#WORLD
#PPP
#MAC_PRO
#_yours
#it2
your_name="mhy"
echo $your_name
echo ${your_name}

# 变量类型: 默认所有的值都是字符串
# 实际的：字符串型，整型，浮点型，日期型，数值运算必须先转换成数值
# 类型：
# 1.用户自定义
# 2.环境变量
# 3.预定义变量， 其中之一是位置参数变量，系统确定了变量名和作用，只可以改变值

# 变量类型有三种： 局部变量（在脚本或命令中定义，仅当前shell实例中有效）， 环境变量（所有程序都能访问的变量）， shell变量（shell程序设置的特殊变量，一部分是局部变量，一部分是环境变量）

# 可以在语句中给变量赋值，以下语句把该文件夹下的文件名循环出来
# for file in `ls -la ./`; do
# 	echo "${file}"
# done

# set 命令查看系统所有变量
# set -u  报错提示
# unset 删除变量：`unset name`, 不加`$`

# 环境变量:
# export 变量名=变量值
# 变量名=变量值; export 变量名
# export x ; x=123
# expoort y=123
# 查看变量： set 查看所有， env 查看环境变量， 调用方法都一样$变量名， 删除 unset 变量名
# 环境变量为了区分，建议大写
# PATH环境变量： 查找系统命令的路径
# echo $PATH
# 添加到环境变量使用变量叠加，每一个路径采用`:`隔开： PATH=$PATH:~/mhy


# PS1 环境变量 （env不显示，set 显示）
# PS1变量作用：设置命令提示符
# \d:显示日期, 星期 月 日
# \H: 完整主机名
# \t: 24时制，HH:MM:SS
# \A：24时制, HH:MM
# \u：当前用户名
# \w：完整目录
# \W：当前目录的最后一个目录
# $: 提示符，root：#，普通用户: $

# 可以在语句中给变量赋值，以下语句把该文件夹下的文件名循环出来
# for file in `ls -la ./`; do
# 	echo "${file}"
# done

for skill in Ada Aoffe Action Jave; do
    echo "I am good at ${skill}Script"
done

# 申明变量的时候直接写变量名， 使用变量的时候加$符
your_name="leilei"
echo ${your_name}
your_name="lily"
echo ${your_name}

# 变量叠加
x="lalal"
x="$x"123
x=${x}456



# 在函数中定义局部变量的时候， 加 local 关键字
readName() {
	local name="mhy"
	echo "local: $name"
}
readName # local: mhy
echo "global $name" # global


# 只读变量，加 readonly 关键字
girl_friend="lili"
readonly girl_friend
girl_friend="leilei"

# 删除变量使用 unset 命令
deleVarb="delete val"
echo "before delete, deleVarb'is value is: ${deleVarb}" # 值非空
unset deleVarb
echo "after delete, deleVarb'is value is: ${deleVarb}" #值是空的


your_name="beijing"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1

# 变量类型有三种： 局部变量（在脚本或命令中定义，仅当前shell实例中有效）， 环境变量（所有程序都能访问的变量）， shell变量（shell程序设置的特殊变量，一部分是局部变量，一部分是环境变量）

# shell字符串
# 单引号字符串：里面的任何字符都原样输出，单引号字符串中的变量是无效的，不能出现一个单独的单引号（转义也不行），但可成对出现，作为拼接使用
echo 'lalala! ${greeting}'

# 双引号字符串：双引号里面可以有变量，可以有转义
string="hello,${your_name}"
string1="hello \"$your_name\"!\n"
echo $string $string1


# 删除子字符串：
# 从头开始： ${变量名#字串名}， 一个#表示删除最短匹配， 两个##表示删除最长匹配
# 从尾开始： ${变量名%字串名}， 一个%表示删除最短匹配， 两个%%表示删除最长匹配
# ${变量名#substring正则表达式}从字符串开头开始配备substring,删除匹配上的表达式。
# ${变量名%substring正则表达式}从字符串结尾开始配备substring,删除匹配上的表达式。
# 注意：${test##*/},${test%/*} 分别是得到文件名，或者目录地址最简单方法。
delstring="hello, world"
echo "delete substring by #: ${delstring#he}"
echo "delete substring by %: ${delstring%world}"

# 字符串删除获取路径
pa="/Users/member/work/index.html"
echo ${pa##*/}
# index.html
echo ${pa%/*}
# /Users/member/work
# 获取文件名和目录的最简单的方法：
# ${str##*/}
# ${str%/*}

# 获取字符串长度： ${#string} 读取字符串的时候在{}里面加#
# ${#变量名}
echo "string1's length: ${#string1}"

# 获取字符串长度： ${#string} 读取字符串的时候在{}里面加#
# ${#变量名}
echo "string1's length: ${#string1}"

# 截取子字符串： ${string:1:4} 从第二个祖父开始截取4个字符
# ${变量名:起始:长度}
echo "get substring: ${string1:2:5}"
echo "get substring to end: ${string1:3}"
str="abc123"
#起始位置可以是负数，代表倒数第几位开始向右截取
echo ${str:(-5):3} #bc1

# 查找子字符串：eg:查找字符i或o出现的位置（先出现哪个算哪个）, 使用反引号``
string="the weather is nice!"
echo `expr index $string "r!"`


# 匹配替换
# ${string/substr/replacement}
# 第一个/后面是匹配项，第二个/后面是替换的字符串
# 第一个/位置： 两个/表示替换所有，一个/表示替换一个，/#是前缀替换，/%是后缀替换

repstr="/Users/member/work/index.html"
echo ${repstr/member/mhy} # /Users/mhy/work/index.html
echo ${repstr//\//@} # @Users@member@work@index.html  #替换所有的/为@

repstr2="abc123abc123abc"
echo ${repstr2/#abc/ABC} # ABC123abc123abc
echo ${repstr2/%abc/ABC} # abc123abc123ABC
echo ${repstr2//abc/ABC} # ABC123ABC123ABC

