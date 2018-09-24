# 进程管理

正在执行的一个程序或命令，每一个进程都是一个运行的实体，都有自己的地址空间，并占用一定的系统资源。

- 进程管理的作用
	- 判断服务器健康状态
	- 查看系统中所有进程
	- 杀死进程

## 进程管理

- 进程查看: ps 和 pstree 命令

> ps aux

查看系统中所有的进程，使用BSD操作系统格式

> ps -le

查看系统中所有进程，使用Linux标准格式

ps的选项：
 - -a 显示一个终端的所有进程，出了会话引线
 - -u 显示进程的归属用户及内存的使用情况
 - -x 显示没有控制终端的进程
 - -l 长格式显示。显示更加详细的信息
 - -e 显示所有进程， 和-a的作用一致

注意： ps aux 没有 `-`

进程信息：
USER: 该进程是由哪个用户产生的
PID:进程的ID
%CPU:该进程占用CPU资源百分比
%MEM:该进程占用物理内存百分比
VSZ:该进程占用虚拟内存的大小，单位KB
RSS:该进程占用实际物理内存的大小，单位KB
TTY:该进程是在哪个终端中运行的，其中tty1-tty7代表本地控制台终端，tty1-tty6是本地字符界面终端，tty7是图形界面。pst/0-255代表虚拟终端
STAT:进程的状态，常见的状态有：
 - -R 运行
 - -S 睡眠
 - -T 停止状态
 - -s 包含子进程
 - + 位于后台
START:该进程的启动时间
TIME:该进程占用CPU的运算时间，注意不是系统时间
COMMAND:产生此进程的命令名

> pstree [选项]

选项：
 - -p 显示进程的PID
 - -u 显示进程的所属用户

pstree用户显示进程树

- 进程查看: top 命令

top命令每隔3秒(默认)更新进程，查看系统进程详情，按CPU占比排序

选项：
	- -d 秒数
	- -b 使用批处理模式输出，一般和-n选项合用
	- -n 次数 指定top命令执行的次数

在top命令的交互模式中可以执行的命令:
 - ?或h 显示交互模式的帮助
 - P 以CPU使用率排序，默认
 - M 以内存的使用率排序
 - N 以PID排序
 - q 退出top

```
top - 22:08:55 up 2 days,  5:59,  4 users,  load average: 0.00, 0.01, 0.00
Tasks:  97 total,   1 running,  96 sleeping,   0 stopped,   0 zombie
Cpu(s):  0.0%us,  0.0%sy,  0.0%ni, 99.3%id,  0.0%wa,  0.0%hi,  0.0%si,  0.7%st
Mem:   1020212k total,   816576k used,   203636k free,   116628k buffers
Swap:        0k total,        0k used,        0k free,   366220k cached

PID USER      PR  NI  VIRT  RES  SHR S %CPU %MEM    TIME+  COMMAND
 3384 root      20   0 15024 1300 1008 R  0.3  0.1   0:00.63 top
    1 root      20   0 19236 1432 1140 S  0.0  0.1   0:04.68 init
    2 root      20   0     0    0    0 S  0.0  0.0   0:00.00 kthreadd
```



