<!-- 数据结构 -->
<!-- https://next.xuetangx.com/learn/ahpu08091002323/ahpu08091002323/1439405/discussion/1109695 -->


# 线性表
## 概念与ADT
线性表
线性表使用若干元素构成的有限序列

<!-- 下面的a1中a后面的数字为下标 -->
L=(a1,a2,a3,....,an)
表头元素: a1
表尾元素: an
表长： n , 若n=0，则 L 为空表
前驱： a(i-1) 为ai的前驱
后继： a(i+1) 为ai的后继
(2)特性
对于任何一非空线性表
有且仅有一个表头元素，有且仅有一个表尾元素
除表头外，其他元素有且仅有一个前驱
除表尾外，其他元素有且仅有一个后继


### 线性表的顺序实现---顺序表
以一段连续的内存单元依次存放线性表中的各个元素---顺序表(Squential List)
init(SqList &L)
getElem(SqList L , int i, ELemType &e)
```c
void getELem(SqlList L, int i, ElemtType &e) {
  // 检查i的合法性
  if(i < 1 || i > L.length) {
    return;
  }
  // 随机存取
  e = L.elem[i - 1];
}
```
时间复杂度O(1)

在第i个元素前插入e
inert(Sqlist &L, int i, ElemType e)
```c
void insert(SqlList &L, int i, ElemtType e) {
  // 检查i的合法性
  if(i < 1 || i > L.length + 1) {
    return;
  }
  // 插入前已满
  if(L.length === L.size) {
    //.....追加空间
  }
  // 插入元素
}

```
顺序表中的元素在内存中存放的位置是依次存放的，所以inert元素的时候，后面的元素的位置要向后移动一位

### 链表
表中各元素所占的内存单元是任意的，除自身信息外，每个元素还需附带指向其后继元素的指针（即链）---链表(Linked List)
表尾元素an附带的指针为空
元素自身信息及其附带的指针合称为链表的节点(Node)
#### 单链表
每个节点只附带了其后继指针，也称为单（向）链表
每个节点包含了2部分信息--数据域和后继指针域（data | next）

为了方便编程，通常在表头元素前人为附带一个节点--头结点，指向头结点的指针称为头指针
