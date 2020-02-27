/**
 * 函数
 * 函数类型由参数类型和返回值类型组成
 * 没有返回值时返回值类型必须写成 void
 * 有效的函数类型要求必须函数的参数类型必须准确，参数名不在乎是否正确
 *
 * javascript中每个参数都是可选的，没传的时候是undefuned，typescript中可以在参数名旁使用 ? 实现可选参数功能
 * 可选参数必须跟在必选参数后面
 *
 * typescript中可以为参数提供一个默认值当要用户没有传递这个参数或者传递的是undefined时，被称为默认初始化值的参数
 */

function buildName(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right

function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result5 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result6 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result7 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result8 = buildName("Bob", "Adams");         // ah, just right

/**
 * 剩余参数
 * javascript中使用 arguments 来访问所有传入的参数
 * typescript中，可以把所有的参数收集在一个变量里
 * 剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个
 */
function buildName2(firstName: string, ...restOfName: string[]) {
  return firstName + ' ' + restOfName.join(' ')
}


/**
 * this 和 箭头函数
 * avaScript里，this的值在函数被调用的时候才会指定
 */

interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

/**
 * this参数出现在回调函数里
 * 在typescript中，this出现在回调函数里时会报错，可以指定 this的类型为void
 * 也可以使用箭头函数
 */
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string;
  onClickGood = (e: Event) => { this.info = e.message }
}

/**
 * 重载
 * 同一个函数提供多个函数类型定义来进行函数重载
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
/*
为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
*/
