/**
 * 列表 list
 * 列表是一种有序的数据结构，列表中的每个数据项称为元素。
 * 在javascript中，列表中的元素可为任意数据类型。
 * 列表中的元素多少没有限制，只受内存限制。
 */

class List {
    constructor(props) {
        this.dataStore = []; //初始化空数组保存列表元素
        this.listSize = 0; //初始化元素个数为0
        this.pos = 0; // 初始化位置为0
    }
    //清空列表所有元素
    clear() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
     }
    // 查找某个元素， 存在返回位置， 否则返回 -1
    find(item) {
        for (let i = 0; i < this.dataStore.length; i++) {
            if(this.dataStore[i] === item) {
                return i
            }
        }
        return false;
    }
    /*
    find(element){
        for( var i = 0 ; i < this.dataStore.length ; i ++ ){
                if( this.dataStore[i] == element ){
                    return i;
                }
            }
        return -1;
    }
    */
    // 在列表末尾添加元素
    append(item) {
        this.dataStore[this.listSize++] = item;
    }
    /**
     * 在现有的元素后插入元素
     * 该方法需要传入两个参数，第一个参数表示待插入的元素，
     * 第二个参数表示待插入元素的前一个元素，
     * 用于确定插入元素的位置，并调用 splice 方法更改列表数组，
     * 插入成功后更新 listSize 并返回 true ， 否则返回 false；
     */
    insert(item, after) {
        var index = this.find(after);
        if(index > -1) {
            this.dataStore.splice(index + 1, 0, item);
            this.listSize ++;
            return true;
        }
        return false;
    }
    //从列表中删除元素
    remove(item) {
        let index = this.find(item);
        if(index > -1) {
            this.dataStore.splice(index, 1);
            --this.listSize;
            return true;
        }
        return false;
    }
    // 返回列表中元素的个数
    length() {
        return this.listSize;
    }
    // 显示列表元素
    toString() {
        return this.dataStore
    }
    //将列表的当前位置元素移动到第一个, 该方法只要将 pos 置为 0 即可
    front() {
        this.pos = 0;
    }
    //将列表的当前位置元素移动到最后一个
    end() {
        this.pos = this.listSize -1;
    }
    //prev：将当前位置前移一位
    prev() {
        if(this.pos > 0) {
            this.pos--;
        } else {
            console.log('该元素已在首位.');
        }
    }
    //next：将当前位置后移一位
    next() {
        if(this.pos < this.listSize -1) {
            ++this.pos;
        } else {
            console.log('该元素已在末尾。');
        }
    }
    //moveTo：将当前位置移动到指定位置
    moveTo(position) {
        if(position < 0 || position > this.listSize - 1) {
            console.log('请输入正确位置。');
        } else {
            this.pos = position;
        }
    }
    //currPos：返回列表的当前位置
    curpos() {
        return this.pos;
    }
    //getElement：返回当前位置的元素
    getELement() {
        return this.dataStore[this.pos];
    }
    //contains：判断给定值是否在列表中
    contains(item) {
        if(this.dataStore.indexOf(item) > -1) return true;
        else return false;

        // return this.dataStore.includes(item);
    }

}

/*
this.clear = clear;
this.find = find;    //寻找元素
this.toString = toString; //显示列表中的元素
this.insert = insert;
this.append = append;
this.remove = remove;
this.front = front;
this.end = end;
this.prev = prev;
this.next = next;
this.length = length;  //列表中的元素总数
this.currPos = currPos;
this.moveTo = moveTo;
this.getElement = getElement;
this.contains = contains; //判断给定值是否在列表中
 */



/**
 * 实例化
 */
let frots = new List();
frots.append('apple');
frots.append('banana');
frots.append('Grape');

console.log(frots.toString());
console.log(frots.length());
console.log(frots.find('banana'));
frots.remove('banana');
console.log(frots.toString())
