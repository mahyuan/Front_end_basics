
var arr = [1, [[2, 3], 4], [5, 6]];

/*
//
var flat = function* (a) {
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  });
};

for (var f of flat(arr)){
  console.log(f);
}
*/

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (let f of flat(arr)) {
  console.log(f);
}


function* fn() {
	for(let i = 0; true; i++) {
		let reset = yield i;
		if(reset) i = -1;
	}
}

var g = fn();
g.next()
g.next()
g.next(true)
