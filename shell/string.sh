#!/bin/bash
# 第一行告诉系统其后路径所指定的程序即是解释此脚本的shell程序
# 拓展名并不影响脚本执行，见名知意就好，一般为.sh
echo "hello mhy"


# 变量定义直接写变量名，默认是global(全局)变量，变量名和等号之间不能有空格
# 命名规则和其他语言类似
#WORLD
#PPP
#MAC_PRO
#_yours
#it2
your_name="mhy"
echo $your_name
echo ${your_name}


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

# 获取字符串长度： ${#string} 读取字符串的时候在{}里面加#
# ${#变量名}
echo "string1's length: ${#string1}"

# 截取子字符串： ${string:1:4} 从第二个祖父开始截取4个字符
# ${变量名:起始:长度}
echo "get substring: ${string1:2:5}"

# 查找子字符串：eg:查找字符i或o出现的位置（先出现哪个算哪个）, 使用反引号``
string="the weather is nice!"
echo `expr index $string "r!"`


