class Goods {
    constructor(title) {
        this.title = title
    }

    get price() {
        return this.price
    }        

    set price(p) {
        this.price = p
        console.log(this.title.price)
    }
}

let g = new Goods('T-shirt')
g.price = 122
console.log(g.price)