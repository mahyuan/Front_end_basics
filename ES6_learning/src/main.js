const promise = new Promise(function(resolve, reject){

  if( ){
    resolve(value);
  } else {
    reject(error);
  }

});

// (x => x  * 3 )(1)

// console.log(x => x *3)


async function f() {
  return 'hello world';
}

f().then(v => console.log(v))

/*
async function fn(num) {
	return num * num
}

fn(5).then(v => console.log(v))
*/
/*
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)*/
/*
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
*/

/*async function f() {
  return await 123;
}

f().then(v => console.log(v))
// 123*/

/*
async function f() {
  return await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
*/
/*
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
f().catch( e => console.log('出错了啊。。。。'))

*/
/*
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))

f().catch(e => console('出错了啊。。。。'))
// hello world
*/

/*
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world

*/


/*async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// Error：出错了
*/


/*async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error('出错了');
    });
  } catch(e) {
  }
  return await('hello world');
}*/

/*async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}*/

/*
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
*/

/*
function calcuate(item) {
	let remainSecond = ((item.endtime - Date.now()) / 1000) || 0
	if(remainSecond <= 0) {
		return '已超时'
	}

	let second = parseInt(remainSecond % 60)
	let minute = parseInt(remainSecond / 60 %60) || 0

	second = (seconde < 10 ? '0' : '') + second
	minute = (minute < 10 ? '0' : '' ) + minute

	return `${minute}:${second}`
}

function setCountDown() {
	const orders = this.orderList
		.filter(order => order.status === 7 && order.endtime > Date.now())

	if(!orders.length) return

	orders.forEach( order => {
		order.endtimes = calcuate(order)
	})
	this.$apply()

	setTimeout(this.setCountDown.bind(this), 1000)
}
*/

/*
function fn() {
	let orders = this.orderList
		.filter(order => order.status === 7 && order.endtime < Date.now())

	if(!orders.length) return

	orders.forEach(order => {
		orders.endtimes = calcuate(order)
	})

	setTimeout(this.fn.bind(this), 1000)
}

function calcuate(item) {
	let remainSecond = ((item.endtime - Date.now) / 1000 )|| 0
	if(remainSecond < 0) {
		return '....'
	}
	let second = parseInt(remainSecond % 60)
	let minute = parseInt(remainSecond / 60 % 60) || 0

	second = (second < 0 ? '0' : '') + second
	minute = (minute < 0 ? '0' : '') + minute

	return `${minute}:${second}`
}
*/

/*
O20171113130907
O20171113162990
O20171113114964
O20171113196007
O20171113167062
O20171113101014
*/






































