const arr = [1,2,3,4]; // 1

setTimeout(() => {
    console.log(arr);   // 4
}, 0);

Promise.resolve(1).then(console.log) // 3
console.log('end'); // 2

//
setTimeout(() => {
    new Promise((resolve, reject) => {
    	// 立即执行
        console.log('second');
        resolve();
    });
    Promise.resolve('third').then(console.log);
    console.log('setTimeout'); 
}, 0);
Promise.resolve('first').then(console.log);


// async await 不需要回调函数， 直接用 await 请求，拿到数据
let fetchFn = async () => {
    const user: any = await fetch(`XXXX?user=${sum}`);
    const shopList: any = await fetch(`XXXX?shopList=${user.id}`);
    const otherInfo =  await fetch(`XXXX?info=${shopList.id}`);
    return otherInfo;
};
fetchFn().then((otherInfo) => {
    console.log(otherInfo);
})
