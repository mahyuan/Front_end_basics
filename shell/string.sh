#!/bin/bash
# 第一行告诉系统其后路径所指定的程序即是解释此脚本的shell程序
# 拓展名并不影响脚本执行，见名知意就好，一般为.sh
echo "hello mhy"

#WORLD
#PPP
#MAC_PRO
#_yours
#it2

#for file in `/user/member/work/mhy`

your_name="mhy"
echo $your_name
echo ${your_name}


for skill in Ada Aoffe Action Jave; do
    echo "I am good at ${skill}Script"
done

your_name="leilei"
echo ${your_name}
your_name="lily"
echo ${your_name}


girl_friend="lili"
readonly girl_friend
girl_friend="leilei"


your_name="beijing"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1

# 双引号字符串
string="hello,${your_name}"
string1="hello \"$your_name\"!\n"

echo $string $string1
echo ${#string1}

echo ${string:2:5} 

echo `expr index "$string" \,`




