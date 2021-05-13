
/**
 * Set 中所有元素都是唯一的
 */

function f1(arr) {
	let s = new Set(arr)
	return [...s]
}
f1([1,1,2,3,4,5,5,6]) //[1,2,3,4,5,6]

/**
 * 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
 */

/*
function removeItem(arr, item) {
	return arr.filter(cur => cur !== item)
}

removeItem([1,2,2,3,3,4,5,3], 3) // [1,2,2,4,5]
*/

function removeItem(arr, item) {
	let arr1 = []
	for(var i=0;i<arr.length;i++) {
		if(arr[i] !== item) {
			arr1.push(arr[i])
		}
	}
	return arr1
}


/**
 * 移除数组 arr 中的所有值与 item 相等的元素。直接修改数组 arr，结果返回arr
 */
// 倒着遍历数组删除元素，就不用担心由于数组长度变化而引起的问题了。
function removeWithoutCopy(arr, item) {
    for(var i=arr.length-1;i>=0;i--) {
        if(arr[i] === item) {
            arr.splice(i,1)
        }
    }
    return arr
}

var arr = [1,2,3,4,5,5,6]
var item = 0

/**
 * 在数组 arr 末尾添加元素 item。不要直接修改数组 arr，结果返回新的数组
 */

function append(arr, item) {
	// var newArr = [...arr]
	// es5 不支持展开操作符
	var newArr = []
	for (var i = 0; i < arr.length; i++) {
		newArr.push(arr[i])
	}
	newArr.push(item)
	return newArr
}

// console.log(append(arr, item),arr)


/**
 * 在数组 arr 的 index 处添加元素 item。不要直接修改数组 arr，结果返回新的数组
 */

function insert(arr, item, index) {
	/*
    var newArr = [].concat(arr)
    newArr.splice(index,0,item)
    */
    var newArr = arr.slice(0)
    newArr.splice(index,0,item)
    return newArr
}
/*
concat() 不会修改现有的数组，返回新的数组
 */

//利用slice+concat
function insert(arr, item, index) {
    return arr.slice(0,index).concat(item,arr.slice(index));
}
//利用concat +splice
function insert(arr, item, index) {
    var newArr=arr.concat();
    newArr.splice(index,0,item);
    return newArr;
}
//利用slice+splice
function insert(arr, item, index) {
    var newArr=arr.slice(0);
    newArr.splice(index,0,item);
    return newArr;
}
//利用push.apply+splice
function insert(arr, item, index) {
    var newArr=[];
    [].push.apply(newArr, arr);
    newArr.splice(index,0,item);
    return newArr;
}
//普通的迭代拷贝
function insert(arr, item, index) {
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        newArr.push(arr[i]);
    }
    newArr.splice(index,0,item);
    return newArr;
}


/**
 * 数组求和
 */

//不考虑算法复杂度，用递归做：

function sum(arr) {
    var len = arr.length;
    if(len == 0){
        return 0;
    } else if (len == 1){
        return arr[0];
    } else {
        return arr[0] + sum(arr.slice(1));
    }
}
//常规循环：
function sum(arr) {
    var s = 0;
    for (var i=arr.length-1; i>=0; i--) {
        s += arr[i];
    }
    return s;
}
// 函数式编程 map-reduce：
function sum(arr) {
    return arr.reduce(function(prev, curr, idx, arr){
        return prev + curr;
    });
}
//forEach遍历：
function sum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
        s += val;
    }, 0);

    return s;
};
//eval：
function sum(arr) {
    return eval(arr.join("+"));
};

/**
 * 统计数组 arr 中值等于 item 的元素出现的次数
 */
//filter()-->利用指定的函数确定是否在返回的数组中包含某一项
function count(arr, item) {
    var count = arr.filter(function(a) {
        return a === item;   //返回true的项组成的数组
    });
    return count.length;
}
//map()-->对数组中的每一项进行给定函数，
//返回每次函数条用的结果组成的数组；
function count(arr, item) {
    var count = 0;
    arr.map(function(a) {
        if(a === item) {
            count++;
        }
    });
    return count;
}
//for循环
function count(arr, item) {
    var count = 0;
    for(var i=0; i<arr.length; i++) {
        if(arr[i] === item) {
            count++;
        }
    }
    return count;
}
//reduce()-->从数组的第一项开始，逐个遍历到最后；
function count(arr, item) {
    var count = arr.reduce(function(prev, curr) {
        return curr === item ? prev+1 : prev;
    }, 0);
    return count;
}
        //forEach()-->对数组中的每一项运行传入的函数
function count(arr, item) {
    var count = 0;
    arr.forEach(function(a) {
        a === item ? count++ : 0;
    });
    return count;
}


/**
 * 找出数组 arr 中重复出现过的元素
 */

function duplicates(arr) {
    var a=arr.sort(),b=[];
    for(var i in a){
        if(a[i]==a[i-1] && b.indexOf(a[i])==-1) b.push(a[i]);
    }
    return b;
}//先排序，如果后一个与前一个相等且未保存，则保存。

function duplicates(arr) {
 var result = [];
    arr.forEach(function(elem){
       if(arr.indexOf(elem) != arr.lastIndexOf(elem) && result.indexOf(elem) == -1){
           result.push(elem);
       }
    });
    return result;
}

function duplicates(arr) {
     //声明两个数组，a数组用来存放结果，b数组用来存放arr中每个元素的个数
     var a = [],b = [];
     //遍历arr，如果以arr中元素为下标的的b元素已存在，则该b元素加1，否则设置为1
     for(var i = 0; i < arr.length; i++){
         if(!b[arr[i]]){
             b[arr[i]] = 1;
             continue;
         }
         b[arr[i]]++;
     }
     //遍历b数组，将其中元素值大于1的元素下标存入a数组中
     for(var i = 0; i < b.length; i++){
         if(b[i] > 1){
             a.push(i);
         }
     }
     return a;
 }

/**
 * 为数组 arr 中的每个元素求二次方。不要直接修改数组 arr，结果返回新的数组
 */
function square(arr) {
    return arr.map(function(item,index,array){
        return item*item;
    })
}

// ES6箭头函数版
const square = arr => arr.map(e => e * e);



/**
 * 在数组 arr 中，查找值与 item 相等的元素出现的所有位置
 */
function findAllOccurrences(arr, target) {
	var newArr = []
    arr.forEach(function(val,i){
       val !== target || newArr.push(i)

    })
    return newArr

}


//filter
function findAllOccurrences(arr, target) {
    var result=[];
    arr.filter(function(item,index){
        return item===target&&result.push(index);
    });
    return result;
}
//for
function findAllOccurrences(arr, target) {
    var result=[];
    for(var i=0;i<arr.length;i++){
        if(arr[i]===target){
            result.push(i);
        }
    }
    return result;
}
//lastIndexOf+slice/splice
function findAllOccurrences(arr, target) {
    var result=[],index=arr.lastIndexOf(target);
    while(index>-1){
        result.push(index);
        arr.splice(index,1);//arr=arr.slice(0,index);
        index=arr.lastIndexOf(target);
    }
    return result;
}
//indexOf
function findAllOccurrences(arr, target) {
    var result=[],index=arr.indexOf(target);
    while(index>-1){
        result.push(index);
        index=arr.indexOf(target,index+1);
    }
    return result;
}

/**
 * 修改 js 代码中 parseInt 的调用方式，使之通过全部测试用例
 */
function parse2Int(num) {
    return parseInt(num,10);
}
// 按10进制去处理字符串，碰到非数字字符，会将后面的全部无视
/**
 * parseInt(string, radix) 当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
 * 举例，如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，
 * 那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，
 * parseInt() 将把它解析为十进制的整数。
 */
